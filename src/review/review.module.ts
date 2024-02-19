import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { ReviewModel } from './review.model';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ReviewModel,
        schemaOptions: {
          collection: 'Review'
        }
      }
    ]),
    TelegramModule
  ],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule { }
