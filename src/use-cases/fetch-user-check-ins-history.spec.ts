import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository';
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history';


let checkInsRepo: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryUseCase;

describe('Fecth User Check-in Use Case', () => {
  beforeEach(async () =>{
    checkInsRepo = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepo); 
  });

  it('should be able to fetch check-in history', async () => {
    await checkInsRepo.create({
      gym_id: 'gym-1',
      user_id:'user-1'
    });

    await checkInsRepo.create({
      gym_id: 'gym-2',
      user_id:'user-1'
    });

    const { checkIns } = await sut.execute({
      userId: 'user-1',
      page: 1
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-1'}),
      expect.objectContaining({ gym_id: 'gym-2'}),
    ]);

  });

  it('should be able to fetch paginated check-in history', async () => {

    for(let i = 1; i <= 22; i++){
      await checkInsRepo.create({
        gym_id: `gym-${i}`,
        user_id:'user-1'
      });
    }
    
    const { checkIns } = await sut.execute({
      userId: 'user-1',
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21'}),
      expect.objectContaining({ gym_id: 'gym-22'}),
    ]);

  });

});