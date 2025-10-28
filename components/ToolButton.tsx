
import React from 'react';
import type { Tool } from '../types';

interface ToolButtonProps {
  tool: Tool;
  onClick: (prompt: string, name: string) => void;
  disabled?: boolean;
}

const ToolButton: React.FC<ToolButtonProps> = ({ tool, onClick, disabled }) => {
  const { name, icon, prompt } = tool;

  return (
    <button
      onClick={() => onClick(prompt, name)}
      disabled={disabled}
      className="flex items-center w-full p-3 text-sm text-left text-white/80 rounded-lg transition-all duration-200 ease-in-out hover:bg-white/10 focus:outline-none focus:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="w-6 h-6 mr-3 text-sky-300">{icon}</div>
      <span>{name}</span>
    </button>
  );
};

export default ToolButton;
