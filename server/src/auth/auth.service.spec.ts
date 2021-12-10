import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { mockUser } from '../note/note.service.spec';
import { UnauthorizedException } from '@nestjs/common';

const mockUserRepository = () => ({
  createUser: jest.fn(),
  findOne: jest.fn(),
});

const mockCredentials = {
  username: 'Test',
  password: 'somePassword',
};

const mockJwtService = () => ({});

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: JwtService, useFactory: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('signUp', async () => {
    userRepository.createUser.mockResolvedValue();
    const result = await authService.signUp(mockCredentials);
    expect(result).toEqual(undefined);
  });

  it('signIn', async () => {
    userRepository.findOne.mockResolvedValue(mockUser);
    const result = await authService.signIn(mockCredentials);
    expect(result).toEqual('UnauthorizedException');
  });
});
