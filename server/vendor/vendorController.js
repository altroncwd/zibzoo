var Vendor = require('./vendorModel');
var utils = require('../config/utils.js');
var Promise = require('bluebird');
var cloudinary = require('cloudinary');
var mongoose = require('mongoose');


// Require menu item model for population in _findMultipleVendors()
require('../menuItem/menuItemModel.js');


// Promisify libraries
mongoose.Promise = Promise;
Promise.promisify(cloudinary.uploader.upload);


var _imageConfig = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
};

cloudinary.config(_imageConfig);

function _findMultipleVendors(queryObj) {
  return Vendor
    .find(queryObj)
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

function _uploadImageToCloudinary(imagePath) {
  return cloudinary.uploader.upload(imagePath)
    .then(function (response) {
      return response;
    });
}


module.exports = {

  getMultipleVendors: function (req, res) {
    var vendors = req.query

    _findMultipleVendors(vendors)
      .then(function (result) {
        utils.sendHttpResponse(result, res, 200, 404);
      });
  },

  // TODO: Add getOneVendor()

  signIn: function (req, res) {
    var vendor = req.body;
    // TODO: Complete signIn()
  },

  signUp: function (req, res) {
    var vendor = req.body;
    utils.findUserByEmail(vendor, Vendor)
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
if (process.env.NODE_ENV !== 'production') {
  module.exports._findMultipleVendors = _findMultipleVendors;
  module.exports._uploadImageToCloudinary = _uploadImageToCloudinary;
}
