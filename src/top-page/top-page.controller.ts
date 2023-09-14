import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { ConfigService } from '@nestjs/config';

@Controller('top-page')
export class TopPageController {
    constructor(private readonly configService: ConfigService) { }

    @Post('create')
    async createProduct(@Body() dto: Omit<TopPageModel, '_id'>) { }

    @Get(':id')
    async getProduct(@Param('id') id: string) {
        this.configService.get('TEST')
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string) { }

    @Patch(':id')
    async updateProduct(@Param('id') id: string, @Body() dto: TopPageModel) { }

    @HttpCode(200)
    @Post()
    async findProduct(@Body() dto: FindTopPageDto) { }
}
