// Authenticate and request data using XMLHttpRequest
//
// Note that we are storing the API key id and secret in JavaScript code here
// to simplify the example. In general, you will not want to do this since the
// browser will not be able to protect the secret value. For production apps,
// consider generating your access tokens on your own server and then have your
// app retrieve the new access tokens as they are available.

var api = 'https://api.helios.earth/v1';
var api_key_id = '';
var api_key_secret = '';
var jwt;

// Exchange API keys for an OAuth access token
function getToken() {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function(evt) {
    jwt = JSON.parse(this.responseText).access_token;
    console.log(jwt);
    getCameras();
    getCamerasPost();
  });
  xhr.open('POST', api + '/oauth/token', true);
  xhr.setRequestHeader('Authorization', 'Basic ' + btoa(api_key_id + ':' + api_key_secret));
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.withCredentials = true;
  xhr.send('grant_type=client_credentials');
}

// Request some data by including the access token in the Authorization header
function getCameras() {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function(evt) {
    console.log(JSON.parse(this.responseText));
  });
  xhr.open('GET', api + '/cameras', true);
  xhr.setRequestHeader('Authorization', 'Bearer ' + jwt);
  xhr.withCredentials = true;
  xhr.send();
}

// Request some data by including the access token in a POST body
function getCamerasPost() {
var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function(evt) {
    console.log(JSON.parse(this.responseText));
  });
  xhr.open('POST', api + '/cameras/_search', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send('access_token=' + jwt);
}

getToken();
