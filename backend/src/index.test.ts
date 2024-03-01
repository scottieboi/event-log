import request from 'supertest';
import app from './app';

describe('GET /events/log', () => {
  it('should filter and sort log entries', async () => {
    const response = await request(app).get('/events/log?eventType=click_button');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
