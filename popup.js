document.addEventListener(
  'DOMContentLoaded',
  function () {
    document.getElementById('count').addEventListener('click', onclick, false);
    document
      .getElementById('clear')
      .addEventListener('click', onclickclear, false);
    function onclick() {
      search = document.getElementById('search').value;
      replace = document.getElementById('replace').value;
      high = document.getElementById('high').checked;
      terms = { term: search, replace: replace, high: high };
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, terms, setCount);
      });
    }
    function onclickclear() {
      document.getElementById('results').innerHTML = '';
    }
  },
  false
);

function setCount(res) {
  const div = document.createElement('div');
  div.textContent = `${res.count} ${res.term}s now ${res.replace}s`;
  document.getElementById('results').appendChild(div);
  res = {};
}
