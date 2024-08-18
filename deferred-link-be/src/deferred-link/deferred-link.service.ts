import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeferredLink } from '../schemas/deferred-link.schema';
import { Model } from 'mongoose';
import { CreateDeferredLinkDto } from './dto/create-deferred-link.dto';

@Injectable()
export class DeferredLinkService {
  constructor(
    @InjectModel(DeferredLink.name)
    private referrerLinkModel: Model<DeferredLink>,
  ) {}

  async getLink(code: string, path: string): Promise<DeferredLink> {
    const data = await this.referrerLinkModel
      .findOne({
        $or: [{ code }, { path }, { shortPath: path }],
      })
      .exec();

    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  generateReferralCode(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  async createDeferrerLink(dto: CreateDeferredLinkDto): Promise<DeferredLink> {
    try {
      return await this.referrerLinkModel.create({
        path: dto.path,
        shortPath: dto.shortPath,
        code: this.generateReferralCode(),
      });
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException('Duplicate key error');
      }
      throw e;
    }
  }
}
