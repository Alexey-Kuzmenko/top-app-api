import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ReviewModel } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constans';


@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) { }

    @Post('create')
    async createReview(@Body() dto: CreateReviewDto) {
        return this.reviewService.create(dto)
    }

    @Delete(':id')
    async deleteReview(@Param('id') id: string) {
        const deletedDoc = await this.reviewService.delete(id)

        // if (!deletedDoc) {
        //     throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
        // }
        // ! testing
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
