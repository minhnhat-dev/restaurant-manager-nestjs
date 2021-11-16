import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Name',
    required: true,
    minLength: 6,
    maxLength: 255,
  })
  @IsNotEmpty()
  @Length(6, 255)
  name: string;

  @ApiProperty({
    description: 'Code',
    required: true,
    minLength: 2,
    maxLength: 12,
  })
  @IsNotEmpty()
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
