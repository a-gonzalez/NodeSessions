const basicAuth = require("express-basic-auth");
const express = require("express");
const app = express();

const authorizer = (username, password /*, callback*/) =>
{
	//let result = callback(null, false);
	let result = false;

	console.log("Username: %s | Password: %s", username, password)
	
	if (username && password)
	{
		if (config.credentials[username] && config.credentials[username] === password)
		{
			//result = callback(null, true);
			result = true;

			console.log("Authenticated: %s @ %s", username, new Date().toLocaleString());
		}
		else
		{
			console.log("Rejected: %s @ %s", username, new Date().toLocaleString());
		}
	}
	return result;
};

const getUnauthorizedResponse = (request) =>
{
	let result = "No credentials provided.";

	if (request.auth)
	{
		result = `The provided credentials: (${request.auth.user} - ${request.auth.password}) were rejected.`
	}
	return result;
};

const port = 8287;
const config = {
	challenge: true,
	authorizer: authorizer,
	credentials: {
		"admin": "pudding",
		"blue": "skies",
		"green": "compartment"
	},
	unauthorizedResponse: getUnauthorizedResponse,
	//authorizeAsync: true
};

app.use(basicAuth(config));

app.get("/", (request, response) =>
{
	//console.log("Request: %o", request.headers);

	response.send("Abril...");
}); //.listen(port);

app.listen(port, () => console.log("Server running @ http://localhost:%d", port));

