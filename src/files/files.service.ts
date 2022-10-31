import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { createWriteStream, createReadStream } from 'fs';
import { join } from 'path';
import { createHash, randomBytes, createCipheriv } from 'crypto';


const algoritm = 'aes-256-ctr';
const key = createHash('sha256').update('PASS').digest('base64').substring(0,32);

const filePath = join(__dirname, '..', '..', 'uploads');

@Injectable()
export class FilesService {

    async uploadedFile(file: Express.Multer.File) {
        try {
            const fileExtension = file.originalname.split('.').pop();
            const fileName = `${randomUUID()}.${fileExtension}`;

            console.log(file.buffer.toString());

            const iv = randomBytes(16);
            const cipher = createCipheriv(algoritm, key, iv);

            const encrypt = Buffer.concat([iv, cipher.update(file.buffer), cipher.final()]);

            const stream = createWriteStream(join(filePath, fileName));
            stream.write(encrypt);
            stream.close();

        } catch(e) { 
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
