var base_url = $('#baseUrl').val();
var OAUTHURL = 'https://accounts.google.com/o/oauth2/auth?';
var VALIDURL = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
var SCOPE = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
var CLIENTID = '';
var REDIRECT = base_url + 'build/buy';
var LOGOUT = 'https://accounts.google.com/Logout';
var TYPE = 'token';
var _url = OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;
var acToken;
var tokenType;
var expiresIn;
var user;
var loggedIn = false;

function loginwithgoogle() {
  var win         =   window.open(_url, "windowname1", 'width=800, height=600'); 
  var pollTimer   =   window.setInterval(function() { 
    try {
      if (win.document.URL.indexOf(REDIRECT) != -1) {
        window.clearInterval(pollTimer);
        var url =   win.document.URL;
        acToken =   gup(url, 'access_token');
        tokenType = gup(url, 'token_type');
        expiresIn = gup(url, 'expires_in');
        validateToken(acToken);
        win.close();
      }
    } catch(e) {
    }
  }, 500);
}

function validateToken(token) {
  $.ajax({
    url: VALIDURL + token,
    data: null,
    success: function (responseText) {
      getUserInfo();
      loggedIn = true;
    },
    dataType: "jsonp"
  });
}

function getUserInfo() {
  $.ajax({
    url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + acToken,
    data: null,
    success: function (resp) {
      user = resp;
      verifyAccount(user.email,user.name,'google');
      
    },
    dataType: "jsonp"
  });
}

function gup(url, name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\#&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  if (results == null)
    return "";
  else
    return results[1];
}

function startLogoutPolling() {
  loggedIn = false;
}



