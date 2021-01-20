// index.js
// This is the main entry point of our application
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
// first require the package at the top of the file
const helmet = require('helmet')
// first require the package at the top of the file
const cors = require('cors');

// Local module imports
const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

//Run the server on a port specified in our .env file or port 4000
const port = process.env.NODE_PORT || 4000;
//Store the DB_HOST value as a variable
const DB_HOST = process.env.DB_HOST;

// get the user info form a JWT
const getUser = token =>{
  if(token){
    try{
      //return the user information from the token
      return jwt.verify(token,process.env.JWT_SECRET);
    }catch(err){
      // if there's a problem ith the tyoken ,throw an error
      throw new Error('Session invalid')
    }
  }
}


//Como fazer a organização do livro https://www.apollographql.com/docs/apollo-server/v1/example/
//Contruct a schema, using GraphQL schema language

const app = express();

// add the middleware at the top of the stack, after const app = express()
app.use(helmet());

// add the middleware after app.use(helmet());
app.use(cors());

//Connect to the database
db.connect(DB_HOST)


//Apollo Server setup
const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  context:({req})=>{
    //get the user token from the headers
    const token = req.headers.authorization;
    //try to retrieve a user with the token (E AQUI QUE ELE FICA VERIFICANDO O TOKEN E JOGANDO O USUÀRIO PRA DENTRO)
    const user = getUser(token);
    //for now, let's log the user to the console:
    console.log(user);
    //add the db modles and the user to the context
    return {models, user};
  } });

//Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });

app.listen(port, () => {
  console.log(`GraphQL Server running at ${process.env.NODE_IP}:${port}`)
});
