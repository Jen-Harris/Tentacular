"use strict";

const request = require('request');
const http = require('http');
const https = require('https');
const requestFix = (res, callback) => {
  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('error', (e) => {
    callback(e);
  })
  res.on('end', () => {
    const parsedData = JSON.parse(rawData);
    callback(null, res, parsedData);
  })
}

const myRequest = (url, callback) => {
  if (url.includes('http:')) {
    http.get(url, (res) => {
      requestFix(res, callback);
    });
  } else if (url.includes('https:')) {
      https.get(url, (res) => {
        requestFix(res, callback)
      });
    };
}

const testRequest = (module) => {
  module('https://jsonplaceholder.typicode.com/users/1', function (error, response, body) {
    // console.log('module', module);
    if (error){
      console.log('error:', error);
    } else {
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
    }
  });
};

// request module test
testRequest(request);

// // myRequest module test
testRequest(myRequest);
