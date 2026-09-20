"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useMemo, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

type ChatPanelProps = {
  isExpanded: boolean;
};

export default function ChatPanel({ isExpanded }: ChatPanelProps) {
  const [input, setInput] = useState("");
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    [],
  );

  const {
    messages,
    sendMessage,
    setMessages,
    status,
    error,
  } = useChat({ transport });

  const isLoading = status === "submitted" || status === "streaming";

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setInput(event.target.value);

  const handleSubmit = (
    event?: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    event?.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    void sendMessage({ text });
    setInput("");
  };

  const handleClearChat = () => setInput("");

  if (!isExpanded) {
    return null;
  }

  return (
    <>
      <ChatMessages
        messages={messages}
        error={error}
        isLoading={isLoading}
        onPromptClick={setInput}
      />
      <ChatInput
        input={input}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        setMessages={setMessages}
        onClearChat={handleClearChat}
        isLoading={isLoading}
        messages={messages}
      />
    </>
  );
}
