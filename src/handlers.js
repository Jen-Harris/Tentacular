// 1. handler to return the homepage('index.html and all resources from
//index.html')
// 2. handles search --> making a call to request.js and processes the result;
// 3. handles other and returns 404 error.
const path = require("path");
const fs = require('fs');
const apiRequest = require('./apiRequest');
const router = require('./router');

let handlers = module.exports = {}

handlers.serveLanding = (request, response) => {
  fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), (error, file) => {
    if (error) {
      response.writeHead(500, {
        'content-type': 'text/html'
      });
      response.end("Sorry! We've had a problem!");
    };
    response.writeHead(200, {
      'content-type': 'text.html'
    });
    response.end(file);
  });
}

handlers.servePublic = (request, response) => {
  // define whitelist for file endings
  const url = request.url;
  const contentType = {
    '/index.html': 'text/html',
    '/main.css': 'text/css',
    '/clientRequest.js': 'application/javascript',
    '/dom.js': 'application/javascript',
    '/favicon.ico': 'image/x-icon',
  }[url];
  // now if contentType is truthy do this stuff
  if (contentType) {
    const filePath = path.join(__dirname, '..', 'public', url);
    fs.readFile(filePath, (error, file) => {
      // but if there's error handle that first
      if(error){
        response.writeHead(500, {'content-type': 'text/html'});
        response.end("Sorry! We've had a problem!");
      } else {
        // otherwise provide the correct file
        response.writeHead(200, {'content-type':contentType})
        response.end(file);
      }
    });
  };
}

handlers.handleSearch = (request, response) => {
  let gitInfo = apiRequest(request, response);
  response.writeHead(200, {
    'content-type': 'text/html'
  });
  response.end(gitInfo);
}

handlers.pageNotFound = (request, response) => {
  response.writeHead(404, {
    'content-type': 'text/html'
  });
  response.end("404: we've had a problem on our end!");
}
