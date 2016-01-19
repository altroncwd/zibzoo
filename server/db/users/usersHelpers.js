var User = require('./usersModel.js');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');




module.exports = {

  postUser: function(userObj) {
    console.log('USEROBJ', userObj);
    return User.findOne({
      'username': userObj.username
    })

    .then(function(user) {
      console.log('USER', user);
      if(user) {
        throw Error('User already exists!')
      }
      var newUser = new User({
        'username': userObj.username
      });
      return newUser.save()
    })

    .then(function(result) {
      console.log('RESULT', typeof result);
      if(!result) {
        throw Error('Unable to save user');
      }
      return result;
    })
    .catch(function(error) {
      console.log("Error adding user: ", error);
    });
  },

  getUser: function(userObj) {
    User.findOne({
      'username': userObj.username
    })
    .then(function(user) {
      if(!user) {
        throw Error('User does not exist');
      }
      console.log(user);
      // res.status(200).send(user);
    })
    .catch(function(error) {
      console.log("Error retrieving user: ", error);
    })
  }

}

