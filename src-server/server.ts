import express from "express";
var app = express();

//import bodyParser from "body-parser";
//app.use(bodyParser.urlencoded({ extended: true }));a


import { cleanDirPath } from "./cleanDirPath.js";
const rootPath = cleanDirPath(import.meta.url);


app.use(express.static(rootPath+"/client"));

app.get("/", (request, response) => {
  response.sendFile(rootPath+"/client/index.html");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`O servidor ta rodando na porta ${PORT}.`);
});