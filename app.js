const express = require("express");
const app = express();

//Configurações
//connect to mongodb

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(3000, () => {
  console.log(`Server started on port`);
});
