import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryCategoryDto {
  @ApiProperty({
    description: `Text search for name and code category`,
    required: false,
    example: 'Restaurant fish',
  })
  @IsOptional()
  searchText: string;

  @ApiProperty({
    description: 'Level category',
    required: false,
    example: 1,
  })
  @IsOptional()
  level: number;
}
