import { agentResponses } from './mockData';
import type { ChatMessage } from '../types';

function findBestMatch(input: string, responses: Record<string, string>): string {
  const lower = input.toLowerCase();
  let bestKey = 'default';
  let bestScore = 0;

  for (const key of Object.keys(responses)) {
    if (key === 'default') continue;
    const keywords = key.toLowerCase().split(/\s+/);
    const matched = keywords.filter(kw => lower.includes(kw)).length;
    const score = matched / keywords.length;
    if (score > bestScore) {
      bestScore = score;
      bestKey = key;
    }
  }

  return bestScore >= 0.5 ? responses[bestKey] : responses['default'];
}

export function getAIResponse(message: string, agentType: string = 'general'): string {
  const responses = agentResponses[agentType] || agentResponses.general;
  return findBestMatch(message, responses);
}

export function createChatMessage(role: ChatMessage['role'], content: string): ChatMessage {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    timestamp: new Date(),
  };
}
