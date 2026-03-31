"use client";

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { io, Socket } from 'socket.io-client';
import { Bell, X, Check, CheckCheck } from 'lucide-react';
import Link from 'next/link';

interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
}

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [realtimeNotifications, setRealtimeNotifications] = useState<Notification[]>([]);

  const { data: notifications = [], isLoading, refetch } = useQuery<Notification[]>({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await api.notifications.getAll();
      return response.data;
    },
    refetchInterval: 30000,
  });

  // Setup socket connection for real-time notifications
  useEffect(() => {
    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
    if (!userId) return;
    const s = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000', {
      query: { userId },
    });
    setSocket(s);
    s.on('newNotification', (notification: Notification) => {
      setRealtimeNotifications((prev) => [notification, ...prev]);
      refetch();
    });
    return () => {
      s.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  // Merge real-time notifications with fetched ones (avoid duplicates)
  const allNotifications = [...realtimeNotifications, ...notifications.filter(n => !realtimeNotifications.some(rn => rn.id === n.id))];

  const unreadCount = allNotifications.filter((n: Notification) => !n.isRead).length;

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => api.notifications.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () => api.notifications.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const handleMarkAsRead = (id: string) => {
    markAsReadMutation.mutate(id);
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const getNotificationLink = (notification: Notification) => {
    if (notification.data?.listingId) {
      return `/properties/${notification.data.listingId}`;
    }
    return '#';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-[#F6F2EC] transition"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-[#5F5448]" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-[#C9A96A] text-white text-xs font-semibold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-96 bg-white border border-[#E8E1D7] rounded-xl shadow-lg z-20 max-h-96 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#E8E1D7]">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#5F5448]" />
                <h3 className="font-semibold text-[#1C1A17]">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-xs text-[#7A6E60]">({unreadCount} new)</span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-[#F6F2EC] rounded transition"
              >
                <X className="w-4 h-4 text-[#7A6E60]" />
              </button>
            </div>

            {/* Mark all as read */}
            {unreadCount > 0 && (
              <div className="px-4 py-2 border-b border-[#E8E1D7] bg-[#F8F6F3]">
                <button
                  onClick={handleMarkAllAsRead}
                  disabled={markAllAsReadMutation.isPending}
                  className="text-sm text-[#C9A96A] hover:text-[#B78F4A] font-medium flex items-center gap-1"
                >
                  <CheckCheck className="w-4 h-4" />
                  Mark all as read
                </button>
              </div>
            )}

            {/* Notifications list */}
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin w-8 h-8 border-2 border-[#C9A96A] border-t-transparent rounded-full mx-auto" />
                </div>
              ) : allNotifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-[#B9AA98] mx-auto mb-3" />
                  <p className="text-[#7A6E60] text-sm">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-[#E8E1D7]">
                  {allNotifications.map((notification: Notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-[#F8F6F3] transition ${
                        !notification.isRead ? 'bg-[#FEF9F3]' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <Link
                          href={getNotificationLink(notification)}
                          onClick={() => {
                            if (!notification.isRead) {
                              handleMarkAsRead(notification.id);
                            }
                            setIsOpen(false);
                          }}
                          className="flex-1"
                        >
                          <div className="flex items-start gap-2">
                            {!notification.isRead && (
                              <span className="w-2 h-2 bg-[#C9A96A] rounded-full mt-1.5" />
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-[#1C1A17] text-sm">
                                {notification.title}
                              </p>
                              <p className="text-[#7A6E60] text-sm mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-[#9A8B7A] mt-1">
                                {new Date(notification.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </Link>
                        {!notification.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="p-1 hover:bg-[#F6F2EC] rounded transition"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4 text-[#7A6E60]" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
