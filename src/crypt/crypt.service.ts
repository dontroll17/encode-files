import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { randomBytes, createCipheriv, createDecipheriv, createHash } from 'crypto';

@Injectable()
export class CryptService {

    getValue() {
        const algoritm = process.env.ALGORITM;
        const key = createHash('sha256').update(process.env.KEY).digest('base64').substring(0,32);

        return [algoritm, key];
    }

    encrypt(buffer) {
        const [algoritm, key] = this.getValue();

        const iv = randomBytes(8).toString('hex');
        const cipher = createCipheriv(algoritm, key, iv);

        let encrypted = cipher.update(buffer).toString('hex');
        encrypted += cipher.final('hex');
        return `${encrypted}:${iv}`;
    }

    decrypt(string) {
        const [algoritm, key] = this.getValue();

        const [encryptData, iv] = string.split(':');
        const decipher = createDecipheriv(algoritm, key, iv);

        let decrypted = decipher.update(encryptData, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');

        return decrypted;
    }
}
