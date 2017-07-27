const test = require ('tape');
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
test('home route', (t)=>{
  shot.inject(router, {method:'get', url:'/'}, (res)=>{
    t.equal(res.statusCode, 200, 'Should respond with a status code of 200');
    t.end();
  })
})


test('test error in home route', (t)=>{
  shot.inject(router, {method:'get', url:'/index.htmll'}, (res)=>{
    t.equal(res.statusCode, 404, 'Should respond with a status code of 404');
    t.equal(res.payload, "404: we've had a problem on our end!", 'should return the 404 error string for home route');
    t.end();
  })
})

test('test returns the file', (t)=>{
  shot.inject(router, {method:'get', url:'/'}, (res)=>{
    t.equal(res.statusCode, 200, 'Should respond with a status code of 200');
    t.end();
  })
});


// const inputTests = [
//   {
//     name: 'valid payload',
//     payload:{
//       language: "javascript",
//       search: "callbacks",
//     },
//     newStatusCode: 200
//   },
//   {
//     name: 'Empty array',
//     payload:{
//       language: [],
//       search: [],
//     },
//     newStatusCode: 400
//   },
//   {
//     name: 'non-string input',
//     payload: {
//       language: 35,
//       search: 21,
//     },
//     newStatusCode: 400
//   },
//   {
//     name: 'empty language but completed search',
//     payload:{
//       language:[],
//       search: 'callbacks',
//     },
//     newStatusCode:200
//   },
//   {
//     name: 'empty search but completed language',
//     payload:{
//       language:'javascript',
//       search: [],
//     },
//     newStatusCode:200
//   },
// ];
//
// inputTests.forEach(({name, payload, newStatusCode})=>{
//   test(`Acceptance Test | ${name}`, (t)=>{
//     shot.inject(router, {method:'POST', url:'/?q=', payload}, (res)=>{
//       t.equal(res.statusCode, newStatusCode, `HTTP ${newStatusCode} | ${res.payload}`);
//       t.end();
//     });
//   });
// });
