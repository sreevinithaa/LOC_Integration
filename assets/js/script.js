var userFormEl = document.querySelector('#user-form');
var selectformat = document.querySelector('#selectformat');
var txtkeyword = document.querySelector('#txtkeyword');

var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var keyword = txtkeyword.value.trim();
  
    if (keyword) {
     var url=`./search.html?keyword=${keyword}&Format=${selectformat.value}`;
     window.location.replace(url);
    
    } else {
      alert('Please enter a keyword to search');
    }
  };


userFormEl.addEventListener('submit', formSubmitHandler);