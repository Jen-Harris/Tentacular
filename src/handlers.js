// 1. handler to return the homepage('index.html and all resources from
      //index.html')
// 2. handles search --> making a call to request.js and processes the result;
// 3. handles other and returns 404 error.
const path = require("path");


const contentType = {
  'index.html': 'text/html',
  'main.css': 'text/css',
  'dom.js': 'application/javascript',
  'clientRequest.js': 'application/javascript',
  'favicon.ico': 'image/x-icon',
}[endpoint]
