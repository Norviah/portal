"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Label } from "@/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";

import { Send, MessageSquare, Plus, Pin, Reply, MoreHorizontal, Edit, Trash2, Flag } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  author: {
    name: string;
    role: 'client' | 'manager' | 'admin';
    avatar?: string;
  };
  timestamp: string;
  isPinned?: boolean;
  isEdited?: boolean;
  replies?: Message[];
  projectId: string;
  category: 'general' | 'question' | 'issue' | 'update' | 'decision';
}

interface DiscussionBoardProps {
  projectId: string;
  projectName: string;
  currentUser: {
    name: string;
    role: 'client' | 'manager' | 'admin';
    avatar?: string;
  };
  className?: string;
}

const MESSAGE_CATEGORIES = [
  { value: 'general', label: 'General Discussion', color: 'bg-blue-100 text-blue-800' },
  { value: 'question', label: 'Question', color: 'bg-green-100 text-green-800' },
  { value: 'issue', label: 'Issue', color: 'bg-red-100 text-red-800' },
  { value: 'update', label: 'Update', color: 'bg-purple-100 text-purple-800' },
  { value: 'decision', label: 'Decision', color: 'bg-orange-100 text-orange-800' }
] as const;

export function DiscussionBoard({ projectId, projectName, currentUser, className }: DiscussionBoardProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Welcome to the project discussion board! This is where we can communicate about the Modern Home Renovation project.',
      author: { name: 'Project Manager', role: 'manager' },
      timestamp: '2024-10-08T09:00:00Z',
      projectId,
      category: 'general',
      isPinned: true
    },
    {
      id: '2',
      content: 'I have a question about the kitchen countertop options. Can we schedule a call to discuss the pros and cons of each material?',
      author: { name: 'John Smith', role: 'client' },
      timestamp: '2024-10-08T10:30:00Z',
      projectId,
      category: 'question'
    },
    {
      id: '3',
      content: 'Absolutely! I can schedule a call for tomorrow at 2 PM. Does that work for you? I\'ll also send over some additional material samples.',
      author: { name: 'Project Manager', role: 'manager' },
      timestamp: '2024-10-08T11:15:00Z',
      projectId,
      category: 'general'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'general' | 'question' | 'issue' | 'update' | 'decision'>('general');
  const [isComposing, setIsComposing] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      author: currentUser,
      timestamp: new Date().toISOString(),
      projectId,
      category: selectedCategory
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setIsComposing(false);
  };

  const handleReply = (messageId: string) => {
    if (!replyContent.trim()) return;

    const reply: Message = {
      id: Date.now().toString(),
      content: replyContent.trim(),
      author: currentUser,
      timestamp: new Date().toISOString(),
      projectId,
      category: 'general'
    };

    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, replies: [...(msg.replies || []), reply] }
        : msg
    ));

    setReplyContent('');
    setReplyingTo(null);
  };

  const getCategoryInfo = (category: string) => {
    return MESSAGE_CATEGORIES.find(cat => cat.value === category) || MESSAGE_CATEGORIES[0];
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'client': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Project Discussion</h3>
          <p className="text-sm text-muted-foreground">{projectName}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {messages.length} messages
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <Card>
        <CardContent className="p-0">
          <ScrollArea ref={scrollAreaRef} className="h-96 p-4">
            <div className="space-y-4">
              {messages.map((message) => {
                const categoryInfo = getCategoryInfo(message.category);
                const isPinned = message.isPinned;
                
                return (
                  <div key={message.id} className={cn(
                    "space-y-3",
                    isPinned && "bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800"
                  )}>
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.author.avatar} />
                        <AvatarFallback className="text-xs">
                          {getInitials(message.author.name)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{message.author.name}</span>
                          <Badge className={cn("text-xs", getRoleColor(message.author.role))}>
                            {message.author.role}
                          </Badge>
                          <Badge className={cn("text-xs", categoryInfo.color)}>
                            {categoryInfo.label}
                          </Badge>
                          {isPinned && (
                            <Pin className="h-3 w-3 text-yellow-600" />
                          )}
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(message.timestamp)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-foreground whitespace-pre-wrap">
                          {message.content}
                        </p>
                        
                        {message.isEdited && (
                          <p className="text-xs text-muted-foreground italic">(edited)</p>
                        )}
                        
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs"
                            onClick={() => setReplyingTo(replyingTo === message.id ? null : message.id)}
                          >
                            <Reply className="h-3 w-3 mr-1" />
                            Reply
                          </Button>
                          
                          {currentUser.role !== 'client' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs"
                              onClick={() => {
                                setMessages(prev => prev.map(msg => 
                                  msg.id === message.id 
                                    ? { ...msg, isPinned: !msg.isPinned }
                                    : msg
                                ));
                              }}
                            >
                              <Pin className="h-3 w-3 mr-1" />
                              {isPinned ? 'Unpin' : 'Pin'}
                            </Button>
                          )}
                        </div>
                        
                        {/* Reply Form */}
                        {replyingTo === message.id && (
                          <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                            <div className="space-y-2">
                              <Textarea
                                placeholder="Write a reply..."
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                className="min-h-[60px] text-sm"
                              />
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setReplyingTo(null);
                                    setReplyContent('');
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleReply(message.id)}
                                  disabled={!replyContent.trim()}
                                >
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Replies */}
                        {message.replies && message.replies.length > 0 && (
                          <div className="mt-3 ml-4 space-y-2">
                            {message.replies.map((reply) => (
                              <div key={reply.id} className="flex items-start gap-2 p-2 bg-muted/30 rounded">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={reply.author.avatar} />
                                  <AvatarFallback className="text-xs">
                                    {getInitials(reply.author.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-xs">{reply.author.name}</span>
                                    <Badge className={cn("text-xs", getRoleColor(reply.author.role))}>
                                      {reply.author.role}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                      {formatTimestamp(reply.timestamp)}
                                    </span>
                                  </div>
                                  <p className="text-xs text-foreground">{reply.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Message Composer */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="category" className="text-sm font-medium">Category:</Label>
              <Select value={selectedCategory} onValueChange={(value: any) => setSelectedCategory(value)}>
                <SelectTrigger className="w-40 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MESSAGE_CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Textarea
                placeholder="Write a message..."
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  setIsComposing(true);
                }}
                className="min-h-[80px] flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="self-end"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Press Ctrl+Enter to send message
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
