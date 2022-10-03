import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

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
        const newUser = await this.userRepo.create(dto);
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
      
        if (user.password !== dto.password) {
            throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);
        }

        await this.userRepo.update({
            id
        }, {
            password: dto.newPassword
        })
        return user.toResponse();
    }

    async removeUser(id: string): Promise<void> {
        const res = await this.userRepo.delete(id);

        if(res.affected === 0) {
            throw new NotFoundException('USer not found');
        }
    }
}
