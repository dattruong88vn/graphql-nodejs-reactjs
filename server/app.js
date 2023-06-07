const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose')
const cors = require('cors');

const schema = require('./schema/schema');
const app = express();


mongoose.connect('mongodb+srv://thanhdat:0937511757@graphql-tutorial.edo8jxp.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
    console.log("connect to DB")
})

app.use(cors());

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});