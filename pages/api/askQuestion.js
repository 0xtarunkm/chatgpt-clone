import { adminDb } from '@/firebaseAdmin';
import query from '@/util/queryApi';
import admin from 'firebase-admin';

export default async function handler(req, res) {
  const { prompt, id, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ message: 'Please provide a prompt' });
    return;
  }
  if (!id) {
    res.status(400).json({ message: 'Please provide a chatId' });
    return;
  }

  // ChatGPT Query
  const response = await query(prompt, id, model);

  const message = {
    text: response || 'ChatGPT could not find an answer for that',
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: 'ChatGPT',
      name: 'ChatGPT',
      avatar: 'https://assets.stickpng.com/thumbs/63c52af590250dd34bd6a9ab.png',
    },
  };

  await adminDb
    .collection('users')
    .doc(session?.user?.email)
    .collection('chats')
    .doc(id)
    .collection('messages')
    .add(message);

  res.status(200).json({ answer: message.text });
}
