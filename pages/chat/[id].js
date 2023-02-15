import ChatInput from '@/components/ChatInput';
import MainChat from '@/components/MainChat';
import Sidebar from '@/components/Sidebar';
import { usePathname } from 'next/navigation';
import React from 'react';

function ChatPage() {
  const pathname = usePathname();

  const id = pathname?.split('chat')[1].replace('/', '');

  return (
    <main className="flex">
      <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
        <Sidebar />
      </div>
      {/* Client side notification */}

      <div className="bg-[#343541] flex-1">
        <div className="flex flex-col h-screen overflow-hidden">
          <MainChat id={id} />
          <ChatInput id={id} />
        </div>
      </div>
    </main>
  );
}

export default ChatPage;
