process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../server');
const knex = require('../util/knex');
const testUser = require('../util/testuser');

chai.use(chaiHttp);

describe('routes : users', () => {

    beforeEach((done) => {
        knex.migrate.rollback()
            .then(() => {
                knex.migrate.latest()
                    .then(() => {
                        // knex.seed.run()
                        //     .then(() => {
                        done();
                    });
                //});
            });
    });

    afterEach((done) => {
        knex.migrate.rollback()
            .then(() => {
                done();
            });
    });

    describe('GET /users', () => {
        it('should list ALL blobs on /blobs GET', function(done) {
            chai.request(server)
                .get('/users')
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('GET /users/:id', () => {
        it('should return all of the given user\'s tasks and rewards and return a success response', (done) => {

            chai.request(server)
                .get('/users/1')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    done();
                });

        });

    });

    describe('DELETE /users/:id', () => {
        it('should allow a superuser to delete a user and return a success response', (done) => {
            chai.request(server)
                .delete('/users/1')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    //check that only superuser can do this
                    done();
                });

        });
    });

    describe('POST /users', () => {
        it('should allow new user registration and return a success response', (done) => {
            chai.request(server)
                .post('/users')
                .send(testUser)
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    done();
                });
        });

    });


});
