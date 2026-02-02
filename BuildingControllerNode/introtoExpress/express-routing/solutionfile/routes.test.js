const request = require('supertest');
const app = require('./app');
const fs = require('fs');
const path = require('path');

const RESULTS_FILE = path.join(__dirname, 'results.json');

describe('Routes', function(){
  beforeEach(function(){
    if (fs.existsSync(RESULTS_FILE)) fs.unlinkSync(RESULTS_FILE);
  });

  afterAll(function(){
    if (fs.existsSync(RESULTS_FILE)) fs.unlinkSync(RESULTS_FILE);
  });

  test('GET /mean returns correct JSON', async function(){
    const resp = await request(app)
      .get('/mean?nums=1,3,5,7')
      .set('Accept', 'application/json');

    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({ operation: 'mean', result: 4 });
  });

  test('GET /median returns correct JSON', async function(){
    const resp = await request(app).get('/median?nums=1,3,5,7');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({ operation: 'median', result: 4 });
  });

  test('GET /mode returns correct JSON', async function(){
    const resp = await request(app).get('/mode?nums=1,1,1,2,2,3');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({ operation: 'mode', result: 1 });
  });

  test('missing nums returns 400', async function(){
    const resp = await request(app).get('/mean');
    expect(resp.status).toBe(400);
    expect(resp.body.message).toMatch(/You must pass a query key of nums/);
  });

  test('invalid number returns 400', async function(){
    const resp = await request(app).get('/mean?nums=1,foo,3');
    expect(resp.status).toBe(400);
    expect(resp.body.message).toMatch(/not a valid number/);
  });

  test('Accept: text/html returns html', async function(){
    const resp = await request(app).get('/mean?nums=1,3,5').set('Accept','text/html');
    expect(resp.status).toBe(200);
    expect(resp.type).toMatch(/html/);
    expect(resp.text).toMatch(/mean/);
  });

  test('save=true writes results.json with timestamp', async function(){
    const resp = await request(app).get('/median?nums=1,3,5&save=true');
    expect(resp.status).toBe(200);

    expect(fs.existsSync(RESULTS_FILE)).toBe(true);
    const contents = JSON.parse(fs.readFileSync(RESULTS_FILE,'utf8'));
    expect(Array.isArray(contents)).toBe(true);
    expect(contents.length).toBe(1);
    expect(contents[0].operation).toBe('median');
    expect(contents[0].timestamp).toBeDefined();
  });

  test('GET /all returns combined results', async function(){
    const resp = await request(app).get('/all?nums=1,2,3');
    expect(resp.status).toBe(200);
    expect(resp.body.operation).toBe('all');
    expect(resp.body.mean).toBe(2);
    expect(resp.body.median).toBe(2);
    expect(resp.body.mode).toBe(1);
  });
});
