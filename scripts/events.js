chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  var rawResultList = localStorage.getItem('resultList');
  var resultList;
  if (!rawResultList) {
    makeRequest();
  } else {
    resultList = JSON.parse(rawResultList);
  }

  function resultListReady(list) {
    // If there are fewer than 5 results, make a request for more results
    if (list.length < 5) {
      makeRequest();
    } else {
      sendResponse(list);
    }
  }

  function makeRequest() {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', API_ROOT + '/results.json');
    xhr.send();
  }

})
