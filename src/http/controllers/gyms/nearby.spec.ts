import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  
  it('should be able to list nearby gyms', async () => {
    const {token} = await createAndAuthenticateUser(app);

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript Gym',
        description: 'Some algo',
        phone: '11 91111-5555',
        latitude: -27.0610928,
        longitude:-49.5229501
      });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Typescript Gym',
        description: 'Some algo',
        phone: '11 91111-5555',
        latitude: -27.5852657,
        longitude:-48.436224
      });

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -27.0610928,
        longitude:-49.5229501
      })
      .set('Authorization', `Bearer ${token}`)
      .send();
      
    expect(response.statusCode).toBe(200);
    expect(response.body.gyms).toHaveLength(1);
    /*expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Javascript Gym'
      })
    ]);*/
  });
});