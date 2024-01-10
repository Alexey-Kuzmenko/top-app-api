import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) { }

    @UsePipes(new ValidationPipe())
    @Post('create')
    async createReview(@Body() dto: CreateReviewDto) {
        return await this.reviewService.create(dto)
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
