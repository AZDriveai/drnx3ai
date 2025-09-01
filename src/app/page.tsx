import ChatInterface from '@/components/chat/ChatInterface';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">نظام DRX المتقدم</h1>
        <ChatInterface id="static-chat-id" />
      </div>
    </main>
  );
}
