import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CryptModule } from 'src/crypt/crypt.module';

@Module({
  providers: [FilesService],
  controllers: [FilesController],
  imports: [CryptModule]
})
export class FilesModule {}
