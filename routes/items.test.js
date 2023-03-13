process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('../app');
let items = require('../fakeDb');

let onion = {name: 'onion', price: '0.99'};

beforeEach(() => {
    items.push(onion);
});

afterEach(() => {
    items.length = 0;
});

describe('GET /items', () => {
    test('get all items',async function(){
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
    })
})