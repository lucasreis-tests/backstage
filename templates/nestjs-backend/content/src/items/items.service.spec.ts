import { Test } from '@nestjs/testing';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ItemsService],
    }).compile();
    service = module.get(ItemsService);
  });

  it('should create and list items', () => {
    const item = service.create({ name: 'test' });
    expect(item.name).toBe('test');
    expect(item.id).toBeDefined();
    expect(service.findAll()).toHaveLength(1);
  });
});
