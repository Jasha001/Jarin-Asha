const request = require('supertest');
const sinon = require('sinon');
const faker = require('@faker-js/faker').faker;
const db = require('../src/database');
const app = require('../src/app');

describe('User API Tests', () => {
  afterEach(() => sinon.restore());

  test('GET /users - success', async () => {
    const fakeUsers = [{ id: 1, name: 'Test User', email: 'test@example.com' }];
    sinon.stub(db, 'query').resolves({ rows: fakeUsers });

    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(fakeUsers);
  });

  test('POST /users - success', async () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const fakeUser = { id: 1, name, email };

    sinon.stub(db, 'query').resolves({ rows: [fakeUser] });

    const res = await request(app)
      .post('/users')
      .send({ name, email });

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(fakeUser);
  });
});
