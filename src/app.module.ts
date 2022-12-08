import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [UserModule, CategoryModule, ProductModule, ImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
