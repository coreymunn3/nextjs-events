import { connectDB, insertDoc, getDocuments } from '../../../api/db-util';

async function handler(req, res) {
  // console.log(req.method);
  // console.log(req.query);

  let client, newDoc;
  // try to connect to mongo
  try {
    client = await connectDB();
  } catch (error) {
    res.status(500).json({ error: 'Mongo Connection Failed' });
    return;
  }

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
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId: req.query.eventId,
    };

    try {
      newDoc = await insertDoc(client, 'comments', newComment);
      client.close();
      res.status(201).json({ comment: newDoc.ops });
    } catch (error) {
      res.status(500).json({ error: 'Inserting Data Failed' });
      return;
    }
  }
  if (req.method === 'GET') {
    let documents;
    try {
      documents = await getDocuments(client, 'comments', {
        eventId: req.query.eventId,
      });
      res.status(200).json({
        comments: documents,
      });
      client.close();
    } catch (error) {
      res.status(500).json({ error: 'Could Not Get Documents' });
      return;
    }
  }
}

export default handler;
