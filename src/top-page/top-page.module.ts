import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { TopPageModel } from './top-page.model';

@Module({
  imports: [TypegooseModule.forFeature(
    [
      {
        typegooseClass: TopPageModel,
        schemaOptions: {
          collection: 'TopPage'
        }
      }
    ])
  ],
  controllers: [TopPageController],
  providers: [ConfigService]
})

export class TopPageModule { }