function getInput() {
  var searchData = searchInput.value;
  var languageData = languageInput.value;
  return [searchData, languageData];
}

function makeUrl(userInputArray) {
  return '?q=' + userInputArray[0] + '&' + userInputArray[1];
}
module.exports={
  getInput,
  makeUrl
}
