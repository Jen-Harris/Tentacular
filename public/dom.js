//on.submit --> get values for language and search input fields;
//Use values to create queryString
//call request.js with 2 args: queryString and render callback

//SELECTORS
var button = document.getElementsByName('submit')[0];
var searchInput = document.getElementsByName('search')[0];
var languageInput = document.getElementsByName('language')[0];
var resultsField = document.getElementById('js-results');

//CALLBACKSa & HELPER FUNCTIONS
function render(error, data) {
  // if there is already information on the page then we need to remove it
  if (resultsField.firstElementChild) {
    resultsField.removeChild(resultsField.firstElementChild);
  }
  // then if there is an error we create an error div
  if (error) {
    var errorDiv = document.createElement('div');
    var errorMessage = document.createTextNode("Sorry, we've got issues. Please try again!")
    errorDiv.appendChild(errorMessage);
    resultsField.appendChild(errorDiv);
  } else {
    console.log('we have DATAAA: ', data);
    // otherwise we render the github results. awaiting backend format.
  }
}

function getInput() {
  var searchData = searchInput.value;
  var languageData = languageInput.value;
  return [searchData, languageData];
}

function makeUrl(userInputArray) {
  return '?q=' + userInputArray[0] + '&' + userInputArray[1];
}

// either searchTerm or Language or both could be empty strings

//EVENT LISTENERS
button.addEventListener('click', function(event) {
  var queryString = makeUrl(getInput());
  serverRequest(queryString, render);
})
