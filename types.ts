import type { ReactElement } from 'react';

export type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9";

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Tool {
  id: string;
  name: string;
  prompt: string;
  // FIX: Replaced JSX.Element with ReactElement to resolve issue with JSX namespace not being found in a .ts file.
  icon: ReactElement;
}

export interface ToolCategory {
  name: string;
  tools: Tool[];
}
