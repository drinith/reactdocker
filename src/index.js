// index.js
// This is the main entry point of our application
const express = require("express");
const app = express();
const { ApolloServer,gql} = require('apollo-server-express');


//Contruct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query{
    hello:String 
  }
  `;

  //Provide resolver functions for our schema fields
  const resolvers = {
    Query:{
      hello:() => 'Hello world!'
    }
  } ;

//Apollo Server setup
const server = new ApolloServer({typeDefs,resolvers});

//Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({app,path:'/api'});


const port = process.env.NODE_PORT || 3000;

//Configurações
//connect to mongodb

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Server running at ${process.env.NODE_IP}:${port}`)
});
