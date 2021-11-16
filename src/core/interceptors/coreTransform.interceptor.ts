import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { CorePaginateResult } from '../interfaces/corePaginateResult.interface';
import { CoreResponse } from '../interfaces/coreResponse.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isIn } from 'class-validator';
import { Response, Request } from 'express';
import { MessageEnum } from '../constants/message.constant';
import { PagingEnum } from '../constants/paging.constant';
@Injectable()
export class CoreTransformInterceptor
  implements NestInterceptor<CorePaginateResult>
{
  intercept(
    context: ExecutionContext /* Chứa context app chứa rất nhiều thông tin  */,
    next: CallHandler /*  */,
  ): Observable<CorePaginateResult> {
    const response = context.switchToHttp().getResponse<Response>();
    const request = context.switchToHttp().getRequest<Request>();

    return next.handle().pipe(
      map((result: CoreResponse) => {
        let respStatus: boolean;

        if (isIn(result.status, [true, false])) {
          respStatus = result.status;
        } else {
          respStatus =
            result.status ||
            response.statusCode == HttpStatus.OK ||
            response.statusCode == HttpStatus.CREATED;
        }

        if (!respStatus) {
          response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        /* This line must below respStatus check */

        const respMessage =
          result.message ||
          (respStatus && MessageEnum.SUCCESS) ||
          MessageEnum.FAILED;
        const respStatusCode = result.statusCode || response.statusCode;

        if (result.data) {
          /* Paging/Single documents */
          const data = result.data;

          if (data.items) {
            return {
              status: respStatus,
              statusCode: respStatusCode,
              message: respMessage,
              data: {
                list: data.items,
                total: data.total,
                skip: request.query.skip || PagingEnum.DEFAULT_SKIP,
                limit: request.query.limit || PagingEnum.DEFAULT_LIMIT,
              },
            };
          } else {
            /* Single document */
            return {
              status: respStatus,
              statusCode: respStatusCode,
              message: respMessage,
              data: result.data,
            };
          }
        } else {
          // No return data
          return {
            status: respStatus,
            statusCode: respStatusCode,
            message: respMessage,
            data: null,
          };
        }
      }),
    );
  }
}
