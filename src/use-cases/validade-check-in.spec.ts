import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository';
import { ValidateCheckInUseCase } from './validade-check-in';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let checkInsRepo: InMemoryCheckInsRepository;

let sut: ValidateCheckInUseCase;

describe('Check-in Use Case', () => {
  beforeEach(() =>{
    checkInsRepo = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepo); 

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
    
  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepo.create({
      gym_id: 'gym-1',
      user_id: 'user-1'
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepo.items[0].validated_at).toEqual(expect.any(Date));
  });

  it('should not be able to validate an inexistent check-in', async () => {

    await expect(() => 
      sut.execute({
        checkInId:  'inextsnte-id'
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to validate the check-in after 20 minutes of its creation ', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const createdCheckIn = await checkInsRepo.create({
      gym_id: 'gym-1',
      user_id: 'user-1'
    });

    const twentyOneMinutesInMs = 1000 * 60 * 21;

    vi.advanceTimersByTime(twentyOneMinutesInMs);

    await expect(() => 
      sut.execute({
        checkInId: createdCheckIn.id
      })
    ).rejects.toBeInstanceOf(Error);
  });
});