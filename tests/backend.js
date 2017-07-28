const test = require('tape');
const shot = require('shot');
const fs = require('fs');
const path = require('path');
const router = require('../src/router');
const api = require('../src/apiRequest')
const handlers = require('../src/handlers.js');

//see this for an example for passing different request objects to router;
//https://github.com/foundersandcoders/error-handling-workshop/blob/master/acceptance/index.js

//input validation test (for example if it has the correct input);
//test url maker function
test('trivial test', t => {
  var sum = 2
  t.pass(sum, 2, 'Testing Tape');
  t.end();
})


// test url is '/' then response should be
test('home route', (t) => {
  shot.inject(router, {
    method: 'get',
    url: '/'
  }, (res) => {
    t.equal(res.statusCode, 200, 'Should respond with a status code of 200');
    t.ok(res.payload.includes('<h1>Tentacular!</h1>'),
      'The main header should be <h1>Tentacular!</h1>')
    t.end();
  })
})


test('The server should response with a 404 if a request for an unknown url is made', (t) => {
  shot.inject(router, {
    method: 'get',
    url: '/index.htmll'
  }, (res) => {
    t.equal(res.statusCode, 404, 'Should respond with a status code of 404');

    t.equal(
      res.payload,
      "404: we've had a problem on our end!",
      'should return the 404 error string for home route'
    );

    t.end();
  })
})

test('test returns the file', (t) => {
  shot.inject(router, {
    method: 'get',
    url: '/'
  }, (res) => {
    t.equal(res.statusCode, 200, 'Should respond with a status code of 200');
    t.end();
  })
});

test(`The server should response with a list of repos if a request is made to
  "/" with a "q" query`, (t) => {

    shot.inject(router, {
      method:'get',
      url: '/?q=javascript&rebeca'
    }, (res) => {

      const parsed = JSON.parse(res.payload);

      t.ok(typeof parsed === 'object',
        'The endpoint should respond with a JSON object');

      t.ok(typeof parsed.total_count === 'number',
        'The response should have a "total_count" property with a number type');

      t.ok(Array.isArray(parsed.items),
        'The response should have an "items" property with an array type');

      t.end();
    })
})
