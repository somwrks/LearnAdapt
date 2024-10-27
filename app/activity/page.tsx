'use client'

import React, { useState, useEffect } from 'react';

// Define the type for chat messages
interface ChatMessage {
  sender: 'User' | 'AI';
  text?: string;
  videoUrl?: string;
}

// Define the type for API response
interface ApiResponse {
  emotion?: string;
  reply?: string;
  videoUrl?: string;
}

export default function Main() {
  const [message, setMessage] = useState<string>('');
  // Specify the type for chatLog
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [emotion, setEmotion] = useState<string | null>(null);

  useEffect(() => {
    const captureEmotion = async () => {
      try {
        const video = document.createElement('video');
        video.width = 320;
        video.height = 240;
        document.body.appendChild(video);

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.play();

        setInterval(async () => {
          const response = await fetch('/api/python/detect_emotion', { method: 'POST' });
          const data: ApiResponse = await response.json();
          setEmotion(data.emotion || null);
        }, 3000);
      } catch (error) {
        console.error('Error capturing emotion:', error);
      }
    };

    captureEmotion();

    // Cleanup function
    return () => {
      const video = document.querySelector('video');
      if (video) {
        const stream = video.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        video.remove();
      }
    };
  }, []);

  const sendMessage = async () => {
    if (!message) return;

    // Add user message to chat log
    const userMessage: ChatMessage = { sender: 'User', text: message };
    setChatLog(prevLog => [...prevLog, userMessage]);

    try {
      const response = await fetch('/api/python/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, emotion })
      });

      const data: ApiResponse = await response.json();

      // Create AI message based on response
      const aiMessage: ChatMessage = {
        sender: 'AI',
        ...(data.videoUrl ? { videoUrl: data.videoUrl } : { text: data.reply })
      };

      setChatLog(prevLog => [...prevLog, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setMessage('');
  };

  return (
    <div className="chat-container">
      <div className="chat-log">
        {chatLog.map((entry, index) => (
          <div key={index} className={entry.sender === 'User' ? 'user-message' : 'ai-message'}>
            {entry.text ? (
              entry.text
            ) : entry.videoUrl ? (
              <video controls src={entry.videoUrl} width={320} height={240} />
            ) : null}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}