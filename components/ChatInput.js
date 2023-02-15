import { db } from '@/firebase';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

function ChatInput({ id }) {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState('');

  const model = 'text-davinci-003';

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt('');

    const message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email,
        name: session?.user?.name,
        avatar: session?.user?.image,
      },
    };

    await addDoc(
      collection(db, 'users', session?.user?.email, 'chats', id, 'messages'),
      message
    );

    // Toast Notification to say loading
    const notification = toast.loading('ChatGPT is thinking');

    await fetch('/api/askQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: input,
        id,
        model,
        session,
      }),
    }).then(() => {
      // Toast Notification to say successfull
      toast.success('ChatGPT has responded', {
        id: notification,
      });
    });
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 text-sm md:text-base rounded-lg m-4 shadow-lg shadow-gray-600">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
        <input
          type="text"
          placeholder="Type your message here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={!session}
          className="focus:outline-none bg-transparent h-full font-semibold flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
        />

        <button type="submit" disabled={!session && !prompt} className="">
          <PaperAirplaneIcon className="h-5 -rotate-45" />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
