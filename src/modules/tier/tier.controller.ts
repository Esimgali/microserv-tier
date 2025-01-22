import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TierService } from './tier.service';

@Controller()
export class TierController {
  constructor(private readonly tierService: TierService) {}

  @MessagePattern({ cmd: 'create_tier' })
  create(data: any) {
    return this.tierService.create(data);
  }

  @MessagePattern({ cmd: 'get_tiers' })
  findAll({ creatorId }: { creatorId: number }) {
    return this.tierService.findAll(creatorId);
  }

  @MessagePattern({ cmd: 'get_tier_by_id' })
  findOne({ id }: { id: number }) {
    return this.tierService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_tier' })
  update(data: any) {
    const { id, ...updateData } = data;
    return this.tierService.update(id, updateData);
  }

  @MessagePattern({ cmd: 'delete_tier' })
  remove({ id }: { id: number }) {
    return this.tierService.remove(id);
  }
}
