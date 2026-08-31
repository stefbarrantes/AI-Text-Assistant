"use client";

import { useSupportChat } from "@/hooks/useSupportChat";

import SupportMessage from "./SupportMessage";
import TextInput from "@/components/ui/TextInput";
import SubmitButton from "@/components/ui/SubmitButton";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function SupportChat() {
  const { messages, input, loading, error, setInput, sendMessage } =
    useSupportChat();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendMessage();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <section className="flex h-700 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          💬
        </div>

        <div>
          <h1 className="text-sm font-semibold text-slate-900">
            Customer Support
          </h1>

          <p className="mt-0.5 text-xs text-slate-500">Ask us anything</p>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-xs text-slate-500">Online</span>
        </div>
      </header>

      {/* Messages */}
      <div className="space-y-4 overflow-y-auto bg-slate-50/70 p-4 sm:p-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center">
            <div className="max-w-sm text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                ✦
              </div>

              <h2 className="font-medium text-slate-900">How can we help?</h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Ask a question about our products, services, orders, or anything
                else you need help with.
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <SupportMessage key={message.id} message={message} />
          ))
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-slate-200 bg-white p-4"
      >
        <TextInput
          id="support-chat-input"
          value={input}
          onChange={(value) => setInput(value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question..."
          rows={3}
          disabled={loading}
        />

        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Enter to send · Shift + Enter for a new line
          </p>

          <SubmitButton
            label="Send"
            loadingLabel="Sending"
            loading={loading}
            disabled={!input.trim()}
          />
        </div>
      </form>

      {error && <ErrorMessage message={error} />}
    </section>
  );
}
