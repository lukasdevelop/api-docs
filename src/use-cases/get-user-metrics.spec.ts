import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository';
import { GetUserMetricsUseCase } from './get-user-metrics';


let checkInsRepo: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe('Get User Metrics Use Case', () => {
  beforeEach(async () =>{
    checkInsRepo = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepo); 
  });

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepo.create({
      gym_id: 'gym-1',
      user_id:'user-1'
    });

    await checkInsRepo.create({
      gym_id: 'gym-2',
      user_id:'user-1'
    });

    const { checkInsCount } = await sut.execute({
      userId: 'user-1',

    });

    expect(checkInsCount).toEqual(2);

  });

});