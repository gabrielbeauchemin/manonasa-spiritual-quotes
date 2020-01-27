const request = require('supertest')
const app = require('../app')

describe('GET /sources?q=love', () => {
    it('should return sources', async () => {
        await request(app)
            .get('/sources')
            .query({ q: 'love' })
            .then(res => {
                expect(res.status).toBe(200);
                expect(Array.isArray(res.body)).toBe(true);
                expect(res.body.length).toBeGreaterThan(0);
            });
    })
});

describe('GET /sources?q=', () => {
    it('should return sources', async () => {
        await request(app)
            .get('/sources')
            .query({ q: '' })
            .then(res => {
                expect(res.status).toBe(200);
                expect(Array.isArray(res.body)).toBe(true);
                expect(res.body.length).toBeGreaterThan(0);
            });
    })
});

describe('GET /sources?', () => {
    it('should return sources', async () => {
        await request(app)
            .get('/sources')
            .then(res => {
                expect(res.status).toBe(200);
                expect(Array.isArray(res.body)).toBe(true);
                expect(res.body.length).toBeGreaterThan(0);
            });
    })
});

describe('GET /sources?q=ajsdkdsakasdk', () => {
    it('should not return sources', async () => {
        await request(app)
            .get('/sources')
            .query({ q: 'ajsdkdsakasdk' })
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.text).toBe('[]');
            });
    })
});