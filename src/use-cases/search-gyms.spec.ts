import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { SearchGymsUseCase } from './search-gyms';


let gymsRepo: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Search Gyms Use Case', () => {
  beforeEach(async () =>{
    gymsRepo = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepo); 
  });

  it('should be able to search for gyms', async () => {
    await gymsRepo.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -27.5852657,
      longitude:-48.436224
    });

    await gymsRepo.create({
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: -27.5852657,
      longitude:-48.436224
    });

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym'})]);

  });

  it('should be able to fetch paginated gym search', async () => {

    for(let i = 1; i <= 22; i++){
      await gymsRepo.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.5852657,
        longitude:-48.436224
      });
    }
    
    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21'}),
      expect.objectContaining({ title: 'JavaScript Gym 22'}),
    ]);

  });

});