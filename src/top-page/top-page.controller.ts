import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageService } from './top-page.service';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { DocumentType } from '@typegoose/typegoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('top-page')
export class TopPageController {
    constructor(private readonly topPageService: TopPageService) { }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('create')
    async createPage(@Body() dto: CreateTopPageDto): Promise<DocumentType<TopPageModel>> {
        return this.topPageService.addPage(dto)
    }

    @Get(':id')
    async getPage(@Param('id') id: string): Promise<DocumentType<TopPageModel>> {
        const page = await this.topPageService.getPageById(id)

        if (!page) {
            throw new NotFoundException('Page not found')
        } else {
            return page
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deletePage(@Param('id') id: string): Promise<DocumentType<TopPageModel>> {
        const page = await this.topPageService.deletePageById(id)

        if (!page) {
            throw new NotFoundException('Page not found')
        } else {
            return page
        }
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Patch(':id')
    async updatePage(@Param('id') id: string, @Body() dto: CreateTopPageDto): Promise<DocumentType<TopPageModel>> {
        return this.topPageService.updatePageById(id, dto)
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('find')
    async findPage(@Body() dto: FindTopPageDto): Promise<DocumentType<Pick<TopPageModel, 'title' | 'secondCategory' | 'alias'>>[]> {
        return this.topPageService.findTopPageByCategory(dto)
    }
}
