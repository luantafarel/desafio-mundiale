process.env.NODE_ENV = 'test';
const request = require('request-promise'),
    server = require('../server/server'),
    chai = require("chai"),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    expect = chai.expect;

chai.use(chaiHttp);
describe("Crawler tester", () => {
    describe("List products with", () => {
        it("Text term search and 100 as int", (done) => {
            chai.request(server).post('/').send({
                search: 'teste',
                int: 100
            }).end((end, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(100);
                for (response of res.body) {
                    response.should.have.property('name');
                    response.should.have.property('link');
                    response.should.have.property('store');
                    response.should.have.property('state');
                }
                done();
            })
        })
        it("Text term search and 300 as int", (done) => {
            chai.request(server).post('/').send({
                search: 'teste',
                int: 300
            }).end((end, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(300);
                for (response of res.body) {
                    response.should.have.property('name');
                    response.should.have.property('link');
                    response.should.have.property('store');
                    response.should.have.property('state');
                    response.should.have.property('price');
                }
                done();
            })
        })
    })
    describe("Bad body errors", () => {
        it("Return 422 if search is empty", (done) => {
            chai.request(server).post('/').send({
                search: '  ',
                int: 100
            }).end((end, res) => {
                res.should.have.status(422);
                res.error.text.should.be.eql("either search is invalid or empty or has decimal parts")
                done();
            })
        })
        it("Return 422 if int is not a valid number", (done) => {
            chai.request(server).post('/').send({
                search: 'teste',
                int: 'a'
            }).end((end, res) => {
                res.should.have.status(422);
                JSON.parse(res.error.text).msg.should.be.eql("int must be integer")
                done();
            })
        })
        it("Return 422 if int is not decimal number", (done) => {
            chai.request(server).post('/').send({
                search: 'teste',
                int: 1.2
            }).end((end, res) => {
                res.should.have.status(422);
                JSON.parse(res.error.text).msg.should.be.eql("int must be integer")
                done();
            })
        })
        it("Return 422 if int is less than 1", (done) => {
            chai.request(server).post('/').send({
                search: 'teste',
                int: 0
            }).end((end, res) => {
                res.should.have.status(422);
                JSON.parse(res.error.text).msg.should.be.eql("int must be greater than 0")
                done();
            })
        })
    })
})