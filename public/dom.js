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
    var parsedData = JSON.parse(data);

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

    // var list = document.createElement('ul');
    // var listItem = document.createElement('li');
    // var name = document.createElement('h3');
    // name.innerText = parsedData.items[0].full_name;
    // list.appendChild(listItem.appendChild(name));
    //
    // var link = document.createElement('a');
    // link.setAttribute('href', parsedData.items[0].html_url);
    // list.appendChild(link);
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
