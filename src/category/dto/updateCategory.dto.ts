import { ApiProperty } from '@nestjs/swagger';
import { Length, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Name',
    minLength: 6,
    maxLength: 255,
  })
  @IsOptional()
  @Length(6, 255)
  name: string;

  @ApiProperty({
    description: 'Code',
    minLength: 2,
    maxLength: 12,
  })
  @IsOptional()
  @Length(2, 12)
  code: string;

  @ApiProperty({ description: 'Category parent id' })
  @IsOptional()
  parent: string;

  @ApiProperty({ description: 'Category level' })
  @IsOptional()
  level: number;

  @ApiProperty({ description: 'Description' })
  @IsOptional()
  description: string;
}
