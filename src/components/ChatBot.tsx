import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFaithResponse } from '../services/gemini';
import { themes } from '../config/config';
import { Religion } from '../types';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  error?: boolean;
}

interface ChatBotProps {
  religion: Religion;
}

export function ChatBot({ religion }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    const messageId = Date.now().toString();
    setMessages(prev => [...prev, { id: `user-${messageId}`, text: trimmedInput, isUser: true }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getFaithResponse(trimmedInput, religion);
      setMessages(prev => [...prev, { id: `ai-${messageId}`, text: response, isUser: false }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        id: `error-${messageId}`,
        text: error instanceof Error ? error.message : "An error occurred. Please try again.", 
        isUser: false,
        error: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[60vh] max-h-[400px] min-h-[300px]">
      <div className={`flex-1 overflow-y-auto px-3 py-2 ${themes.dark.background}`}>
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-3 ${message.isUser ? 'text-right' : 'text-left'}`}
            >
              <div
                className={`inline-block p-2 rounded-lg max-w-[85%] text-sm ${
                  message.isUser
                    ? 'bg-violet-600 text-white rounded-br-none'
                    : message.error
                    ? 'bg-red-600/20 text-red-200 rounded-bl-none'
                    : 'bg-gray-800 text-gray-100 rounded-bl-none'
                }`}
              >
                {message.text}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex space-x-2 p-2"
            >
              <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce delay-200" />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      <div className={`border-t border-gray-800 p-2 ${themes.dark.background}`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question..."
            disabled={isLoading}
            className="flex-1 p-2 text-sm border rounded-lg bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}