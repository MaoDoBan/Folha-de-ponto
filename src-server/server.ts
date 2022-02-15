import express from "express";
var app = express();

//import bodyParser from "body-parser";
//app.use(bodyParser.urlencoded({ extended: true }));a


import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const rootPath = path.dirname(__filename).replace("server", "");


app.use(express.static(rootPath+"client"));

app.get("/", (request, response) => {
  response.sendFile(rootPath+"client\\index.html");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`O servidor ta rodando na porta ${PORT}.`);
});