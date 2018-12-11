var User = require('../models/user');
var express = require('express');
var router = express.Router();
// var bodyParser = require('body-parser');
// let dev_db_url = 'mongodb://<steffy>:<Password@1>@ds163034.mlab.com:63034/redhatscreener';
// var mongoose = require('mongoose');

// // Set up mongoose connection
// // const mongoose = require('mongoose');
// const mongoDB = process.env.MONGODB_URI || dev_db_url;
// mongoose.connect(mongoDB);
// mongoose.Promise = global.Promise;
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));





// GET /users
// Get a list of users
router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      return res.status(500).json({
        error: "Error listing users: " + err
      });
    }

    res.json(users);
  });
});

// GET /users/:id
// Get a user by ID
router.get('/:id', function(req, res) {
  User.findOne({
    _id: req.params.id
  }, function(err, user) {
    if (err) {
      return res.status(500).json({
        error: "Error reading user: " + err
      });
    }

    if (!user) {
      return res.status(404).end();
    }

    res.json(user);
  });
});

//Add new user 5c0f8a371ee71007d4153a36
router.post('/create',function(req,res){
  let user = new User(
    {
      gender: req.body.gender,
      name: req.body.name,
      location: req.body.location,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      salt: req.body.salt,
      md5: req.body.md5,
      sha1: req.body.sha1,
      sha256: req.body.sha256,
      registered: req.body.registered,
      dob: req.body.dob,
      phone: req.body.phone,
      cell: req.body.cell,
      PPS: req.body.PPS,
      picture: req.body.picture
    }
  )
  user.save(function (err) {
    if (err) {
        // return next(err);
        res.status(500).json({
          error: "Error creating user: " + err
        });
    }
    res.send('User Created successfully');
})
})

//Update existing user
router.put('/:id/update', function(req,res){
  User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
    if (err) {
      res.status(500).json({
        error: "Error updating user: " + err
      });
    }
    res.send('User details udpated.');
});
})

//Delete existing user
router.delete('/:id/delete', function(req,res){
  User.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      res.status(500).json({
        error: "Error deleting user: " + err
      });
    }
    res.send('User deleted Successfully');
  })
})
module.exports = router;
