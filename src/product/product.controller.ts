import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto';
import { ProductService } from './product.service';
import CreateProductDto from './dto/create-product.dto';
import { DocumentType } from '@typegoose/typegoose';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('create')
    async createProduct(@Body() dto: CreateProductDto): Promise<DocumentType<ProductModel>> {
        return this.productService.createProduct(dto)
    }

    @Get(':id')
    async getProduct(@Param('id', IdValidationPipe) id: string): Promise<ProductModel> {
        const product = await this.productService.getProductById(id)

        if (!product) {
            throw new NotFoundException('Product not found')
        } else {
            return product
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteProduct(@Param('id', IdValidationPipe) id: string): Promise<ProductModel> {
        const deletedProduct = await this.productService.deleteProductById(id)

        if (!deletedProduct) {
            throw new NotFoundException('Product not found')
        } else {
            return deletedProduct
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateProduct(@Param('id', IdValidationPipe) id: string, @Body() dto: ProductModel): Promise<ProductModel> {
        const updatedProduct = this.productService.updateProductById(id, dto)

        if (!updatedProduct) {
            throw new NotFoundException('Product not found')
        } else {
            return updatedProduct
        }
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('find')
    async findProduct(@Body() dto: FindProductDto) {
        return this.productService.findWithReviews(dto)
    }

}
