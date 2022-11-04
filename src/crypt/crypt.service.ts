import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { randomBytes, createCipheriv, createDecipheriv, createHash } from 'crypto';

@Injectable()
export class CryptService {

    algoritm = process.env.ALGORITM
    key = createHash('sha256').update(process.env.KEY).digest('base64').substring(0,32)

    encrypt(buffer) {
        const iv = randomBytes(8).toString('hex');
        const cipher = createCipheriv(this.algoritm, this.key, iv);

        let encrypted = cipher.update(buffer).toString('hex');
        encrypted += cipher.final('hex');
        return `${encrypted}:${iv}`;
    }

    decrypt(string) {
        const [encryptData, iv] = string.split(':');
        const decipher = createDecipheriv(this.algoritm, this.key, iv);

        let decrypted = decipher.update(encryptData, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');

        return decrypted;
    }
}
