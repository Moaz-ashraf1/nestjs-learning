import { Module } from '@nestjs/common';
import { ProductModule } from './Products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ProductModule,ReviewsModule,UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {

}
