import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  
  it('should be able to get user profile', async () => {
    const {token} = await createAndAuthenticateUser(app);

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(profileResponse.statusCode).toBe(200);

    console.log(profileResponse.body);

    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'john@example.com'
      })
    );
  });
});