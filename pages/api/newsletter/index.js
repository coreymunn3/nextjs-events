import { insertDoc, connectDB } from '../../../api/db-util';

async function handler(req, res) {
  // console.log(req.method);
  let client, newDoc;
  if (req.method === 'POST') {
    try {
      client = await connectDB();
    } catch (error) {
      res.status(500).json({ error: 'Mongo Connection Failed' });
      return;
    }

    try {
      newDoc = await insertDoc(client, 'newsletter', { email: req.body.email });
      client.close();
    } catch (error) {
      res.status(500).json({ error: 'Inserting Data Failed' });
      return;
    }

    res.status(201).json(newDoc.ops);
  }
}

export default handler;
