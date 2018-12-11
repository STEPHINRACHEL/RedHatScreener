var logger = require('winston');
var server = require('../../app');
var chai = require('chai');
var chaiHttp = require('chai-http');
var seed = require('../../seed/seed');
var User = require('../../models/user');
var expect = require('chai').expect;

chai.should();
chai.use(chaiHttp);

var url = 'http://127.0.0.1:8001';


describe('Users', function() {

  // Before our test suite
  before(function(done) {
    // Start our app on an alternative port for acceptance tests
    server.listen(8001, function() {
      logger.info('Listening at http://localhost:8001 for acceptance tests');

      // Seed the DB with our users
      seed(function(err) {
        done(err);
      });
    });
  });

  describe('/GET users', function() {
    it('should return a list of users', function(done) {
      chai.request(url)
        .get('/users')
        .end(function(err, res) {
          res.body.should.be.a('array');
          res.should.have.status(200);
          res.body.length.should.be.eql(100);
          done();
        });
    });
  });

  describe('/GET users/:id', function() {
    it('should return a single user', function(done) {
      // Find a user in the DB
      User.findOne({}, function(err, user) {
        var id = user._id;

        // Read this user by id
        chai.request(url)
          .get('/users/' + id)
          .end(function(err, res) {
            res.should.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.name.first).to.be.a('string');
            done();
          });
      });
    });
  });

  describe("/POST users/create",function(request,resonse){
    it("should create new user", function(done){
      // Create new user in the DB
      
      User.save({}, function(err){
        var req = reuest.body;
        chai.request(url)
        .post('/users/create')
        .end(function(err,res) {
          res.should.have.status(200);
          expect(res.body).to.be.a('string');
        })
      })
    })
  })

  describe('/PUT users/:id/update', function(){
    it("should update the user having the given id", function(done){
      // Find a user in the DB and update details
      
      User.findByIdAndUpdate({}, function(err, user){
        var user = user._id;
        chai.request(url)
        .put('users/'+id+'/update')
        .end(function(err, res){
          res.should.have.status(200);
          expect(res.body).to.be.a('string');
        })
      })
    })
  })

describe('DELETE users/:id/delete', function(){
  it("should delete the user havig the given id", function(done){
      // Find a user in the DB and delete it
    
    User.findByIdAndRemove({}, function(err,res){
      var user = user._id;
      chai.request(url)
      .delete('users'+id+'delete')
      .end(function(err,res){
        res.should.have.status(200);
        expect(res.body).to.be.a('string');
      })
    })
  })
})
});
