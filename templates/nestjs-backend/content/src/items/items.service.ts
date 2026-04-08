import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateItemDto } from './dto/create-item.dto';

export interface Item {
  id: string;
  name: string;
  createdAt: string;
}

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  findAll(): Item[] {
    return this.items;
  }

  create(dto: CreateItemDto): Item {
    const item: Item = {
      id: randomUUID(),
      name: dto.name,
      createdAt: new Date().toISOString(),
    };
    this.items.push(item);
    return item;
  }
}
