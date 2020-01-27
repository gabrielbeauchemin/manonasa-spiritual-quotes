const request = require('supertest')
const app = require('../app')

describe('GET /authors?q=love', () => {
    it('should return authors', async () => {
        await request(app)
            .get('/authors')
            .query({ q: 'love' })
            .then(res => {
                expect(res.status).toBe(200);
                expect(Array.isArray(res.body)).toBe(true);
                expect(res.body.length).toBeGreaterThan(0);
            });
    })
});

describe('GET /authors?q=', () => {
    it('should return authors', async () => {
        await request(app)
            .get('/authors')
            .query({ q: '' })
            .then(res => {
                expect(res.status).toBe(200);
                expect(Array.isArray(res.body)).toBe(true);
                expect(res.body.length).toBeGreaterThan(0);
            });
    })
});

describe('GET /authors?', () => {
    it('should return authors', async () => {
        await request(app)
            .get('/authors')
            .then(res => {
                expect(res.status).toBe(200);
                expect(Array.isArray(res.body)).toBe(true);
                expect(res.body.length).toBeGreaterThan(0);
            });
    })
});

describe('GET /authors?q=ajsdkdsakasdk', () => {
    it('should not return authors', async () => {
        await request(app)
            .get('/authors')
            .query({ q: 'ajsdkdsakasdk' })
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.text).toBe('[]');
            });
    })
});