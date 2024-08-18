import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type DeferredLinkDocument = HydratedDocument<DeferredLink>;

@Schema()
export class DeferredLink extends Document {
  @Prop({ index: true, unique: true, required: true })
  code: string;

  @Prop({ required: true, index: true, unique: true })
  path: string;

  @Prop({ index: true, unique: true })
  shortPath: string;
}

export const DeferredLinkSchema = SchemaFactory.createForClass(DeferredLink);

DeferredLinkSchema.index({ path: 1, shortPath: 1 }, { unique: true });
