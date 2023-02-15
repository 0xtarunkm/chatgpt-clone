import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import ChatButton from './ChatButton';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import ChatRow from './ChatRow';

function Sidebar() {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, 'users', session.user?.email, 'chats'),
        orderBy('createdAt', 'asc')
      )
  );

  return (
    <div className="flex flex-col h-screen p-2 z-20">
      <div className="flex-1 space-y-2">
        {/* New Chat */}
        <ChatButton />

        {/* Map through the chat rows */}
        {chats?.docs.map((chat) => (
          <ChatRow key={chat.id} id={chat.id} />
        ))}
      </div>
      {session && (
        <Image
          src={session.user?.image}
          alt="profile"
          height={44}
          width={44}
          onClick={() => signOut()}
          className="rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50 transition-all duration-200"
        />
      )}
    </div>
  );
}

export default Sidebar;
