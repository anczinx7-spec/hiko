import { Bot, User } from 'lucide-react';
import type { Message } from '../services/gemini';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 p-4 ${isUser ? 'bg-gray-50' : 'bg-white'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
      }`}>
        {isUser ? <User size={18} /> : <Bot size={18} />}
      </div>
      <div className="flex-1 pt-1">
        <div className="text-sm font-medium mb-1">
          {isUser ? 'You' : 'Assistant'}
        </div>
        <div className="text-gray-800 whitespace-pre-wrap break-words">
          {message.content}
        </div>
      </div>
    </div>
  );
}
