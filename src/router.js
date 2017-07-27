const path = require("path");
const handlers = require("./handlers");

const router = (request, response) => {
  let endpoint = request.url;
  if (endpoint === '/') {
    handlers.serveLanding(request, response)
  } else if (endpoint.indexOf('public') !== -1) {
    handlers.servePublic(request, response)
  } else if (endpoint.startsWith('/?q=')) {
    handlers.handleSearch(request, response)
  } else {
    handlers.pageNotFound(request, response)
  }
}
module.exports = router;
