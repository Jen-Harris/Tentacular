//on.submit --> get values for language and search input fields;
//Use values to create queryString
//call request.js with 2 args: queryString and render callback

//SELECTORS
var button = document.getElementsByName('submit');
var searchInput = document.getElementsByName('search')[0];
var languageInput = document.getElementsByName('language')[0];

//CALLBACKSa & HELPER FUNCTIONS
function render(data) {

}

function getInput() {
    var searchData = searchInput.value;
    var languageData = languageInput.value;
    return [searchData, languageData];
}

function makeUrl(userInputArray) {
   return '/q=' + userInputArray[0] + '&' + userInputArray[1];
}

// either searchTerm or Language or both could be empty strings

//EVENT LISTENERS
button.addEventListener('click', function(event) {
    var queryString = makeUrl(getInput());
})