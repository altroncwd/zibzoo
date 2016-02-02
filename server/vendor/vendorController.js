var Vendor = require('./vendorModel');
var utils = require('../config/utils.js');
var Promise = require('bluebird');
var cloudinary = require('cloudinary');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


// Require menu item model for population in _findMultipleVendors()
require('../menuItem/menuItemModel.js');


// Promisify libraries
mongoose.Promise = Promise;
Promise.promisify(cloudinary.uploader.upload);
Promise.promisifyAll(bcrypt);


var _imageConfig = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
};

cloudinary.config(_imageConfig);

function _findMultipleVendors(queryObj, options) {
  // console.log(queryObj);
  options = options || '';
  // TODO: verify .find() takes options and considers an empty string to include all options
  return Vendor
    .find(queryObj, options)
    .populate('menuItems')
    .then(function (vendors) {
      if (vendors.length === 0) {
        throw new Error('Unable to find vendor(s).');
      }

      return vendors;
    })
    .catch(function (error) {
      return error;
    });
}

function _findOneVendorByProperty(queryObj, options) {
  return _findMultipleVendors(queryObj, options)
    .then(function (vendorArr) {
      // TODO: possibly guard against the possibility of vendorArr coming back as 'undefined' and
      // vendroArr[0] trying to access the '0' property of 'undefined'
      if (vendorArr[0] && !(vendorArr[0] instanceof Error)) {
        return vendorArr[0];
      }

      return vendorArr;
    });
}

function _uploadImageToCloudinary(imagePath) {
  return cloudinary.uploader.upload(imagePath)
    .then(function (response) {
      return response;
    });
}


module.exports = {

  getMultipleVendors: function (req, res) {
    var vendors = req.query;

    _findMultipleVendors(vendors)
      .then(function (result) {
        utils.sendHttpResponse(result, res, 200, 404);
      });
  },

  // TODO: Add getOneVendor()

  signIn: function (req, res) {
    var vendor = req.body;
    var password = vendor.password;

    _findOneVendorByProperty({ email: vendor.email })
      .then(function (foundVendor) {
        var vendorData;
        if (!(foundVendor instanceof Error)) {
          vendorData = {
            _id: foundVendor._id,
            isVendor: foundVendor.isVendor
          };
        }
        // console.log(foundVendor.prototype);
        return [vendorData, foundVendor, bcrypt.compareAsync(password, foundVendor.password)];
        // return foundVendor.schema.verifyPassword(password);
      })
      .spread(function (vendorData, foundVendor, isMatch) {
        console.log('A BUNCH OF CAPITAL LETTERS!!!', isMatch);
        console.log('VENDOR DATA: ', vendorData);
        console.log('FOUND VENDOR: ', foundVendor);
        if (isMatch) {
          req.token = utils.issueToken(vendorData);
          // console.log(req);
        } else {
          throw new Error('Incorrect username or password.');
        }

        // utils.sendHttpResponse(foundVendorResult, res, 200, 403);
      })
      .catch(function (error) {
        // utils.sendHttpResponse(error, res, 200, 403);
      });
  },

  signUp: function (req, res) {
    var vendor = req.body;
    utils.saveOneUserByEmail(vendor, Vendor)
      .then(function (savedVendor) {
        utils.sendHttpResponse(savedVendor, res, 201, 403);
      });
  },

  updateOneVendor: function (req, res) {
    var vendor = req.body;

    utils.modifyOneRecordById(vendor, Vendor)
      .then(function (result) {
        utils.sendHttpResponse(result, res, 304, 404);
      });
  },

  // TODO: refactor, check req properties in client
  upload: function (req, res) {
    var filePath = req.files.file.path;
    var vendor = req.body;

    _uploadImageToCloudinary(filePath)
      .then(function (uploadedImage) {
        var vendorUpdate = {
          _id: vendor._id,
          propertiesToUpdate: {
            imageUrl: uploadedImage.url
          }
        };

        utils.modifyOneRecordById(vendorUpdate, Vendor)
          .then(function (numUpdated) {
            return numUpdated;
          });

        utils.sendHttpResponse(vendorUpdate, res, 200, 500);
      })
      .catch(function (error) {
        return error;
      });

    // delete req.files.file;
  },

};


// Export private functions for testing
if (process.env.NODE_ENV === 'test') {
  module.exports._findMultipleVendors = _findMultipleVendors;
  module.exports._uploadImageToCloudinary = _uploadImageToCloudinary;
}
