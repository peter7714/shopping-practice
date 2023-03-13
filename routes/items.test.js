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
    test('get all items',async () => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ items: [onion]});
    });
});

describe('GET /items/:name', () => {
    test('get item by name ',async () => {
        const res = await request(app).get(`/items/${onion.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ item: onion});
    });
})

describe('POST /items', () => {
    test('Creating an Item', async () => {
        const res = await request(app).post('/items').send({ name: 'detergent', price: '14.99'});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({item: {name: 'detergent', price: '14.99'}});
    });
});

describe('PATCH /items/:name', () => {
    test('Updating Item Attributes', async () => {
        const res = await request(app).patch(`/items/${onion.name}`).send({name: 'carrot', price: '0.89'})
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({item: {name: 'carrot', price: '0.89'}});
    });
        test('404 Invalid Name', async () => {
        const res = await request(app).patch(`/items/beef`).send({name: 'carrot', price: '0.89'})
        expect(res.statusCode).toBe(404);
    });
});

describe('DELETE /items/:name', () => {
    test('Deletes Item from Cart', async () => {
        const res = await request(app).delete(`/items/${onion.name}`)
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: 'Deleted'});
    })
    test('404 Item Not Found', async () => {
        const res = await request(app).delete(`/items/hamburger`)
        expect(res.statusCode).toBe(404);
    })
})