import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';


let checkInsRepo: InMemoryCheckInsRepository;
let gymsRepo: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check-in Use Case', () => {
  beforeEach(() =>{
    gymsRepo = new InMemoryGymsRepository();
    checkInsRepo = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepo, gymsRepo); 

    gymsRepo.items.push({
      id: 'gym-1',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-27.5852657),
      longitude: new Decimal(-48.436224)
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -27.5852657,
      userLongitude: -48.436224
    });

    expect(checkIn.id).toEqual(expect.any(String));

  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -27.5852657,
      userLongitude: -48.436224
    });

    await expect(() => 
      sut.execute({
        gymId: 'gym-1',
        userId: 'user-1',
        userLatitude: -27.5852657,
        userLongitude: -48.436224
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));
    
    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -27.5852657,
      userLongitude: -48.436224
    });

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -27.5852657,
      userLongitude: -48.436224
    });

    expect(checkIn.id).toEqual(expect.any(String));

  });

  it('should not be able to check in on distant gym', async () => {
    gymsRepo.items.push({
      id: 'gym-2',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-27.5202365),
      longitude: new Decimal(-48.4209922)
    });

    await expect(() => 
      sut.execute({
        userId: 'user-1',
        gymId: 'gym-2',
        userLatitude: -27.5756037,
        userLongitude: -48.42878
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});