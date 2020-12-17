// index.js
// This is the main entry point of our application
const express = require("express");
const app = express();
const { ApolloServer, gql } = require('apollo-server-express');

//Como fazer a organização do livro https://www.apollographql.com/docs/apollo-server/v1/example/
//Contruct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query{
    hello:String !
    notes: [Note!]!
    note(id:ID!):Note!
  }
  type Note {
    id: ID!
    content: String!
    author: String!
    }
  
  `;

//Provide resolver functions for our schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    notes: () => notes,
    note:(parent, args)=>{
      return notes.find(note=>note.id===args.id);
    }
  }
};

let notes = [
  { id: '1', content: 'This is a note', author: 'Adam Scott' },
  { id: '2', content: 'This is another note', author: 'Harlow Everly' },
  { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
];



//Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

//Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });


const port = process.env.NODE_PORT || 3000;

//Configurações
//connect to mongodb

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Server running at ${process.env.NODE_IP}:${port}`)
});
