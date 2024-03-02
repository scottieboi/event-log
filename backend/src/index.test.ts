import request from 'supertest';
import app from './app';

describe('GET /events/log', () => {
  it('should filter eventType', async () => {
    const response = await request(app).get('/events/log?eventType=click_button');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(29);
    expect(response.body).toContainEqual(expect.objectContaining({
      eventType: 'click_button'
    }));
  });

  it('should not filter',async () => {
    const response = await request(app).get('/events/log');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(100);
  });

  it('should filter userId', async () => {
    const response = await request(app).get('/events/log?userId=104');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(19);
    expect(response.body).toContainEqual(expect.objectContaining({
      userId: 104
    }));
  });

  it('should filter one day', async () => {
    const response = await request(app).get('/events/log?fromDate=2024-03-01&toDate=2024-03-01');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(31);
  });

  // etc..
});
