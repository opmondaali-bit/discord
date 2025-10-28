
import React, { useState } from 'react';
import GlassCard from './GlassCard';
import { ASPECT_RATIOS } from '../constants';
import type { AspectRatio } from '../types';

interface GenerateViewProps {
  handleGenerate: (prompt: string, aspectRatio: AspectRatio) => void;
  generatedImage: string | null;
  isGenerating: boolean;
}

const GenerateView: React.FC<GenerateViewProps> = ({
  handleGenerate,
  generatedImage,
  isGenerating,
}) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');

  const onGenerateClick = () => {
    if (prompt) {
      handleGenerate(prompt, aspectRatio);
    }
  };

  return (
    <div className="p-6 h-full flex flex-col gap-6">
      <GlassCard className="p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Image Generation</h2>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A neon hologram of a cat driving at top speed"
          className="w-full h-24 bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400 custom-scrollbar"
        />
        <div className="mt-4">
          <label className="block text-sm font-medium text-white/80 mb-2">Aspect Ratio</label>
          <div className="flex flex-wrap gap-2">
            {ASPECT_RATIOS.map((ratio) => (
              <button
                key={ratio}
                onClick={() => setAspectRatio(ratio)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${
                  aspectRatio === ratio
                    ? 'bg-sky-500 text-white neon-glow-primary'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={onGenerateClick}
          disabled={!prompt || isGenerating}
          className="mt-6 w-full px-6 py-3 bg-fuchsia-600 text-white font-semibold rounded-lg hover:bg-fuchsia-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed neon-glow-secondary"
        >
          Generate Image
        </button>
      </GlassCard>
      
      <GlassCard className="flex-grow flex items-center justify-center p-4">
        {generatedImage ? (
            <img src={generatedImage} alt="Generated content" className="max-h-full max-w-full object-contain rounded-lg" />
        ) : (
             <div className="text-center">
                <ImageIcon className="w-24 h-24 mx-auto text-white/30" />
                <h3 className="mt-4 text-lg font-medium text-white">Your generated image will appear here</h3>
                <p className="mt-1 text-sm text-white/50">Enter a prompt and click "Generate Image" to start.</p>
             </div>
        )}
      </GlassCard>
    </div>
  );
};

function ImageIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
}

export default GenerateView;
