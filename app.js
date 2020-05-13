
require('dotenv').config()
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

function getMongoUrl(env) {
	let protocol = env.MONGO_PROTOCOL || 'mongodb';
	let host = env.MONGO_HOST || 'localhost:27017';
	let account = env.MONGO_USERNAME ? `${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@` : '';
	return `${protocol}://${account}${host}`;
}

async function getDocumentsOnCollection(client, dbName, collectionName) {
	const collection = client.db(dbName).collection(collectionName);
	return await collection.find({}).toArray();
}

async function printCollection(client, dbName, collectionName) {
	const documents = await getDocumentsOnCollection(client, dbName, collectionName);

	console.log(`Found ${documents.length} documents:`);
	console.log(documents);
}

async function main(client) {
	console.log("Connected successfully to server.");

	const dbName = process.env.DB_NAME || 'myProject';
	const collectionName = 'myCollection';

	await printCollection(client, dbName, collectionName);

	return client;
}

function cleanup(client) {
	client.close();
}

const client = MongoClient.connect(getMongoUrl(process.env), {useUnifiedTopology: true})
	.then(main)
	.then(cleanup)
	.catch (error => {
		console.log(`DB connection error: ${error.message}`);
	}
);
