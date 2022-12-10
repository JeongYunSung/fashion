import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageMapper } from './image.mapper';
import { ImageController } from './image.controller';

@Module({
  providers: [ImageService, ImageMapper],
  exports: [ImageService, ImageMapper],
  controllers: [ImageController],
})
export class ImageModule {}
