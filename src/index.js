// index.js
// This is the main entry point of our application
const express = require("express");
const app = express();


const port = process.env.NODE_PORT || 3000;

//Configurações
//connect to mongodb

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Server running at ${process.env.NODE_IP}:${port}`)
});
