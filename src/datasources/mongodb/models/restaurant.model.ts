import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Category } from './category.model';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Restaurant extends Document {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop()
  description: string;

  @Prop()
  address: string;

  @Prop()
  imageURL: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    default: null,
    ref: Category.name,
  })
  category;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
