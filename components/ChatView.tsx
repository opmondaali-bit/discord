
import React, { useState, useRef, useEffect } from 'react';
import GlassCard from './GlassCard';
import type { ChatMessage } from '../types';

interface ChatViewProps {
  chatHistory: ChatMessage[];
  handleSendMessage: (message: string) => Promise<void>;
  isChatting: boolean;
}

const ChatView: React.FC<ChatViewProps> = ({
  chatHistory,
  handleSendMessage,
  isChatting,
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const onSend = async () => {
    if (input.trim()) {
      await handleSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="p-6 h-full flex items-center justify-center">
      <GlassCard className="w-full max-w-2xl h-full flex flex-col">
        <div className="p-4 border-b border-white/20">
          <h2 className="text-xl font-bold text-white text-center">Gemini Chat</h2>
        </div>
        <div className="flex-grow p-4 overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md p-3 rounded-xl ${
                    msg.role === 'user'
                      ? 'bg-sky-500 text-white'
                      : 'bg-black/30 text-white/90'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
             {isChatting && (
                <div className="flex justify-start">
                    <div className="max-w-md p-3 rounded-xl bg-black/30 text-white/90">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-sky-300 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-sky-300 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                            <div className="w-2 h-2 bg-sky-300 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="p-4 border-t border-white/20">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isChatting && onSend()}
              placeholder="Ask a question..."
              className="flex-grow bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              disabled={isChatting}
            />
            <button
              onClick={onSend}
              disabled={!input || isChatting}
              className="px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default ChatView;
