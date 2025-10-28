
import React, { useRef } from 'react';
import GlassCard from './GlassCard';
import ToolButton from './ToolButton';
import { TOOL_CATEGORIES } from '../constants';

interface EditorViewProps {
  originalImage: string | null;
  currentImage: string | null;
  handleImageUpload: (file: File) => void;
  handleEdit: (prompt: string, name: string) => void;
  handleReset: () => void;
  handleDownload: () => void;
  handleQuickAnalysis: () => void;
  handlePromptAnalysis: () => void;
  isEditing: boolean;
  analysisResult: string;
  analysisPrompt: string;
  onAnalysisPromptChange: (prompt: string) => void;
}

const EditorView: React.FC<EditorViewProps> = ({
  originalImage,
  currentImage,
  handleImageUpload,
  handleEdit,
  handleReset,
  handleDownload,
  handleQuickAnalysis,
  handlePromptAnalysis,
  isEditing,
  analysisResult,
  analysisPrompt,
  onAnalysisPromptChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleImageUpload(event.target.files[0]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 h-full">
      {/* Sidebar */}
      <GlassCard className="lg:col-span-3 h-full flex flex-col">
        <div className="p-4 border-b border-white/20">
          <h2 className="text-xl font-bold text-white">Tools</h2>
        </div>
        <div className="flex-grow p-2 overflow-y-auto custom-scrollbar">
          {TOOL_CATEGORIES.map((category) => (
            <div key={category.name} className="mb-4">
              <h3 className="px-2 mb-2 text-xs font-semibold tracking-wider text-sky-300 uppercase">
                {category.name}
              </h3>
              <div className="space-y-1">
                {category.tools.map((tool) => (
                  <ToolButton
                    key={tool.id}
                    tool={tool}
                    onClick={handleEdit}
                    disabled={!currentImage || isEditing}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Main Content */}
      <div className="lg:col-span-9 h-full flex flex-col gap-6">
        <GlassCard className="flex-grow flex flex-col items-center justify-center p-4">
          {currentImage ? (
            <img src={currentImage} alt="Uploaded content" className="max-h-full max-w-full object-contain rounded-lg" />
          ) : (
            <div className="text-center">
                <ImageIcon className="w-24 h-24 mx-auto text-white/30" />
                <h3 className="mt-4 text-lg font-medium text-white">Upload an Image</h3>
                <p className="mt-1 text-sm text-white/50">Start by uploading a JPG, PNG, or WEBP file.</p>
                <button onClick={() => fileInputRef.current?.click()} className="mt-6 px-6 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-400 transition-colors duration-200 neon-glow-primary">
                    Browse Files
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={onFileChange}
                    className="hidden"
                    accept="image/png, image/jpeg, image/webp"
                />
            </div>
          )}
        </GlassCard>
        
        {originalImage && (
             <GlassCard className="flex flex-col">
                <div className="p-4 border-b border-white/20">
                    <h2 className="text-xl font-bold text-white">Actions & Analysis</h2>
                </div>
                 <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Actions */}
                    <div className="flex flex-col space-y-3">
                        <div className="flex items-center space-x-3">
                             <button onClick={handleDownload} disabled={isEditing} className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">Download</button>
                             <button onClick={handleReset} disabled={isEditing || currentImage === originalImage} className="w-full px-4 py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">Reset</button>
                        </div>
                        <button onClick={handleQuickAnalysis} disabled={isEditing} className="w-full px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">Quick Description (Flash-Lite)</button>
                         <div className="flex space-x-2">
                             <input type="text" value={analysisPrompt} onChange={(e) => onAnalysisPromptChange(e.target.value)} placeholder="Ask about the image..." className="flex-grow bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400" />
                             <button onClick={handlePromptAnalysis} disabled={isEditing || !analysisPrompt} className="px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">Analyze</button>
                         </div>
                    </div>
                     {/* Analysis Result */}
                     <div className="bg-black/20 rounded-lg p-3 h-36 overflow-y-auto custom-scrollbar">
                         <p className="text-sm text-white/80 whitespace-pre-wrap">{analysisResult || "AI analysis will appear here..."}</p>
                     </div>
                 </div>
             </GlassCard>
        )}
      </div>
    </div>
  );
};


function ImageIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
}

export default EditorView;
