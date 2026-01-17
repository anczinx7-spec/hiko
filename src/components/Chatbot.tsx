import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Loader2 } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { sendMessageToGemini, type Message } from '../services/gemini';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessageToGemini(content);
      const assistantMessage: Message = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all flex items-center justify-center z-50"
          aria-label="Open chat"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border">
          <div className="bg-blue-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare size={20} />
              <h3 className="font-semibold">Chat Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-600 rounded p-1 transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full text-gray-500 p-6 text-center">
                <div>
                  <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Start a conversation by typing a message below</p>
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {isLoading && (
              <div className="flex gap-3 p-4 bg-white">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 text-gray-700">
                  <Loader2 size={18} className="animate-spin" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="text-sm font-medium mb-1">Assistant</div>
                  <div className="text-gray-500">Thinking...</div>
                </div>
              </div>
            )}
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 m-4">
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput onSend={handleSendMessage} disabled={isLoading} />
        </div>
      )}
    </>
  );
}
