//testing 
//create a user 
// modify informatrion about that user
// delete user
// get certain user
const avaliablity = require("../../models/avaliablity");
const app = require("../../server");
const superTest = require("supertest");


describe("User Api Test", () => {
    describe('getUsers', () => {
        it("retuns a list if data with correct data", async() => {
            const res = superTest(app).get("/users");
            const data = res.body;
            expect(Array.isArray(data)).toEqual(true);
            if(data.length != 0 ){
                data.array.forEach(element => {
                    expect(element).toEqual(expect.objectContaining({
                        _id: expect.any(String),
                        fname: expect.any(String),
                        lname: expect.any(String),
                        age: expect.any(Number),
                        profile_pic: expect.anything(),
                        email: expect.any(String),
                        password: expect.any(String),
                        matches_played: expect.any(Array),
                        friends: expect.any(Array),
                        attending_Events: expect.any(Array),
                        avaliablity: expect.any(String),
                        wins: expect.any(Number),
                        loses: expect.any(Number),
                        sport_intrest: expeect.any(Array)
    
                    }));
                });
            } 
        });
        it("returns 200 status code", async () =>{
            const res = superTest(app).get("/users");
            expect(res.status).toEqual(200);
    
        });
        
    });

    // describe("getUser", () => {
    //     it("returns 200 status code", async () => {

    //     });
    // });
    
    

});

