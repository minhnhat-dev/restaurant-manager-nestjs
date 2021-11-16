import { Injectable, NestMiddleware } from '@nestjs/common';
import { PagingEnum } from '../constants/paging.constant';

@Injectable()
export class PagingMiddleware implements NestMiddleware {
  use(req: Record<string, any>, res: Response, next: () => void): any {
    req.query.skip = +req.query.skip || PagingEnum.DEFAULT_SKIP;
    req.query.limit = +req.query.limit || PagingEnum.DEFAULT_LIMIT;
    req.query.select = req.query.fields ? buildSelect(req.query.fields) : '';
    req.query.sortObject = req.query.sort
      ? buildSort(req.query.sort)
      : { createdAt: -1 };

    if (req.query.limit > PagingEnum.DEFAULT_MAX_LIMIT) {
      req.query.limit = 100;
    }

    next();
  }
}

const buildSort = (sortString: string) => {
  const sort = { createdAt: -1 };
  if (!sortString) return sort;
  sortString.split(',').forEach((field) => {
    const typeSort = field.charAt(0);
    if (typeSort !== '-') {
      sort[field] = 1;
    } else {
      const fieldSort = field.substring(1);
      sort[fieldSort] = -1;
    }
  });
  return sort;
};

const buildSelect = (fields: string) => {
  if (!fields) return '';
  const select = fields.split(',').map((field) => field.trim());
  return select;
};
