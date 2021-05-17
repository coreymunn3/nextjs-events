import { MongoClient } from 'mongodb';
export const connectDB = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://coreymunn:Sherm@n5@cluster0.kdjja.mongodb.net/events?retryWrites=true&w=majority'
  );
  return client;
};

export const insertDoc = async (client, collection, document) => {
  const db = client.db();
  // insert a doc
  const newDoc = await db.collection(collection).insertOne(document);
  return newDoc;
};

export const getDocuments = async (client, collection, filter) => {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort({ _id: -1 })
    .toArray();

  return documents;
};
