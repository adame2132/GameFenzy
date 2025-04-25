// i need to require my app import 
// require super test
const app = require("../../server");
const superTest = require("supertest");

describe('example', () => {
    it("returns a 200 if data was fetched corectly", async()=>{
        const res = await superTest(app).get('/tests');
        expect(res.statusCode).toEqual(200);
    });
    it("returns a list", async() => {
        const res = await superTest(app).get('/tests');
        expect(Array.isArray(res.body)).toEqual(true);
        res.body.forEach(item => {
            // testing to match my schema id is added beacuse of postman output
            expect(item).toEqual(expect.objectContaining({
                _id: expect.any(String),
                name: expect.any(String),
                age: expect.any(Number),
                email: expect.any(String)

            }));
        });
    });


});