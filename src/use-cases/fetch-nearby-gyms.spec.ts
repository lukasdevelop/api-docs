import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';

let gymsRepo: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () =>{
    gymsRepo = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepo); 
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepo.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -27.5852657,
      longitude:-48.436224
    });

    await gymsRepo.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude:-49.5229501
    });

    const { gyms } = await sut.execute({
      userLatitude: -27.5852657,
      userLongitude: -48.436224
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym'})]);

  });

});