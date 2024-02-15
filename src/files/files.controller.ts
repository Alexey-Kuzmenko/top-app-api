import { Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileResponseDto } from './dto/file.response.dto';
import { FilesService } from './files.service';
import { MFile } from './mfile.class';

@Controller('files')
export class FilesController {
    constructor(private readonly fileService: FilesService) { }

    @Post('upload')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('files'))
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileResponseDto[]> {
        const saveArr: Array<MFile> = [new MFile(file)]

        if (file.mimetype.includes('image')) {
            const buffer = await this.fileService.convertToWebP(file.buffer)
            saveArr.push(new MFile({
                originalname: `${file.originalname.split('.')[0]}.webp`,
                buffer: buffer
            }))
        }

        return this.fileService.saveFiles(saveArr)
    }
}