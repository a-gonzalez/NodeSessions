const express = require("express");
const app = express();

const port = 8228; 

app.get("/", (request, response) =>
{
	response.setHeader("", "");
	reponse.send("Abril...");
}); //.listen(port);

app.listen(port);