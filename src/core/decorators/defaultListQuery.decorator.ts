import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { PagingEnum } from '../constants/paging.constant';

export const DefaultListQuery = (): any => {
  return applyDecorators(
    ApiQuery({
      required: false,
      name: 'sort',
      description: `
      - Sort multi field: String split by ",": empty is ascending, negative - is descending. 
      - EXAMPLE: sort=-createdAt,name or sort=name,-code.
      `,
      example: '-createdAt,name',
    }),
    ApiQuery({
      required: false,
      name: 'limit',
      description: 'Limit of result',
      example: PagingEnum.DEFAULT_LIMIT,
    }),
    ApiQuery({
      required: false,
      name: 'skip',
      description: 'Skip records',
      example: PagingEnum.DEFAULT_SKIP,
    }),
    ApiQuery({
      required: false,
      name: 'fields',
      description: `
      - List fields select split by ",": empty is select field, negative - is select all except this field.
      - EXAMPLE : fields=code,name (only get fields: name and code) or fields=-code (Select all fields expect field code).
      `,
      example: 'code,name',
    }),
  );
};
