import React, { useState, useEffect, useRef } from 'react';
import { FaWhatsapp, FaPaperPlane, FaTimes, FaUserCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { id: 1, text: "Habari! How can we help you today?", sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, isTyping]);

    // Listen for custom "prefill-chat" events
    useEffect(() => {
        const handlePrefill = (e) => {
            const { businessName } = e.detail;
            setIsOpen(true);
            setMessage(`Hi, I'm interested in ${businessName}. Can you tell me more?`);
        };
        window.addEventListener('prefill-chat', handlePrefill);
        return () => window.removeEventListener('prefill-chat', handlePrefill);
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const userMsg = {
            id: Date.now(),
            text: message,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChatHistory(prev => [...prev, userMsg]);
        const sentMessage = message;
        setMessage('');
        setIsTyping(true);

        try {
            // Forward message to our backend which talks to Twilio
            const response = await fetch('http://localhost:5000/api/chat/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: sentMessage })
            });

            if (response.ok) {
                // In a real app, the bot reply would come via Webhook/Polling
                // For MVP Hackathon demo, we simulate a reply after the API call succeeds
                setTimeout(() => {
                    const botReply = {
                        id: Date.now() + 1,
                        text: "Thanks for your inquiry! Our team will get back to you on WhatsApp shortly. 🇰🇪",
                        sender: 'bot',
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    };
                    setChatHistory(prev => [...prev, botReply]);
                    setIsTyping(false);
                }, 1500);
            }
        } catch (err) {
            console.error("Chat Error:", err);
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-[340px] md:w-[380px] bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-emerald-600 p-6 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center relative">
                                    <FaWhatsapp size={24} />
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-600 rounded-full"></div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Nairobiz Support</h3>
                                    <p className="text-xs text-emerald-100 font-medium tracking-wide">Always Active</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                                <FaTimes />
                            </button>
                        </div>

                        {/* Chat Box */}
                        <div className="h-[400px] overflow-y-auto p-6 bg-slate-50 space-y-4">
                            {chatHistory.map(msg => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-sm ${msg.sender === 'user'
                                            ? 'bg-emerald-600 text-white rounded-tr-none'
                                            : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                                        }`}>
                                        <p className="font-medium leading-relaxed">{msg.text}</p>
                                        <p className={`text-[10px] mt-2 font-bold opacity-60 ${msg.sender === 'user' ? 'text-white' : 'text-slate-400'}`}>
                                            {msg.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 italic text-slate-400 text-xs font-bold tracking-widest animate-pulse">
                                        Bot is typing...
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={sendMessage} className="p-4 bg-white border-t border-slate-100 flex items-center gap-3">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="flex-grow bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                            <button
                                type="submit"
                                disabled={!message.trim()}
                                className="w-11 h-11 bg-emerald-600 text-white rounded-xl flex items-center justify-center hover:bg-emerald-700 transition-all active:scale-95 disabled:opacity-50"
                            >
                                <FaPaperPlane size={16} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all ${isOpen ? 'bg-slate-900 text-white rotate-90' : 'bg-emerald-500 text-white'
                    }`}
            >
                {isOpen ? <FaTimes size={24} /> : <FaWhatsapp size={32} />}
                {!isOpen && (
                    <div className="absolute top-0 right-0 w-4 h-4 bg-rose-500 border-2 border-white rounded-full animate-bounce"></div>
                )}
            </motion.button>
        </div>
    );
};

export default WhatsAppChat;
