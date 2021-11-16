import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryRestaurantDto {
  @ApiProperty({
    description: 'Text search for name and code restaurant',
    required: false,
    example: 'Restaurant Fish',
  })
  @IsOptional()
  searchText: string;

  @ApiProperty({
    description: `
    + String category id split by ",".
    + EXAMPLE: categoryIds=6192950f4721a8414fbb2ba1,61928c2547803e2f904c8d24.
    `,
    required: false,
    example: '6192950f4721a8414fbb2ba1,61928c2547803e2f904c8d24',
  })
  @IsOptional()
  categoryIds: string;

  @ApiProperty({
    description: 'Text search for name and code category',
    required: false,
    example: 'Category Fish',
  })
  @IsOptional()
  searchCategory: string;
}
