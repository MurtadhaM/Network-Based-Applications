/**
 * @author: Murtadha Marzouq
 * @description: Just creating the connection to the database and exporting it
 */

const mongoose = require('mongoose')

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.uri 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



const connectDB = (url) => {
   console.log(url)
    return  mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }).then(() => {
      console.log("Database connected with uri: " + url);
    }).catch((err) => {
      console.log(err);
    });


} 

module.exports = connectDB
