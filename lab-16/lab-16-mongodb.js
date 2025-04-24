// lab-16-mongodb.js
use lab_db;
db.lab_collection.insertOne({name: "Test Name", value: "Test Value"});
db.lab_collection.find();
