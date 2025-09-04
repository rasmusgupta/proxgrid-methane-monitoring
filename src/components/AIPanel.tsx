'use client';

import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface AIPanelProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIPanel({ collapsed, onToggle }: AIPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Thank you for your interest in our system. The system is currently in demo mode. Please contact us at rg@proxgrid.com or mv@proxgrid.com for more information.',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Demo mode response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Thank you for your interest in our system. The system is currently in demo mode. Please contact us at rg@proxgrid.com or mv@proxgrid.com for more information.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (collapsed) {
    return (
      <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-md border border-purple-400/20 rounded-l-xl shadow-lg h-full flex items-center justify-center">
        <button
          onClick={onToggle}
          className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
        >
          ←
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-md border border-purple-400/20 rounded-l-xl shadow-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-purple-400/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <h3 className="text-white font-semibold">AI Assistant</h3>
          </div>
          <button
            onClick={onToggle}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            →
          </button>
        </div>
        <p className="text-gray-400 text-xs mt-1">Powered by ProxGrid AI</p>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white/10 text-gray-200'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-60 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-purple-400/20">
        <div className="flex space-x-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="System in demo mode - Contact us for full access..."
            className="input-field flex-1 resize-none h-10"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg transition-colors duration-200"
          >
            <PaperAirplaneIcon className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}