function handler(req, res) {
  console.log(req.method);
  if (req.method === 'POST') {
    console.log(req.body);
    res.status(201).json({ message: 'success' });
  }
}

export default handler;
