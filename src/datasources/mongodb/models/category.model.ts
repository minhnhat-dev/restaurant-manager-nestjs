import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Category extends Document {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
    unique: true,
  })
  code: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    default: null,
    ref: 'Category',
  })
  parent;

  @Prop({
    default: 1,
  })
  level: number;

  @Prop()
  description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
