chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  var API_ROOT = '/data';

  var rawResultList = localStorage.getItem('resultList');
  var resultList;
  if (!rawResultList) {
    makeRequest();
  } else {
    resultList = JSON.parse(rawResultList);
    resultListReady(resultList);
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
    xhr.onreadystatechange = function(evt) {
      if (xhr.readyState == 4) {
        sendResponse(list);
        var jsonString = JSON.stringify(list);
        localStorage.setItem('resultList', jsonString);
        resultListReady(list)
      }
    };
    xhr.open('GET', API_ROOT + '/albums.json');
    xhr.send();
  }

})
