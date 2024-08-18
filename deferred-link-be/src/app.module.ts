import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DeferredLinkModule } from './deferred-link/deferred-link.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:30002/DeferredLinkProject', {
      autoIndex: true,
    }),
    DeferredLinkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
