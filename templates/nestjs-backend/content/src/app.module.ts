import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [HealthModule, ItemsModule],
})
export class AppModule {}
