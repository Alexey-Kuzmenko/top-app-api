import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewModel } from './review.model';

@Controller('review')
export class ReviewController {
    @Post('create')
    async createReview(@Body() dto: Omit<ReviewModel, '_id'>) { }

    @Delete(':id')
    async deleteReview(@Param('id') id: string) { }

    @Get('byProduct/:id')
    async getReviewByProduct(@Param('id') id: string) { }
}
