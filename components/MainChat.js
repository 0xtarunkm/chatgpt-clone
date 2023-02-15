import { db } from '@/firebase';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message';

function MainChat({ id }) {
  const { data: session } = useSession();
  const [messages] = useCollection(
    session &&
      query(
        collection(db, 'users', session?.user?.email, 'chats', id, 'messages'),
        orderBy('createdAt', 'asc')
      )
  );
  return (
    <div className="flex-1 overflow-y-scroll scrollbar-hide">
      {messages?.empty && (
        <>
          <p className="mt-10 text-center text-white">
            Type somthing to get started
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
        </>
      )}
      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()} />
      ))}
    </div>
  );
}

export default MainChat;
