import Image from 'next/image';
import React from 'react';

function Message({ message }) {
  const isChatGPT = message.user.name === 'ChatGPT';
  return (
    <div className={`py-5 text-white ${isChatGPT && 'bg-[#434654]'}`}>
      <div className="flex items-center space-x-5 px-10 max-w-2xl mx-auto">
        <Image src={message.user.avatar} alt="profile" height={44} width={44} />
        <p className="pt-1 text-sm md:text-base">{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
