import { MongoClient } from 'mongodb';

async function handler(req, res) {
  console.log(req.method);
  console.log(req.query);
  // connect to mongo
  const client = await MongoClient.connect(
    'mongodb+srv://coreymunn:Sherm@n5@cluster0.kdjja.mongodb.net/events?retryWrites=true&w=majority'
  );

  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    if (
      !email.includes('@') ||
      !name ||
      !name.trim() === '' ||
      !text ||
      !text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid Input' });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId: req.query.eventId,
    };

    const db = client.db();
    const newDoc = await db.collection('comments').insertOne(newComment);
    client.close();

    res.status(201).json({ comment: newDoc.ops });
  }
  if (req.method === 'GET') {
    const db = client.db();
    const documents = await db
      .collection('comments')
      .find({ eventId: req.query.eventId })
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({
      comments: documents,
    });
  }
}

export default handler;
