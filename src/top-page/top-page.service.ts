import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { TopPageModel } from './top-page.model';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Injectable()
export class TopPageService {
    constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) { }

    async addPage(dto: CreateTopPageDto): Promise<DocumentType<TopPageModel>> {
        return this.topPageModel.create(dto)
    }

    async getPageById(id: string): Promise<DocumentType<TopPageModel>> {
        return this.topPageModel.findById(id).exec()
    }

    async deletePageById(id: string): Promise<DocumentType<TopPageModel>> {
        return this.topPageModel.findByIdAndDelete(id).exec()
    }

    async updatePageById(id: string, dto: CreateTopPageDto): Promise<DocumentType<TopPageModel>> {
        return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec()
    }

    findTopPageByCategory({ firstCategory }: FindTopPageDto): Promise<DocumentType<Pick<TopPageModel, 'title' | 'secondCategory' | 'alias'>>[]> {
        return this.topPageModel.find({ firstCategory: firstCategory }, { alias: 1, secondCategory: 1, title: 1 }).exec()
    }
}
