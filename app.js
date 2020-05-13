
require('dotenv').config()

function getUrl() {
	let env = process.env;

	let protocol = env.MONGO_PROTOCOL || 'mongodb';
	let host = env.MONGO_HOST || 'localhost:27017';
	let account = env.MONGO_USERNAME ? `${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@` : '';
	return `${protocol}://${account}${host}`;
}

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = getUrl();

// Database Name
const dbName = process.env.DB_NAME || 'myProject';
const collectionName = 'myCollection';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
	assert.equal(null, err);
	console.log("Connected successfully to server");

	const db = client.db(dbName);
	const collection = db.collection(collectionName);
	collection.find({}).toArray(function(err, docs) {
		assert.equal(err, null);
		console.log("Found the following records");
		console.log(docs);
	});

	client.close();
});
