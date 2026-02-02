const { expect } = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

console.log('[test-debug] auth.test.js loaded');

let mongoServer;
let app;

describe('Auth API', function() {
  this.timeout(10000);

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    app = require('../app');
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  it('registers a user and returns token', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'alice', password: 'pass123' })
      .expect(201);

    expect(res.body).to.have.property('token');
    expect(res.body.user.username).to.equal('alice');
  });

  it('does not allow duplicate username', async () => {
    await request(app).post('/api/auth/register').send({ username: 'bob', password: 'a' }).expect(201);
    const res = await request(app).post('/api/auth/register').send({ username: 'bob', password: 'b' }).expect(409);
    expect(res.body.message).to.match(/username already exists/);
  });

  it('logs in with correct credentials', async () => {
    await request(app).post('/api/auth/register').send({ username: 'carl', password: 'pw' }).expect(201);
    const res = await request(app).post('/api/auth/login').send({ username: 'carl', password: 'pw' }).expect(200);
    expect(res.body).to.have.property('token');
  });

  it('rejects wrong password', async () => {
    await request(app).post('/api/auth/register').send({ username: 'dave', password: 'pw1' }).expect(201);
    await request(app).post('/api/auth/login').send({ username: 'dave', password: 'wrong' }).expect(401);
  });
});
