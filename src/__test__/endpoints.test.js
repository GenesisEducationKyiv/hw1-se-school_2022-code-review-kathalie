//Does not work
import request from 'supertest';
import app from '../index.js';

describe("GET /rate", () => {
    it('should return 200', () => {
        const response = request(app).get("/api/rate");

        console.log(response);
        console.log(response.text);
        expect(response.statusCode).toBe(200);
    });

    it('should return actual BTC to UAH rate',  () => {
        const response = request(app).get('/api/rate');

        expect(response.text.length).toBeGreaterThan(0);
    })
});