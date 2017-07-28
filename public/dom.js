//on.submit --> get values for language and search input fields;
//Use values to create queryString
//call request.js with 2 args: queryString and render callback

//SELECTORS
var button = document.getElementsByName('submit')[0];
var searchInput = document.getElementsByName('search')[0];
var languageInput = document.getElementsByName('language')[0];
var resultsField = document.getElementById('js-results');
var currentSearchTerm = ['',''];

//CALLBACKSa & HELPER FUNCTIONS

function renderError (message) {
    var errorDiv = document.createElement('div');
    var errorMessage = document.createTextNode(message);
    errorDiv.appendChild(errorMessage);
    resultsField.appendChild(errorDiv);
}

function render(error, data) {
  // if there is already information on the page then we need to remove it
  if (resultsField.firstElementChild) {
    resultsField.removeChild(resultsField.firstElementChild);
  }
  // then if there is an error we create an error div
  if (error) {
    renderError ("Sorry, we've got issues. Please try again!");
  } else {
    var parsedData = JSON.parse(data);

    if (!parsedData.items.length) {
      renderError(`Couldn\'t find any results for ${currentSearchTerm[0]} in ${currentSearchTerm[1]}.\n
       Try something more realistic.\n Or not. Like, whatevs.`);
    }
    else {
      var repoList = parsedData.items.map(function(repo){
        return '<li><a href = ' +
          repo.html_url +
          '><h3>' +
          repo.full_name +
          '</h3></a></li>';
      }).join('');

      var list = '<ul>' + repoList + '</ul>'
      //... and sorry for this innerHTML too =);
      resultsField.innerHTML = list;
    }

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
button.parentElement.addEventListener('submit', function(event) {
  event.preventDefault();
  currentSearchTerm = getInput();
  var queryString = makeUrl(currentSearchTerm);

  serverRequest(queryString, render);
})
