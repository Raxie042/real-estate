'use client';

import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Send, Search, MoreVertical, Phone, Video, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/lib/toast';
import api from '@/lib/api';
import io from 'socket.io-client';
import { useTranslations } from 'next-intl';
import { usePreferences } from '@/lib/preferences-context';

interface ChatRoom {
  id: string;
  listing: {
    id: string;
    title: string;
    images: string[];
  };
  participants: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }>;
  messages: Array<{
    id: string;
    content: string;
    senderId: string;
    createdAt: string;
    sender: {
      firstName: string;
      lastName: string;
    };
  }>;
  createdAt: string;
  updatedAt: string;
}

export default function MessagesPage() {
  const t = useTranslations('MessagesPage');
  const { locale } = usePreferences();
  const { user } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  // Connect to WebSocket
  useEffect(() => {
    const socketConnection = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000', {
      auth: { token: localStorage.getItem('token') }
    });

    socketConnection.on('connect', () => {
      console.log('Connected to chat server');
    });

    socketConnection.on('newMessage', (message: any) => {
      queryClient.invalidateQueries({ queryKey: ['chatRooms'] });
      if (message.roomId === selectedRoom) {
        queryClient.invalidateQueries({ queryKey: ['chatMessages', selectedRoom] });
      }
    });

    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, [selectedRoom, queryClient]);

  // Fetch chat rooms
  const { data: chatRooms = [], isLoading } = useQuery<ChatRoom[]>({
    queryKey: ['chatRooms'],
    queryFn: async () => {
      const response = await api.chat?.getRooms?.() || { data: [] };
      return response.data;
    },
  });

  // Fetch messages for selected room
  const { data: messages = [] } = useQuery({
    queryKey: ['chatMessages', selectedRoom],
    queryFn: async () => {
      if (!selectedRoom) return [];
      const response = await api.chat?.getMessages?.(selectedRoom) || { data: [] };
      return response.data;
    },
    enabled: !!selectedRoom,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!selectedRoom) return;
      return api.chat?.sendMessage?.(selectedRoom, { content }) || Promise.resolve({ data: {} });
    },
    onSuccess: () => {
      setNewMessage('');
      queryClient.invalidateQueries({ queryKey: ['chatMessages', selectedRoom] });
      queryClient.invalidateQueries({ queryKey: ['chatRooms'] });
    },
    onError: () => {
      showError(t('failedToSend'));
    },
  });

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedRoom) return;
    sendMessageMutation.mutate(newMessage);
  };

  const selectedRoomData = chatRooms.find(room => room.id === selectedRoom);
  const otherParticipant = selectedRoomData?.participants.find(p => p.id !== user?.id);

  // Filter chat rooms by search
  const filteredRooms = chatRooms.filter(room => {
    const participant = room.participants.find(p => p.id !== user?.id);
    const participantName = `${participant?.firstName} ${participant?.lastName}`.toLowerCase();
    const listingTitle = room.listing.title.toLowerCase();
    return participantName.includes(searchQuery.toLowerCase()) || 
           listingTitle.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-[#1C1A17] mb-6">{t('title')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Chat List Sidebar */}
          <div className="lg:col-span-1 lux-card overflow-hidden flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-[#E8E1D7]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7A6E60]" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#E8E1D7] rounded-lg focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent"
                />
              </div>
            </div>

            {/* Chat Rooms List */}
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="p-8 text-center text-[#7A6E60]">{t('loadingChats')}</div>
              ) : filteredRooms.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-[#7A6E60] mb-2">{t('noConversations')}</p>
                  <p className="text-sm text-[#9A8E80]">
                    {t('noConversationsHint')}
                  </p>
                </div>
              ) : (
                filteredRooms.map((room) => {
                  const participant = room.participants.find(p => p.id !== user?.id);
                  const lastMessage = room.messages[room.messages.length - 1];
                  
                  return (
                    <button
                      key={room.id}
                      onClick={() => setSelectedRoom(room.id)}
                      className={`w-full p-4 text-left hover:bg-[#F6F2EC] transition border-b border-[#E8E1D7] ${
                        selectedRoom === room.id ? 'bg-[#F6F2EC]' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        <Image
                          src={room.listing.images[0] || '/placeholder.jpg'}
                          alt={room.listing.title}
                          width={48}
                          height={48}
                          unoptimized
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-medium text-[#1C1A17] truncate">
                              {participant?.firstName} {participant?.lastName}
                            </p>
                            {lastMessage && (
                              <span className="text-xs text-[#7A6E60]">
                                {new Date(lastMessage.createdAt).toLocaleDateString(locale, { month: 'short', day: 'numeric' })}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-[#7A6E60] truncate mb-1">
                            {room.listing.title}
                          </p>
                          {lastMessage && (
                            <p className="text-sm text-[#9A8E80] truncate">
                              {lastMessage.content}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-2 lux-card overflow-hidden flex flex-col">
            {selectedRoom && selectedRoomData ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-[#E8E1D7] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="font-semibold text-[#1C1A17]">
                        {otherParticipant?.firstName} {otherParticipant?.lastName}
                      </h3>
                      <p className="text-sm text-[#7A6E60]">
                        {selectedRoomData.listing.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-[#F6F2EC] rounded-lg transition">
                      <Phone className="w-5 h-5 text-[#7A6E60]" />
                    </button>
                    <button className="p-2 hover:bg-[#F6F2EC] rounded-lg transition">
                      <Video className="w-5 h-5 text-[#7A6E60]" />
                    </button>
                    <button className="p-2 hover:bg-[#F6F2EC] rounded-lg transition">
                      <MoreVertical className="w-5 h-5 text-[#7A6E60]" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message: any) => {
                    const isOwn = message.senderId === user?.id;
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            isOwn
                              ? 'bg-[#C9A96A] text-white'
                              : 'bg-white border border-[#E8E1D7] text-[#1C1A17]'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              isOwn ? 'text-white/70' : 'text-[#7A6E60]'
                            }`}
                          >
                            {new Date(message.createdAt).toLocaleTimeString(locale, {
                              hour: 'numeric',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-[#E8E1D7]">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="p-3 hover:bg-[#F6F2EC] rounded-lg transition"
                    >
                      <ImageIcon className="w-5 h-5 text-[#7A6E60]" />
                    </button>
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={t('typeMessage')}
                      className="flex-1 px-4 py-3 border border-[#E8E1D7] rounded-lg focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent"
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim() || sendMessageMutation.isPending}
                      className="px-6 py-3 bg-[#C9A96A] text-white rounded-lg hover:bg-[#B78F4A] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-[#7A6E60]">
                <div className="text-center">
                  <Send className="w-16 h-16 mx-auto mb-4 text-[#C9A96A]" />
                  <p className="text-lg">{t('selectConversation')}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
