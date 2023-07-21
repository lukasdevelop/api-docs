import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepo = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepo);

    await usersRepo.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    });

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456'
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong e-mail', async () => {
    const usersRepo = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepo);


    expect(() =>sut.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepo = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepo);

    await usersRepo.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    });


    expect(() => sut.execute({
      email: 'johndoe@example.com',
      password: '123123'
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

});