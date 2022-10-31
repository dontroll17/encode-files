import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { createWriteStream } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { CryptService } from 'src/crypt/crypt.service';

const filePath = join(__dirname, '..', '..', 'uploads');

@Injectable()
export class FilesService {
    constructor(private readonly crypt: CryptService) {}

    uploadedFile(file: Express.Multer.File) {
        try {
            const fileExtension = file.originalname.split('.').pop();
            const fileName = `${randomUUID()}.${fileExtension}`;

            const data = this.crypt.encrypt(file.buffer);
            const stream = createWriteStream(join(filePath, fileName));
            stream.write(data);
            stream.close();

        } catch(e) { 
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getFile(fileName) {
        const data = await readFile(join(filePath, fileName));
        let decryptData = this.crypt.decrypt(data.toString());
        return decryptData;
    }

}
