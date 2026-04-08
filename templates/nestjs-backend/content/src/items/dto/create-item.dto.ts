import { IsString, IsNotEmpty } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ example: 'My item' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
