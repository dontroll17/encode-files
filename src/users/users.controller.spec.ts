import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { mockUserRepository } from './mocks/repository.mock';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepository
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  describe('define method', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  
    it('should be getAll method', () => {
      expect(controller.getAll).toBeDefined();
    });
  
    it('should be getById method', () => {
      expect(controller.getUserById).toBeDefined();
    });

    it('should be create method', () => {
      expect(controller.createUser).toBeDefined();
    })
  
    it('should be remove method', () => {
      expect(controller.removeUser).toBeDefined();
    });
  
    it('should be update method', () => {
      expect(controller.changePassword).toBeDefined();
    });
  });
});
