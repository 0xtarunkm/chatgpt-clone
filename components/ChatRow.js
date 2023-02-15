import { db } from '@/firebase';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/solid';
import { collection, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

function ChatRow({ id }) {
  const pathName = usePathname();
  const router = useRouter();

  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages] = useCollection(
    collection(db, 'users', session?.user?.email, 'chats', id, 'messages')
  );

  useEffect(() => {
    if (!pathName) return;

    setActive(pathName.includes(id));
  }, [pathName]);

  const deleteChat = async () => {
    await deleteDoc(doc(db, 'users', session?.user?.email, 'chats', id));

    router.replace('/');
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow ${active && 'bg-gray-700/50'}`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className="flex-1 hidden md:inline-flex truncate">
        {messages?.docs[messages?.docs.length - 1]?.data().text || 'New Chat'}
      </p>
      <TrashIcon
        className="h-5 w-5 ml-auto cursor-pointer hover:opacity-50 hover:text-black text-gray-700"
        onClick={deleteChat}
      />
    </Link>
  );
}

export default ChatRow;
