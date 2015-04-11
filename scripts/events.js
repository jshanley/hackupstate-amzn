chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var rawResultList = localStorage.getItem('resultList');
  var resultList;
  if (!rawResultList) {
    // TODO: make request
  } else {
    resultList = JSON.parse(rawResultList);
  }

  function resultListReady(list) {
    // If there are fewer than 5 results, make a request for more results
    if (list.length < 5) {
      // TODO: make request
    } else {
      // TODO: return results
    }
  }

})
