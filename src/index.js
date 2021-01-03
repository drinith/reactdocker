// index.js
// This is the main entry point of our application
const express = require("express");
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();
const models = require('./models')
const db =require('./db');


//Run the server on a port specified in our .env file or port 4000
const port = process.env.NODE_PORT || 4000;
//Store the DB_HOST value as a variable
const DB_HOST = process.env.DB_HOST;



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

  type Mutation{
    newNote(content: String!):Note!
  }
  
  `;

//Provide resolver functions for our schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    notes: async() =>{return await models.Note.find()},
    note:(parent, args)=>{
      return notes.find(note=>note.id===args.id);
    }
  },
  Mutation:{
    newNote: (parent,args)=>{
      let noteValue ={
        id:String(notes.length+1),
        content:args.content,
        author: 'Adam Scott'
      };
      notes.push(noteValue);
      return noteValue;

    }
  }
};

let notes = [
  { id: '1', content: 'This is a note', author: 'Adam Scott' },
  { id: '2', content: 'This is another note', author: 'Harlow Everly' },
  { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
];

const app = express();

//Connect to the database
db.connect(DB_HOST)


//Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

//Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });



//Configurações
//connect to mongodb

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`GraphQL Server running at ${process.env.NODE_IP}:${port}`)
});
