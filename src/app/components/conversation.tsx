'use client';

import { useConversation } from '@11labs/react';
import { useCallback, useState } from 'react';
import { Phone, PhoneOff } from 'lucide-react';

interface ConversationProps {
  className?: string;
}

export function Conversation({ className }: ConversationProps) {
  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
  });
  const [isConnected, setIsConnected] = useState(false);

  const startConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      await conversation.startSession({
        agentId: 'agent_01jvc8xjn8ewprvx6sw82zvcgq',
      });
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
    setIsConnected(false);
  }, [conversation]);

  return (
    <div className={`flex flex-col items-center gap-4 ${className || 'fixed bottom-8 left-8'}`}>
      <div className="flex gap-2">
        {!isConnected  ? (
          <button
            onClick={startConversation}
            className=" bg-blue-500 text-white rounded-full m-5 p-4 disabled:bg-gray-300"
        >
          <Phone />
        </button>
        ) : (
        <button
          onClick={stopConversation}
          className=" bg-red-500 text-white rounded-full m-5 p-4 disabled:bg-gray-300"
        >
          <PhoneOff />
        </button>
        )}
      </div>

      <div className="flex flex-col items-center">
      </div>
    </div>
  );
}
