import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockUserRepository } from './mocks/repository.mock';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepository
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User))
  });

  describe('define method', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  
    it('should be getAll method', () => {
      expect(service.getAll).toBeDefined();
    });
  
    it('should be getById method', () => {
      expect(service.getUserById).toBeDefined();
    });

    it('should be create method', () => {
      expect(service.createUser).toBeDefined();
    })
  
    it('should be remove method', () => {
      expect(service.removeUser).toBeDefined();
    });
  
    it('should be update method', () => {
      expect(service.changePassword).toBeDefined();
    });
  });
});
