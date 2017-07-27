var test = require ('tape');
var router = require ('./router');
var fileHandler = require ('./handlers');

//see this for an example for passing different request objects to router;
//https://github.com/foundersandcoders/error-handling-workshop/blob/master/acceptance/index.js

test ('trivial test', t => {
  t.pass();
  t.end();
})

//input validation test (for example if it has the correct input);
//test url maker function

//test handlers.js blocks illegal characters in filename.

test ('trivial test', t => {
  t.end();
});

//test handlers.js 404s on directory traverse using ../ /.. // or domain trick with @

test ('trivial test', t => {
  t.end();
});

//test handlers.js 404s on percent-encoded directory traverse
test ('trivial test', t => {
  t.end();
});

//test handlers.js 404s on a filename which is not in the whitelist

test ('trivial test', t => {
  t.end();
});

//strecth goal: test correctly formatted API request results in API http request

test ('trivial test', t => {
  t.end();
});

//test correctly formatted file request urls (for existing file) results in content-type header

test ('trivial test', t => {
  t.end();
});

//

test ('trivial test', t => {
  t.end();
});

//

test ('trivial test', t => {
  t.end();
});
