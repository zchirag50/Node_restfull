var should =require('should'),
    request=require('supertest'),
    app =require('../index.js'),
    mongoose =require('mongoose'),
    book= mongoose.model('Book'),
    agent=request.agent(app);

describe('book crud test', function(){
    it('should allow a book post and return a read and _id',function(done){
        var bookPost={title:'C# into', auther: 'Jon', genre: 'Fiction'};

        agent.post('/api/book')
            .send(bookPost)
            .expect(200)
            .end(function(err,results){
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                done();
            })
    })
    afterEach(function(done){
        book.remove().exec(); // after running all test clear all database
        done();
    })
})