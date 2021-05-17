import { MongoClient } from 'mongodb';

async function handler(req, res) {
  console.log(req.method);
  if (req.method === 'POST') {
    const client = await MongoClient.connect(
      'mongodb+srv://coreymunn:Sherm@n5@cluster0.kdjja.mongodb.net/newsletter?retryWrites=true&w=majority'
    );
    const db = client.db();
    // insert a doc
    const newDoc = await db
      .collection('emails')
      .insertOne({ email: req.body.email });
    client.close();

    res.status(201).json(newDoc.ops);
  }
}

export default handler;
