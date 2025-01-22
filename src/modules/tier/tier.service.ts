import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTierDto } from './dto/create-tier.dto';
import { UpdateTierDto } from './dto/update-tier.dto';

@Injectable()
export class TierService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTierDto: CreateTierDto) {
    try {
      const tier = await this.prismaService.tier.create({
        data: createTierDto,
      });
      return tier;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findAll(id) {
    try {
      const tiers = await this.prismaService.tier.findMany({
        where: { creatorId: id },
      });

      return tiers;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findOne(id: number) {
    try {
      const tier = await this.prismaService.tier.findUnique({
        where: { id },
        include: {
          creator: true,
          subscriptions: true,
          posts: true,
        },
      });

      if (!tier) {
        throw new Error(`Tier with ID ${id} not found`);
      }

      return tier;
    } catch (e) {
      throw new Error(e.message || 'Error while finding the tier');
    }
  }

  async update(id: number, updateTierDto: UpdateTierDto) {
    try {
      const tier = await this.prismaService.tier.update({
        where: { id },
        data: updateTierDto,
      });

      return tier;
    } catch (e) {
      if (e.code === 'P2025') {
        throw new Error(`Tier with ID ${id} not found for update`);
      }
      throw new Error(e.message || 'Error while updating the tier');
    }
  }

  async remove(id: number) {
    try {
      const tier = await this.prismaService.tier.delete({
        where: { id },
      });

      return tier;
    } catch (e) {
      if (e.code === 'P2025') {
        throw new Error(`Tier with ID ${id} not found for deletion`);
      }
      throw new Error(e.message || 'Error while deleting the tier');
    }
  }
}
