const { expect } = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

console.log('[test-debug] dogs.test.js loaded');

let mongoServer;
let app;

async function registerUser(agent, username, password='pw') {
  const res = await agent.post('/api/auth/register').send({ username, password });
  return res.body.token;
}

describe('Dogs API', function() {
  this.timeout(20000);

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

  it('authenticated user can register a dog', async () => {
    const token = await registerUser(request(app), 'owner1');
    const res = await request(app)
      .post('/api/dogs')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Fido', description: 'A good dog' })
      .expect(201);

    expect(res.body.dog.name).to.equal('Fido');
  });

  it('owner can remove their unadopted dog', async () => {
    const token = await registerUser(request(app), 'owner2');
    const create = await request(app).post('/api/dogs').set('Authorization', `Bearer ${token}`).send({ name: 'Rex' }).expect(201);
    const id = create.body.dog._id;

    const res = await request(app).delete(`/api/dogs/${id}`).set('Authorization', `Bearer ${token}`).expect(200);
    expect(res.body.message).to.match(/Dog removed/);
  });

  it('cannot adopt own dog', async () => {
    const token = await registerUser(request(app), 'owner3');
    const create = await request(app).post('/api/dogs').set('Authorization', `Bearer ${token}`).send({ name: 'Buddy' }).expect(201);
    const id = create.body.dog._id;

    await request(app).post(`/api/dogs/${id}/adopt`).set('Authorization', `Bearer ${token}`).send({ message: 'I love him' }).expect(403);
  });

  it('user can adopt a dog and cannot adopt again', async () => {
    const ownerToken = await registerUser(request(app), 'owner4');
    const adopterToken = await registerUser(request(app), 'adopter1');

    const create = await request(app).post('/api/dogs').set('Authorization', `Bearer ${ownerToken}`).send({ name: 'Bella' }).expect(201);
    const id = create.body.dog._id;

    const adoptRes = await request(app).post(`/api/dogs/${id}/adopt`).set('Authorization', `Bearer ${adopterToken}`).send({ message: 'Thanks for Bella' }).expect(200);
    expect(adoptRes.body.dog.status).to.equal('adopted');
    expect(adoptRes.body.dog.thankYouMessage).to.equal('Thanks for Bella');

    // second adoption attempt
    await request(app).post(`/api/dogs/${id}/adopt`).set('Authorization', `Bearer ${adopterToken}`).send({ message: 'Another' }).expect(409);
  });

  it('owner cannot remove adopted dog', async () => {
    const ownerToken = await registerUser(request(app), 'owner5');
    const adopterToken = await registerUser(request(app), 'adopter2');

    const create = await request(app).post('/api/dogs').set('Authorization', `Bearer ${ownerToken}`).send({ name: 'Luna' }).expect(201);
    const id = create.body.dog._id;

    await request(app).post(`/api/dogs/${id}/adopt`).set('Authorization', `Bearer ${adopterToken}`).send({ message: 'Thanks' }).expect(200);

    await request(app).delete(`/api/dogs/${id}`).set('Authorization', `Bearer ${ownerToken}`).expect(409);
  });

  it('list registered dogs supports filter and pagination', async () => {
    const token = await registerUser(request(app), 'owner6');

    // create 3 dogs
    await request(app).post('/api/dogs').set('Authorization', `Bearer ${token}`).send({ name: 'A' }).expect(201);
    const d2 = await request(app).post('/api/dogs').set('Authorization', `Bearer ${token}`).send({ name: 'B' }).expect(201);
    const d3 = await request(app).post('/api/dogs').set('Authorization', `Bearer ${token}`).send({ name: 'C' }).expect(201);

    // adopt B with another user
    const adopter = await registerUser(request(app), 'adopter3');
    await request(app).post(`/api/dogs/${d2.body.dog._id}/adopt`).set('Authorization', `Bearer ${adopter}`).send({ message: 'ty' }).expect(200);

    // list all
    const all = await request(app).get('/api/dogs/my').set('Authorization', `Bearer ${token}`).expect(200);
    expect(all.meta.total).to.equal(3);

    // filter adopted
    const adopted = await request(app).get('/api/dogs/my?status=adopted').set('Authorization', `Bearer ${token}`).expect(200);
    expect(adopted.meta.total).to.equal(1);

    // pagination limit=1 page=2
    const page2 = await request(app).get('/api/dogs/my?limit=1&page=2').set('Authorization', `Bearer ${token}`).expect(200);
    expect(page2.meta.page).to.equal(2);
    expect(page2.dogs).to.exist;
  });

  it('list adopted dogs returns adopted dogs for adopter', async () => {
    const ownerToken = await registerUser(request(app), 'owner7');
    const adopterToken = await registerUser(request(app), 'adopter4');

    const create = await request(app).post('/api/dogs').set('Authorization', `Bearer ${ownerToken}`).send({ name: 'Milo' }).expect(201);
    const id = create.body.dog._id;

    await request(app).post(`/api/dogs/${id}/adopt`).set('Authorization', `Bearer ${adopterToken}`).send({ message: 'ty' }).expect(200);

    const res = await request(app).get('/api/dogs/adopted').set('Authorization', `Bearer ${adopterToken}`).expect(200);
    expect(res.meta.total).to.equal(1);
    expect(res.dogs[0].name).to.equal('Milo');
  });
});
