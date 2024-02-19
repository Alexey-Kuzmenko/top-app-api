import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { TelegramService } from 'src/telegram/telegram.service';

@Controller('review')
export class ReviewController {
    constructor(
        private readonly reviewService: ReviewService,
        private readonly telegramService: TelegramService
    ) { }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('create')
    async createReview(@Body() dto: CreateReviewDto) {
        return await this.reviewService.create(dto)
    }

    @UsePipes(new ValidationPipe())
    @Post('notify')
    async notify(@Body() dto: CreateReviewDto) {
        const message = `Name: ${dto.name}\n`
            + `Title: ${dto.title}\n`
            + `Description: ${dto.description}\n`
            + `Rating: ${dto.rating}\n`
            + `Product ID: ${dto.productId}`

        return this.telegramService.sendMessage(message)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteReview(@Param('id') id: string) {
        const deletedDoc = await this.reviewService.delete(id)

        if (deletedDoc) {
            return id
        } else {
            throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
        }

    }

    @Get('byProduct/:id')
    async getReviewByProduct(@Param('id') id: string) {
        return await this.reviewService.findByProductId(id)
    }
}
