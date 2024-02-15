import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ProductModel } from './product.model';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import CreateProductDto from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ReviewModel } from 'src/review/review.model';

@Injectable()
export class ProductService {
    constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) { }

    async createProduct(dto: CreateProductDto): Promise<DocumentType<ProductModel>> {
        return this.productModel.create(dto)
    }

    async getProductById(id: string): Promise<ProductModel> {
        return this.productModel.findById(id).exec()
    }

    async deleteProductById(id: string): Promise<ProductModel> {
        return this.productModel.findByIdAndDelete(id).exec()
    }

    async updateProductById(id: string, dto: CreateProductDto): Promise<ProductModel> {
        return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec()
    }

    async findWithReviews(dto: FindProductDto) {
        return this.productModel.aggregate([
            {
                $match: {
                    categories: dto.category
                }
            },
            {
                $sort: {
                    _id: 1
                }
            },
            {
                $limit: dto.limit
            },
            {
                $lookup: {
                    from: 'Review',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'reviews'
                }
            },
            {
                $addFields: {
                    reviewCount: { $size: '$reviews' },
                    reviewAvg: { $avg: '$reviews.rating' },
                    reviews: {
                        $function: {
                            body: `function (review) {
                                review.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                return review
                            }`,
                            args: ['$reviews'],
                            lang: 'js'
                        }
                    }
                }
            }
        ]).exec() as Promise<(ProductModel & { review: ReviewModel[], reviewCount: number, reviewAvg: number })[]>;
    }

}
