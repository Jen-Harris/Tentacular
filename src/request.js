
const http = require ('http');
const request = require ('request');
// const apikey = require ('./github-api-key');

const generateQueryString = (endpoint) => {
  const terms = endpoint.slice(1).split('&');
  console.log (terms);
  ///V only returns a string if no bad characters are matched. Otherwise, undefined.
  if (! terms[0].match (new RegExp ("[\\;,\?:@&=\+\$]")) && ! terms[1].match (new RegExp ("[\\;,\?:@&=\+\$]")))
     return `https://api.github.com/search/repositories${terms[0]}+language:${terms[1]}&sort=stars&order=desc`;
};

function errorAndResponseAndBodyCallback (err, response, body) {
  if (err) {
    if (err instanceof RangeError)
      response.writeHead (406,{'contentType' : 'text/html'});
    else
      response.writeHead (500,{'contentType' : 'text/html'});
    reponse.end();
  }
  else {
    //parse body
    //pass body
  }
}

function apiRequest (endpoint,errorAndResponseAndBodyCallback) {
  const remoteUrl = generateQueryString (endpoint);

  if (remoteUrl) {
    const options = {url : remoteUrl, headers: { 'User-Agent': 'request'} };
    request (options, (err, githubResponseObject, body) => {
      console.log ('err: ',err);
      if (err)
        errorAndResponseAndBodyCallback (err);
      else {
        errorAndResponseAndBodyCallback (null, githubResponseObject, body);
      }
    });
  }
  else {
      errorAndResponseAndBodyCallback (
        new RangeError ('We dont like your input sonny'), new http.ServerResponse);  /// passing empty Response object for quick dirty getting moving..
  }
  console.log ('Done');
}

var testQString = '/?q=tetris%20russian&java';

apiRequest (testQString, errorAndResponseAndBodyCallback);

// modules.exports = apiRequest;
