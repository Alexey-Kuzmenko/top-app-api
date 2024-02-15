import { Injectable } from '@nestjs/common';
import { FileResponseDto } from './dto/file.response.dto';
import { format } from 'date-fns'
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { MFile } from './mfile.class';

@Injectable()
export class FilesService {

    async saveFiles(files: MFile[]): Promise<FileResponseDto[]> {
        const folderName = format(new Date(), 'yyyy-MM-dd')
        const uploadFolder = `${path}/uploads/${folderName}`
        await ensureDir(uploadFolder)
        const res: FileResponseDto[] = []

        for (const file of files) {
            await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)
            res.push({ url: `${folderName}/${file.originalname}`, name: file.originalname })
        }

        return res
    }

    async convertToWebP(file: Buffer): Promise<Buffer> {
        return sharp(file).webp().toBuffer()
    }
}