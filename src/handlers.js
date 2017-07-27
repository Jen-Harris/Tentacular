const path = require("path");
const fs = require('fs');
const router = require('./router');
const requestModule = require('request');

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
    '/public/index.html': 'text/html',
    '/public/main.css': 'text/css',
    '/public/clientRequest.js': 'application/javascript',
    '/public/dom.js': 'application/javascript',
    '/public/favicon.ico': 'image/x-icon',
  }[url];
  console.log(url);
  // now if contentType is truthy do this stuff
  if (contentType) {
    const filePath = path.join(__dirname, '..', url);
    console.log('filepath', filePath);
    fs.readFile(filePath, (error, file) => {
      // but if there's error handle that first
      if (error) {
        response.writeHead(500, {'Content-Type': 'text/html'});
        response.end("Sorry! We've had a problem!");
      } else {
        // otherwise provide the correct file
        response.writeHead(200, {'Content-Type': contentType})
        response.end(file);
      }
    });
  };
}

handlers.handleSearch = (request, response) => {
  const searchTerms = request.url.slice(1).split('&');
  const githubUrl = `https://api.github.com/search/repositories${searchTerms[0]}+language:${searchTerms[1]}&sort=stars&order=desc`
  const options = {url : githubUrl, headers: { 'User-Agent': 'request'} };
  requestModule(options, function (error, res, body) {
    if (error) { console.log('Error is: ', error) }
    else {
      response.writeHead(200, {'Content-Type': 'application/json'})
      response.end(body);
    }
});
}

handlers.pageNotFound = (request, response) => {
  response.writeHead(404, {
    'content-type': 'text/html'
  });
  response.end("404: we've had a problem on our end!");
}
