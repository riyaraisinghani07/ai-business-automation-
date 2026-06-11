import ChatInterface from '../components/ChatInterface';

export default function ChatPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">AI Chat Assistant</h1>
        <p className="text-slate-500 text-sm mt-1">Interact with AI agents using natural language</p>
      </div>

      <div className="card overflow-hidden" style={{ height: 'calc(100vh - 180px)' }}>
        <ChatInterface
          agentType="general"
          placeholder="Ask me anything about your business data..."
          suggestedPrompts={[
            'Show high-priority sales leads',
            'Find risky projects',
            'Draft invoice reminder email',
            'Screen uploaded resumes',
          ]}
        />
      </div>
    </div>
  );
}
