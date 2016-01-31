var dbUtils = require('../config/db.utils.js');
var Customer = require('./customerModel.js');
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

module.exports = {

  postCustomer: function (customerObj) {
    return dbUtils.postUser(customerObj, Customer);
  },

  getCustomer: function (customerObj) {
    return Customer
      .findOne({
        email: customerObj.email
      })
      .then(function (customer) {
        if (!customer) {
          throw new Error('Customer does not exist.');
        }

        return customer;
      })
      .catch(function (error) {
        return error;
      });
  },

  updateCustomer: function (customerObj) {
    return dbUtils.updateRecord(customerObj, Customer);
  }

};

