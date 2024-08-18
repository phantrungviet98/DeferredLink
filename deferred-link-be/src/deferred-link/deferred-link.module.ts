import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DeferredLink,
  DeferredLinkSchema,
} from '../schemas/deferred-link.schema';
import { DeferredLinkController } from './deferred-link.controller';
import { DeferredLinkService } from './deferred-link.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeferredLink.name, schema: DeferredLinkSchema },
    ]),
  ],
  controllers: [DeferredLinkController],
  providers: [DeferredLinkService],
})
export class DeferredLinkModule {}
