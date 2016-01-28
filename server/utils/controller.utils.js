module.exports = {

  sendResponse: function (result, res, successStatus, failureStatus) {
    if (result._id) {
      res.status(successStatus).send(result);
    } else {
      res.status(failureStatus).send(result.message);
    }
  }

};
