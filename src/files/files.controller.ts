import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(private readonly service: FilesService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.service.uploadedFile(file);
    }

    @Get(':file')
    getFile(
        @Param('file') fileName: string
    ) {
        return this.service.getFile(fileName);
    }
}
