var SearchResult = document.querySelector("#SearchResult");
var userFormEl = document.querySelector("#user-form");
var selectformat = document.querySelector("#selectformat");
var txtkeyword = document.querySelector("#txtkeyword");
var btnGoBack = document.querySelector("#btnGoBack");

var formSubmitHandler = function (event) {
  event.preventDefault();

  var keyword = txtkeyword.value.trim();
  var format = selectformat.value;
  if (keyword) {
    var url = `https://www.loc.gov/search/?q=${keyword}&fo=json`;
    if (format != "") {
      url = `https://www.loc.gov/${format}/?q=${keyword}&fo=json`;
    }
    getDataFromAPI(url);
  } else {
    alert("Please enter a keyword to search");
  }
};
function InitLoadPAge()
{
    var keyword = txtkeyword.value.trim();
    var format = selectformat.value;
    if (keyword) {
      var url = `https://www.loc.gov/search/?q=${keyword}&fo=json`;
      if (format != "") {
        url = `https://www.loc.gov/${format}/?q=${keyword}&fo=json`;
      }
      getDataFromAPI(url);
    }
}
var getDataFromAPI = function (url) {
  var apiUrl = url;
  console.log(apiUrl);
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data.results);
        LoadGrid(data.results);
      });
    } else {
      document.location.replace("./index.html");
    }
  });
};

var LoadGrid = function (data) {
  if (data.length === 0) {
    SearchResult.textContent = "Empty data for this search!";
    return;
  }
  var data1 = document.createElement("h2");
  data1.textContent = `Showing results for ${txtkeyword.value.trim()}`;
  SearchResult.appendChild(data1);
  for (var i = 0; i < data.length; i++) {
    var data2 = document.createElement("div");

    data2.classList = "result-grid";
    var data3 = document.createElement("div");

    data3.classList = "result-head";
    data3.textContent = data[i].title;
    var data4 = document.createElement("div");
    data4.classList = "result-detail";

    data4.textContent = `Date : ${data[i].date}`;
    var data5 = document.createElement("div");
    data5.classList = "result-detail";
    data5.textContent = `Subject : ${data[i].subject}`;
    var data6 = document.createElement("div");
    data6.classList = "result-detail";
    data6.textContent = `Description : ${data[i].description}`;
    var button = document.createElement("button");
    button.classList = "btn btn_yellow";
    button.textContent = "Read More";
    data2.appendChild(data3);
    data2.appendChild(data4);
    data2.appendChild(data5);
    data2.appendChild(data6);
    data2.appendChild(button);
    //issueEl.setAttribute('href', issues[i].html_url);
    SearchResult.append(data2);
  }
};
function fucGoBack() {
  window.location.href = location.protocol + "//" + location.host;
  return;
}

userFormEl.addEventListener("submit", formSubmitHandler);
btnGoBack.addEventListener("click", fucGoBack);
var url = new URL(location.href);
console.log(url);
var format = url.searchParams.get("Format");
var keyword = url.searchParams.get("keyword");
selectformat.value = format;
txtkeyword.value = keyword;
InitLoadPAge();
// userFormEl.submit();
