const express = require("express");

var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("client"));

// const bodyParser = require("body-parser");
// const cors = require("cors");
//const app = express();
// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));
// // parse requests of content-type - application/json
// app.use(bodyParser.json());
// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "BAH." });
// });

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/client/index.html");
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`O servidor ta rodando na porta ${PORT}.`);
});
