import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MysqlModule } from 'nest-mysql2';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ImageModule } from './image/image.module';
import { CartController } from './cart/cart.controller';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    MysqlModule.forRoot({
      host: 'localhost',
      user: 'root',
      password: 'test',
      database: 'testdb',
    }),
    UserModule,
    CategoryModule,
    ProductModule,
    ImageModule,
    CartModule,
    OrderModule,
  ],
  controllers: [AppController, CartController],
  providers: [AppService],
})
export class AppModule {}
