import { 
    Body, 
    Controller, 
    Get, 
    Param, 
    Post, 
    Put, 
    Delete, 
    ParseUUIDPipe, 
    HttpCode
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Get()
    getAll() {
        return this.service.getAll();
    }

    @Get(':id')
    getUserById(
        @Param('id') id: string
    ) {
        return this.service.getUserById(id);
    }
    
    @Post()
    createUser(
        @Body() dto: CreateUserDto
    ) {
        return this.service.createUser(dto);
    }

    @Put(':id')
    changePassword(
        @Param('id', new ParseUUIDPipe({ 
            version: '4'
        })) id: string,
        @Body() dto: UpdatePasswordDto
    ) {
        return this.service.changePassword(id, dto);
    }

    @Delete(':id')
    @HttpCode(204)
    removeUser(
        @Param('id', new ParseUUIDPipe({
            version: '4'
        })) id: string
    ) {
        return this.service.removeUser(id);
    }
}
