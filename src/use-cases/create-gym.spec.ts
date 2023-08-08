import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymUseCase } from './create-gym';
import { GymsRepository } from '@/repositories/gyms-repository';

describe('Create Gym Use Case', () => {

  let gymsRepo: GymsRepository;
  let sut: CreateGymUseCase;

  beforeEach(() => {
    gymsRepo = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepo);
  });
  it('should be able to create gym', async () => {

    const { gym } = await sut.execute({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -27.5852657,
      longitude:-48.436224
    });

    expect(gym.id).toEqual(expect.any(String));
  });

});