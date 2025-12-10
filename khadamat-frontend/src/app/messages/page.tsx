'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Search, MoreVertical, Phone, Video } from 'lucide-react';

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [message, setMessage] = useState('');

  const conversations = [
    { id: 0, name: 'Ahmed Bennani', lastMessage: 'Bonjour, je suis disponible demain matin', time: '10:30', unread: 2, online: true },
    { id: 1, name: 'Fatima Alaoui', lastMessage: 'Le devis est prêt', time: '09:15', unread: 0, online: false },
    { id: 2, name: 'Youssef Tazi', lastMessage: 'Merci pour votre travail', time: 'Hier', unread: 1, online: true },
  ];

  const messages = [
    { id: 1, text: 'Bonjour, je suis intéressé par vos services de plomberie', sender: 'user', time: '10:00' },
    { id: 2, text: 'Bonjour ! Merci pour votre intérêt. Je suis disponible demain matin pour une intervention.', sender: 'pro', time: '10:05' },
    { id: 3, text: 'Parfait, pouvez-vous me donner plus de détails sur vos tarifs ?', sender: 'user', time: '10:10' },
    { id: 4, text: 'Bien sûr ! Pour une réparation simple, je facture 150 MAD + déplacement. Le devis détaillé sera offert.', sender: 'pro', time: '10:15' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] min-h-[600px]">
            <div className="grid lg:grid-cols-4 h-[600px]">
              {/* Conversations List */}
              <div className="lg:col-span-1 border-r border-[#EDEEEF] p-4">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <Input
                      placeholder="Rechercher..."
                      className="pl-10 bg-[#EDEEEF] border-0 rounded-[24px] focus:ring-2 focus:ring-primary-300"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv.id)}
                      className={`p-3 rounded-[16px] cursor-pointer transition-all duration-200 ${
                        selectedConversation === conv.id
                          ? 'bg-[#F97B22]/10 border border-[#F97B22]/20'
                          : 'hover:bg-[#EDEEEF]'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-[#EDEEEF] rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-text-primary">
                              {conv.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          {conv.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold text-text-primary truncate">{conv.name}</h4>
                            <span className="text-xs text-text-muted">{conv.time}</span>
                          </div>
                          <p className="text-xs text-text-secondary truncate">{conv.lastMessage}</p>
                        </div>
                        {conv.unread > 0 && (
                          <div className="w-5 h-5 bg-[#F97B22] rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-bold">{conv.unread}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="lg:col-span-3 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-[#EDEEEF] flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-[#EDEEEF] rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-text-primary">AB</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">Ahmed Bennani</h3>
                      <p className="text-sm text-text-muted">En ligne</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="rounded-[24px]">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="rounded-[24px]">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="rounded-[24px]">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-[24px] ${
                        msg.sender === 'user'
                          ? 'bg-[#F97B22] text-white'
                          : 'bg-[#EDEEEF] text-text-primary'
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-orange-100' : 'text-text-muted'}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-[#EDEEEF]">
                  <div className="flex space-x-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tapez votre message..."
                      className="flex-1 bg-[#EDEEEF] border-0 rounded-[24px] focus:ring-2 focus:ring-primary-300"
                      onKeyPress={(e) => e.key === 'Enter' && setMessage('')}
                    />
                    <Button
                      onClick={() => setMessage('')}
                      className="bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] px-6"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}