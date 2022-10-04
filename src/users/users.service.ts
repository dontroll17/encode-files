import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

type UserToResponse = {
    id: string;
    email: string;
}

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ) {}

    async getAll(): Promise<UserToResponse[]> {
        const users = await this.userRepo.find();
        return users.map(user => user.toResponse())
    }

    async getUserById(id: string): Promise<UserToResponse> {
        const user = await this.userRepo.findOne({
            where: {
                id
            }
        });

        if(!user) {
            throw new NotFoundException("User not found");
        }

        return user.toResponse();
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await this.userRepo.findOne({
            where: {
                email: dto.email
            }
        });
        if(user) {
            throw new HttpException('Mail already exsist', HttpStatus.CONFLICT);
        }
        const hashPas = await bcrypt.hash(dto.password, 1);
        const newUser = await this.userRepo.create({...dto, password: hashPas});
        return await this.userRepo.save(newUser);
    }

    async changePassword(id: string, dto: UpdatePasswordDto): Promise<UserToResponse> {
        const user = await this.userRepo.findOne({
            where: {
                id
            }
        });

        if (!user) {
            throw new NotFoundException("User not found");
        }
      
        const checkPassword = await bcrypt.compare(dto.password, user.password)

        if (!checkPassword) {
            throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);
        }

        const hashPas = await bcrypt.hash(dto.newPassword, 1);
        await this.userRepo.update({
            id
        }, {
            password: hashPas
        })
        return user.toResponse();
    }

    async removeUser(id: string): Promise<void> {
        const res = await this.userRepo.delete(id);

        if(res.affected === 0) {
            throw new NotFoundException('User not found');
        }
    }
}
