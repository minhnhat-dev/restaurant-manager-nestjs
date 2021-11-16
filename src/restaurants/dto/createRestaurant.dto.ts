import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, IsOptional } from 'class-validator';

export class CreateRestaurantDto {
  @ApiProperty({
    description: 'Name',
    required: true,
    minLength: 6,
    maxLength: 255,
  })
  @IsNotEmpty()
  @Length(6, 255)
  name: string;

  @ApiProperty({ description: 'Description' })
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'Address' })
  @IsOptional()
  address: string;

  @ApiProperty({ description: 'Banner Image' })
  @IsOptional()
  imageURL: string;

  @ApiProperty({ description: 'Id of Category' })
  @IsOptional()
  category: string;
}
