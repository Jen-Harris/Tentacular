//1. routes all requests from index.html;
//2. routes search request --> will call request.js;
//3. routes unknown url;
//go to handlers;

const path = require("path");
const handlers = require("./handlers");
const apiRequest = require("./apiRequest");

const router(localRequest, localResponse) => {
  let endpoint = localRequest.url;
  // see if there is a query string, if so then go to api Request
  if (endpoint.startsWith('/?q=')) {
    apiRequest(endpoint, response);
  }
  // In which case treat this like a file request ...
  else {
    if (endpoint === '/') {
      // this block will only change endpoint with blank url otherwise endpoint remains unchanged
      endpoint = '/index.html';
    }
    requestFile(endpoint, localResponse);
  }
}
module.exports = router;
