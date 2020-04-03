document.addEventListener(
  'DOMContentLoaded',
  function () {
    document.querySelector('button').addEventListener('click', onclick, false);

    function onclick() {
      search = document.getElementById('search').value;
      replace = document.getElementById('replace').value;
      terms = { term: search, replace: replace };
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, terms, setCount);
      });
    }
  },
  false
);

function setCount(res) {
  const div = document.createElement('div');
  div.textContent = `${res.count} ${res.term}s now ${res.replace}s`;
  document.body.appendChild(div);
}
