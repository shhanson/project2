process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../server');
const knex = require('../util/knex');

chai.use(chaiHttp);

describe('routes : rewards', () => {

    beforeEach((done) => {
        knex.migrate.rollback()
            .then(() => {
                knex.migrate.latest()
                    .then(() => {
                        knex.seed.run()
                            .then(() => {
                        done();
                    });
                });
            });
    });

    afterEach((done) => {
        knex.migrate.rollback()
            .then(() => {
                done();
            });
    });


    describe('GET /rewards/:id', () => {
        it('should return the reward at the specified ID and return a success message', (done) => {
            chai.request(server)
                .get('/tasks/1')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    done();
                });

        });

    });

    describe('DELETE /rewards/:id', () => {
        it('should allow a user to delete a reward and return a success response', (done) => {
            chai.request(server)
                .delete('/rewards/1')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    done();
                });

        });
    });

    describe('POST /rewards', () => {
        it('should allow the user to create a new task and return a success response', (done) => {
            // chai.request(server)
            //     .post('/tasks')
            //     .send(testUser)
            //     .end((err, res) => {
            //         should.not.exist(err);
            //         res.status.should.equal(200);
            //         done();
            //     });
        });

    });


});
