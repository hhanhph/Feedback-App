module.exports = {
	urls: {
	  tokenGeneration:
		"https://login.microsoftonline.com/common/oauth2/v2.0/token",
	  redirect: process.env.REDIRECT_URI
	},
	auth: {
	  clientId: process.env.CLIENT_ID,
	  clientSecret: process.env.CLIENT_SECRET
	},
	graphScopes: {
	  user:
		"user.read%20calendars.readwrite%20mail.send"
	},
	grantType: {
	  code: "authorization_code",
	  refresh: "refresh_token"
	}
  };
  