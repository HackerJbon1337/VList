"use client";

import { useState } from "react";
import { useAuthStore } from "@/store";

interface Message {
    id: string;
    senderId: string;
    senderName: string;
    productTitle: string;
    lastMessage: string;
    timestamp: string;
    unread: boolean;
}

// Mock messages for demo
const mockMessages: Message[] = [
    {
        id: "1",
        senderId: "seller1",
        senderName: "Alex Chen",
        productTitle: "Calculus Textbook",
        lastMessage: "Sure, I can meet tomorrow at the library!",
        timestamp: "2 hours ago",
        unread: true,
    },
    {
        id: "2",
        senderId: "seller2",
        senderName: "Sarah Jones",
        productTitle: "Mini Fridge",
        lastMessage: "The fridge is still available. When can you pick it up?",
        timestamp: "1 day ago",
        unread: false,
    },
    {
        id: "3",
        senderId: "seller3",
        senderName: "Emily Watson",
        productTitle: "Chemistry Tutoring",
        lastMessage: "Great! Looking forward to our session.",
        timestamp: "3 days ago",
        unread: false,
    },
];

export default function MessagesPage() {
    const { user } = useAuthStore();
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        // In production: send message via API
        alert(`Message sent: ${newMessage}`);
        setNewMessage("");
    };

    return (
        <div className="container mx-auto max-w-6xl px-4 py-8">
            <h1 className="mb-8 text-3xl font-bold">Messages</h1>

            <div className="grid h-[600px] gap-4 lg:grid-cols-3">
                {/* Conversation List */}
                <div className="rounded-lg border border-border/40 bg-card overflow-hidden">
                    <div className="border-b border-border/40 p-4">
                        <h2 className="font-semibold">Conversations</h2>
                    </div>
                    <div className="overflow-y-auto">
                        {mockMessages.map((msg) => (
                            <button
                                key={msg.id}
                                onClick={() => setSelectedMessage(msg)}
                                className={`w-full p-4 text-left border-b border-border/40 transition-colors hover:bg-muted/50 ${selectedMessage?.id === msg.id ? "bg-muted/50" : ""
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                                        {msg.senderName.charAt(0)}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium truncate">{msg.senderName}</span>
                                            {msg.unread && (
                                                <span className="h-2 w-2 rounded-full bg-primary" />
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground truncate">
                                            Re: {msg.productTitle}
                                        </p>
                                        <p className="text-sm text-muted-foreground truncate">
                                            {msg.lastMessage}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="lg:col-span-2 rounded-lg border border-border/40 bg-card flex flex-col">
                    {selectedMessage ? (
                        <>
                            {/* Chat Header */}
                            <div className="border-b border-border/40 p-4">
                                <h3 className="font-semibold">{selectedMessage.senderName}</h3>
                                <p className="text-sm text-muted-foreground">
                                    Re: {selectedMessage.productTitle}
                                </p>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                <div className="flex gap-3">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                        {selectedMessage.senderName.charAt(0)}
                                    </div>
                                    <div className="rounded-lg bg-muted p-3 max-w-[80%]">
                                        <p className="text-sm">{selectedMessage.lastMessage}</p>
                                        <span className="text-xs text-muted-foreground">
                                            {selectedMessage.timestamp}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-3 justify-end">
                                    <div className="rounded-lg bg-primary text-primary-foreground p-3 max-w-[80%]">
                                        <p className="text-sm">Thanks for getting back to me!</p>
                                        <span className="text-xs opacity-70">Just now</span>
                                    </div>
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                        {user?.name?.charAt(0) || "U"}
                                    </div>
                                </div>
                            </div>

                            {/* Input */}
                            <div className="border-t border-border/40 p-4">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                        placeholder="Type a message..."
                                        className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        className="h-10 px-4 rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-muted-foreground">
                            Select a conversation to start messaging
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
