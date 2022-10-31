import { Injectable } from '@nestjs/common';
import { randomBytes, createCipheriv, createDecipheriv, createHash } from 'crypto';

@Injectable()
export class CryptService {

    encrypt(buffer) {
        const algoritm = 'aes256';
        const key = createHash('sha256').update('PASS').digest('base64').substring(0,32);

        const iv = randomBytes(8).toString('hex');
        const cipher = createCipheriv(algoritm, key, iv);

        let encrypted = cipher.update(buffer).toString('hex');
        encrypted += cipher.final('hex');
        return `${encrypted}:${iv}`;
    }

    decrypt(string) {
        const algoritm = 'aes256';
        const key = createHash('sha256').update('PASS').digest('base64').substring(0,32);

        const [encryptData, iv] = string.split(':');
        const decipher = createDecipheriv(algoritm, key, iv);

        let decrypted = decipher.update(encryptData, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');

        return decrypted;
    }
}
