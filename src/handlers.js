// 1. handler to return the homepage('index.html and all resources from
//index.html')
// 2. handles search --> making a call to request.js and processes the result;
// 3. handles other and returns 404 error.
const path = require("path");
const fs = require('fs');
const apiRequest = require('./apiRequest');
const router = require('./router.js');

let handlers = module.exports = {}

handlers.serveLanding = (request, response) => {
  fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), (error, file) => {
    if (error) throw error;
    response.writeHead(200, {
      'content-type': 'text.html'
    });
    response.end(file);
  });
}

handlers.servePublic = (request, response) => {
  fs.readFile(path.join(__dirname, '..', 'request.url'), (error, file) => {
    if (error) throw error;
    let content = request.url.split('.')[1];
    const contentType = {
      'index.html': 'text/html',
      'main.css': 'text/css',
      'dom.js': 'application/javascript',
      'clientRequest.js': 'application/javascript',
      'favicon.ico': 'image/x-icon',
    }
    response.writeHead(200, {`content-type: ${contentType[content]}`})
    response.end(file);
  });
}

handlers.handleSearch = (request, response) => {
  let gitInfo = apiRequest(request, response);
  response.writeHead(200, {'content-type': 'text.html'});
  response.end(gitInfo);
}

handlers.pageNotFound = (request, response) => {
  response.writeHead(404, {'content-type': 'text.html'});
  response.end();
}
