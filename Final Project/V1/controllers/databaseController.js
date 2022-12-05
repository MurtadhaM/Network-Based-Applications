const { MongoClient, ServerApiVersion } = require('mongodb');
const { env } = require('process');
let password = env.MONGODB_PASSWORD
let username = env.MONGODB_USERNAME
const mongoose = require('mongoose');
let secret = env.MONGO_SESSION_SECRET
const uri = `mongodb+srv://${username}:${password}@snakemongodb.uvvqkzx.mongodb.net/?retryWrites=true&w=majority`;


//connect to mongodb
mongoose.connect(uri
    )
.then(() => {
    console.log('Connected to MongoDB');
    
})
.catch(err => {
    console.log(err);
})



exports.isDBPresent = (dbName) => {
       MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
           if (err) throw err;
           const db = client.db(dbName);
           db.listCollections().toArray((err, collections) => {
               if (err) throw err;
               console.log(collections);
               client.close();
           })
       })
   }

   exports.createDB = (dbName) => {
       MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
           if (err) throw err;
           const db = client.db(dbName);
           db.createCollection('users', (err, res) => {
               if (err) throw err;
               console.log('Collection created!');
               client.close();
           })
       })
   }
exports.createCollection = (dbName, collectionName) => {
       MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
           if (err) throw err;
           const db = client.db(dbName);
           db.createCollection(collectionName, (err, res) => {
               if (err) throw err;
               console.log('Collection created!');
               client.close();
           })
       })
   }
   exports.checkCollection = (dbName, collectionName) => {
       MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
           if (err) throw err;
           const db = client.db(dbName);
           db.listCollections().toArray((err, collections) => {
               if (err) throw err;
               console.log(collections);
               client.close();
           })
       })
   }
   
exports.insertOne = (dbName, collectionName, data) => {
       MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
           if (err) throw err;
           const db = client.db(dbName);
           db.collection(collectionName).insertOne(data, (err, res) => {
               if (err) throw err;
               console.log('1 document inserted');
               client.close();
           })
       })
   }
   
   


   exports.findOne = (dbName, collectionName, data) => {
       MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
           if (err) throw err;
           const db = client.db(dbName);
           db.collection(collectionName).findOne(data, (
               err, res) => {
               if (err) throw err;
               console.log(res);
               client.close();
           })
       })
   }


exports.isDBPresent = (dbName) => {
    MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
        if (err) throw err;
        const db = client.db(dbName);
        db.listCollections().toArray((err, collections) => {
            if (err) throw err;
            console.log(collections);
            client.close();
        })
    })
}
