import app from '../src/server';
import request from 'supertest';

describe('Test the express application', () => {
  test('It should success response to the get method', () => {
    return request(app).get('/').expect(200);
  });
});