
	//FACEBOOK API
	window.fbAsyncInit = function() {
		FB.init({
			appId      : 'APP_ID',
			xfbml      : true,
			version    : 'v2.8'
		});
	};

	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	function checkLoginState() {
		FB.getLoginStatus(function(response) {
			// statusChangeCallback(response);	
			if (response.status === 'connected') 
			{
				authFacebook();
			}
			else
			{
				validateFacebookCredentials();
			}
		});
	};
	// Here we run a very simple test of the Graph API after login is
	// successful.  See statusChangeCallback() for when this call is made.
	function validateFacebookCredentials() {
		FB.api('/me?fields=name,email,last_name,first_name,picture', function(response) {
			var name = b64EncodeUnicode(response.name);
			var email = b64EncodeUnicode(response.email);
			if (typeof response.name != 'undefined') {
				verifyAccount(response.email,response.name,'facebook');
			}
		});
	};

	function authFacebook(){
		FB.login(function(response) {
			validateFacebookCredentials();
		}, {scope: 'public_profile,email'});
	};

	function statusChangeCallback(response) {
		console.log('statusChangeCallback');
		console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      authFacebook();
  } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      // document.getElementById('status').innerHTML = 'Please log ' +
      //   'into this app.';
      console.log("please log into this app");
  } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      // document.getElementById('status').innerHTML = 'Please log ' +
      //   'into Facebook.';
      console.log("Please Login to Facebook");
  }
};