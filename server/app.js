const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//allow cross-origin requests
app.use(cors());

const uri =
   'mongodb+srv://admin:admin@graphql-tutorial.ab4vr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(uri);
mongoose.connection.once('open', () => {
   console.log('Connected to database');
});

app.use(
   '/graphql',
   graphqlHTTP({
      schema: schema,
      graphiql: true,
   })
);

app.listen(4000, () => {
   console.log('Server is running on port 4000');
});
