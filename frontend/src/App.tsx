import React, { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { TokenModal } from './components/chat/TokenModal';
import { ChatMessage } from './components/chat/ChatMessage';
import { ChatInput } from './components/chat/ChatInput';
import { SuggestionChips } from './components/chat/SuggestionChips';
import { AudioMessage } from './components/chat/AudioMessage';
import { Portfolio } from './pages/Portfolio';

interface Message {
  sender: 'user' | 'assistant';
  text?: string;
  audio?: string;
}

const API_URL = 'http://localhost:3000/chat';

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { 
      sender: 'assistant', 
      text: `# ✨ Welcome to KayaAI!

I'm your AI assistant, ready to help you create and manage tokens on the blockchain.

**Key Features:**
- Wormhole Token 
- NFT Collection Launch
- Smart Contract Generation
- Token Management

*What would you like to create today?*`
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTokenType, setActiveTokenType] = useState<'ERC20' | 'ERC721' | null>(null);
  const [currentView, setCurrentView] = useState<'chat' | 'portfolio'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleTokenFormSubmit = (tokenType: 'ERC20' | 'ERC721', formData: any) => {
    const response = `## ✅ Token Creation Confirmed

**${tokenType} Token Details:**
- Name: **${formData.name}**
- Symbol: **${formData.symbol}**
${tokenType === 'ERC20' 
  ? `- Initial Supply: **${formData.initialSupply}**`
  : `- Max Supply: **${formData.maxSupply}**
- Base URI: **${formData.baseUri}**`}

🚀 Deploying your token to the network...`;

    setMessages(prev => [...prev, { sender: 'assistant', text: response }]);
    setIsModalOpen(false);
    setActiveTokenType(null);
  };

  const sendChatMessage = async (message: string) => {
    try {
      console.log('Sending request to:', API_URL);
      const response = await axios.post(API_URL, {
        query: message
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 second timeout
      });

      console.log('API Response:', response.data);
      return response.data.response;
    } catch (error) {
      console.error('API Error:', error);
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED') {
          return "Error: Cannot connect to the chat server. Please ensure it's running at " + API_URL;
        }
        if (error.response) {
          return `Error: Server responded with status ${error.response.status}`;
        }
        if (error.request) {
          return "Error: No response received from the server";
        }
      }
      return "An unexpected error occurred. Please try again.";
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    if (isThinking) return;
    
    if (suggestion === "Mint ERC-20 Token") {
      setActiveTokenType('ERC20');
      setIsModalOpen(true);
      return;
    }
    
    if (suggestion === "Mint ERC-721 NFT") {
      setActiveTokenType('ERC721');
      setIsModalOpen(true);
      return;
    }
    
    setInput(suggestion);
    setMessages(prev => [...prev, { sender: 'user', text: suggestion }]);
    setIsThinking(true);

    const response = await sendChatMessage(suggestion);
    setMessages(prev => [...prev, { 
      sender: 'assistant', 
      text: response
    }]);
    setIsThinking(false);
    setInput("");
  };

  const handleAudioRecorded = (audioBlob: Blob) => {
    const audioUrl = URL.createObjectURL(audioBlob);
    setMessages(prev => [...prev, { sender: 'user', audio: audioUrl }]);
    
    setIsThinking(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'assistant',
        text: "I've received your audio message. How can I help you with token creation today?"
      }]);
      setIsThinking(false);
    }, 1000);
  };

  const onSendMessage = async () => {
    if (!input.trim() || isThinking) return;
    
    const message = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: message }]);
    setIsThinking(true);
    setInput("");

    const response = await sendChatMessage(message);
    setMessages(prev => [...prev, { 
      sender: 'assistant', 
      text: response
    }]);
    setIsThinking(false);
  };

  const suggestionChips = [
    "Swap Token",
    "Transfer Sui",
    "Bridge Sui to Solana"
  ];

  const handleNavigationChange = (view: string) => {
    if (view === 'portfolio') {
      setCurrentView('portfolio');
    } else {
      setCurrentView('chat');
    }
  };

  return (
    <div className="min-h-screen bg-dark-50 flex overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onNavigationChange={handleNavigationChange}
        currentView={currentView}
      />

      <div className="flex-1 flex flex-col min-h-screen relative">
        <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

        <main className="flex-1 p-6 overflow-hidden">
          {currentView === 'portfolio' ? (
            <Portfolio />
          ) : (
            <div className="w-full max-w-4xl mx-auto h-[calc(100vh-12rem)] glass-panel flex flex-col overflow-hidden gradient-border">
              <div className="flex-1 overflow-y-auto space-y-6 p-6 scrollbar-thin scrollbar-thumb-dark-200 scrollbar-track-transparent">
                {messages.map((msg, index) => (
                  <div key={index}>
                    {msg.text && (
                      <ChatMessage 
                        sender={msg.sender}
                        text={msg.text}
                      />
                    )}
                    {msg.audio && (
                      <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <AudioMessage audioUrl={msg.audio} />
                      </div>
                    )}
                  </div>
                ))}
                
                {isThinking && (
                  <div className="flex items-center gap-3 text-dark-500 pl-2">
                    <Loader2 className="w-5 h-5 animate-spin text-brand-500" />
                    <span className="text-sm animate-pulse">Processing request...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-dark-200/50">
                <SuggestionChips
                  suggestions={suggestionChips}
                  onSuggestionClick={handleSuggestionClick}
                  isThinking={isThinking}
                />

                <ChatInput
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onSend={onSendMessage}
                  onAudioRecorded={handleAudioRecorded}
                  isThinking={isThinking}
                />
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>

      <TokenModal
        type={activeTokenType}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setActiveTokenType(null);
        }}
        onSubmit={handleTokenFormSubmit}
      />
    </div>
  );
}

export default App;