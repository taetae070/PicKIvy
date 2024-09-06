import request from 'supertest'; // HTTP 요청을 테스트하기 위해 사용
import app from '../index'; // 서버 파일을 import

describe('POST /api/users', () => {
  it('should return JSON response', async () => {
    const response = await request(app)
      .post('/api/users')
      .send();

    // JSON 응답을 기대
    expect(response.headers['content-type']).toContain('application/json'); // JSON 콘텐츠 타입을 기대
    expect(response.body).toHaveProperty('message', 'Hello from the TypeScript backend!'); // JSON 메시지를 기대
  });
});
