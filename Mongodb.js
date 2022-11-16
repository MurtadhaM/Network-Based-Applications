
const { MongoClient, ServerApiVersion } = require('mongodb');
const { env } = require('process');

let password = env.MONGODB_PASSWORD
let username = env.MONGODB_USERNAME
const uri = `mongodb+srv://${username}:${password}@snakemongodb.uvvqkzx.mongodb.net/?retryWrites=true&w=majority`;


const mongoose = require('mongoose');








const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");

  // perform actions on the collection object

  console.log(collection.dbName);
  client.close();


});