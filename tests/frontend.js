const test = require('tape');
const logic = require('../public/logic');
// const getInput = require('getInput');


// function makeUrl(userInputArray) {
//   return '?q=' + userInputArray[0] + '&' + userInputArray[1];
// }

//make url
test('makeUrl', (t)=>{
  const userInputArray = ['javascript', 'callbacks'];
  var expected = '?q=javascript&callbacks';
  var actual = logic.makeUrl(userInputArray);
  t.equal(actual, expected, 'makeUrl should return "?q=javascript&callbacks"');
  t.end();
});


//get input

// function getInput() {
//   var searchData = searchInput.value;
//   var languageData = languageInput.value;
//   return [searchData, languageData];
// }
//
// test('getInput', (t)=>{
// let searchData= 'callbacks';
//    let languageData = 'javascript';
//   var expected = ['callbacks', 'javascript'];
//   var actual = logic.getInput();
//   t.deepEqual(actual, expected, 'getInput should return');
//   t.end();
// });
