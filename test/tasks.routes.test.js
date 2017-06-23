process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../server');
const knex = require('../util/knex');

chai.use(chaiHttp);

describe('routes : tasks', () => {

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

    // describe('GET /tasks', () => {
    //     it('should list ALL blobs on /blobs GET', function(done) {
    //         chai.request(server)
    //             .get('/users')
    //             .end((err, res) => {
    //                 should.not.exist(err);
    //                 res.should.have.status(200);
    //                 done();
    //             });
    //     });
    // });

    describe('GET /tasks/:id', () => {
        it('should return the task at the specified ID and return a success message', (done) => {
            chai.request(server)
                .get('/tasks/1')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    done();
                });

        });

    });

    describe('DELETE /tasks/:id', () => {
        it('should allow a user to delete a task and return a success response', (done) => {
            chai.request(server)
                .delete('/tasks/1')
                .end((err, res) => {
                    should.not.exist(err);
                    res.status.should.equal(200);
                    done();
                });

        });
    });

    describe('POST /tasks', () => {
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
