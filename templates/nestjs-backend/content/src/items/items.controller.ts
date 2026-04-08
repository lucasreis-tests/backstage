import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @ApiOperation({ summary: 'List all items' })
  findAll() {
    return this.itemsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create an item' })
  create(@Body() dto: CreateItemDto) {
    return this.itemsService.create(dto);
  }
}
