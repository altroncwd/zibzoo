module.exports = {

  sendHttpResponse: function (queryResult, httpResponse, successStatus, failureStatus) {
    if (!(queryResult instanceof Error)) {
      httpResponse.status(successStatus).send(queryResult);
    } else {
      httpResponse.status(failureStatus).send(queryResult.message);
    }
  }

};
