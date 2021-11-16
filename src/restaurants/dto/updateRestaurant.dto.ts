import { ApiProperty } from '@nestjs/swagger';
import { Length, IsOptional } from 'class-validator';

export class UpdateRestaurantDto {
  @ApiProperty({
    description: 'Name',
    minLength: 6,
    maxLength: 255,
  })
  @IsOptional()
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
