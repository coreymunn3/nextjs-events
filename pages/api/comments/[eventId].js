function handler(req, res) {
  console.log(req.method);
  console.log(req.query);
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
      id: new Date().toISOString(),
      email,
      name,
      text,
    };
    console.log(newComment);
    res
      .status(201)
      .json({ message: 'Comment Post Success', comment: newComment });
  }
  if (req.method === 'GET') {
    res.status(200).json({
      comments: [
        {
          id: '123',
          text: 'Hello 1',
          name: 'Corey M',
        },
        {
          id: '456',
          text: 'Hello 2',
          name: 'Corey M',
        },
      ],
    });
  }
}

export default handler;
