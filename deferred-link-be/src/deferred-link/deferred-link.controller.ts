import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { DeferredLinkService } from './deferred-link.service';
import { DeferredLink } from '../schemas/deferred-link.schema';
import { CreateDeferredLinkDto } from './dto/create-deferred-link.dto';
import { Req } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller()
export class DeferredLinkController {
  constructor(private readonly deferredLinkService: DeferredLinkService) {}

  // @Get('/deferred-link-by-code/:code')
  // getLinkByCode(@Param() code: string,) {
  //   return this.deferredLinkService.getLinkByCode(code);
  // }
  //
  // @Get('/deferred-link')
  // get(@Req() req: any) {
  //   const path = req.originalUrl.replace('/deferred-link/', '');
  //   return this.deferredLinkService.getLinkByPath(path);
  // }

  @Get('deferred-link')
  getLink(@Query('code') code?: string, @Query('path') path?: string) {
    return this.deferredLinkService.getLink(code, path);
  }

  @Post('/deferred-link')
  createReferredLink(
    @Body() payload: CreateDeferredLinkDto,
  ): Promise<DeferredLink> {
    return this.deferredLinkService.createDeferrerLink(payload);
  }
}
