
import React, { useState, useCallback, useRef, useEffect } from 'react';
import EditorView from './components/EditorView';
import GenerateView from './components/GenerateView';
import ChatView from './components/ChatView';
import * as geminiService from './services/geminiService';
import type { AspectRatio, ChatMessage } from './types';
import type { Chat } from '@google/genai';

type ActiveTab = 'editor' | 'generate' | 'chat';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('editor');

  // General State
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Editor State
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState('');
  const [analysisPrompt, setAnalysisPrompt] = useState('');

  // Generation State
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // Chat State
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isChatting, setIsChatting] = useState(false);
  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    chatRef.current = geminiService.createChat();
  }, []);

  const withLoading = async <T,>(
    message: string,
    asyncFn: () => Promise<T>
  ): Promise<T | undefined> => {
    setIsLoading(true);
    setLoadingMessage(message);
    setError(null);
    try {
      const result = await asyncFn();
      return result;
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'An unexpected error occurred.');
      return undefined;
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  // Editor Handlers
  const handleImageUpload = useCallback(async (file: File) => {
    const base64 = await withLoading('Reading image...', () => fileToBase64(file));
    if (base64) {
      setOriginalImage(base64);
      setCurrentImage(base64);
      setAnalysisResult('');
      setAnalysisPrompt('');
    }
  }, []);

  const handleEdit = useCallback(async (prompt: string, name: string) => {
    if (!currentImage) return;
    const newImage = await withLoading(`Applying: ${name}...`, () =>
      geminiService.editImage(currentImage, prompt)
    );
    if (newImage) {
      setCurrentImage(newImage);
    }
  }, [currentImage]);

  const handleReset = useCallback(() => {
    setCurrentImage(originalImage);
  }, [originalImage]);

  const handleDownload = useCallback(() => {
    if (!currentImage) return;
    const link = document.createElement('a');
    link.href = currentImage;
    link.download = `edited-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [currentImage]);
  
  const handleQuickAnalysis = useCallback(async () => {
    if (!currentImage) return;
    const result = await withLoading('Analyzing image...', () => geminiService.getQuickAnalysis(currentImage));
    if (result) setAnalysisResult(result);
  }, [currentImage]);

  const handlePromptAnalysis = useCallback(async () => {
    if (!currentImage || !analysisPrompt) return;
    const result = await withLoading('Analyzing with prompt...', () => geminiService.analyzeImageWithPrompt(currentImage, analysisPrompt));
    if (result) {
      setAnalysisResult(result);
      setAnalysisPrompt('');
    }
  }, [currentImage, analysisPrompt]);


  // Generation Handler
  const handleGenerate = useCallback(async (prompt: string, aspectRatio: AspectRatio) => {
    const result = await withLoading('Generating image...', () =>
      geminiService.generateImage(prompt, aspectRatio)
    );
    if (result) {
      setGeneratedImage(result);
    }
  }, []);

  // Chat Handler
  const handleSendMessage = useCallback(async (message: string) => {
    if (!chatRef.current) return;
    
    setChatHistory(prev => [...prev, { role: 'user', text: message }]);
    setIsChatting(true);
    setError(null);
    
    try {
        const result = await chatRef.current.sendMessage({ message });
        setChatHistory(prev => [...prev, { role: 'model', text: result.text }]);
    } catch (e: any) {
        console.error(e);
        setError(e.message || 'Error in chat.');
        setChatHistory(prev => [...prev, { role: 'model', text: `Sorry, an error occurred: ${e.message}` }]);
    } finally {
        setIsChatting(false);
    }
  }, []);
  
  const TabButton = ({
    tabId,
    label,
    icon
  }: {
    tabId: ActiveTab;
    label: string;
    // FIX: Replaced JSX.Element with React.ReactElement to resolve issue with JSX namespace not being found.
    icon: React.ReactElement;
  }) => (
    <button
      onClick={() => setActiveTab(tabId)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
        activeTab === tabId
          ? 'bg-sky-500 text-white neon-glow-primary'
          : 'text-white/70 hover:bg-white/10 hover:text-white'
      }`}
    >
        {icon}
        <span>{label}</span>
    </button>
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
            <Spinner />
            <p className="mt-4 text-lg font-medium">{loadingMessage}</p>
        </div>
      )}

      {/* Error Popup */}
      {error && (
         <div className="fixed top-5 right-5 bg-red-500/80 backdrop-blur-md text-white px-6 py-3 rounded-lg z-50 shadow-lg">
             <p className="font-bold">Error</p>
             <p className="text-sm">{error}</p>
             <button onClick={() => setError(null)} className="absolute top-1 right-2 text-xl">&times;</button>
         </div>
      )}

      <div className="flex flex-col h-screen">
        <header className="flex-shrink-0">
          <div className="p-4 flex justify-between items-center">
             <h1 className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-sky-400 to-fuchsia-500 text-transparent bg-clip-text">
                Gemini AI Image Editor
            </h1>
            <nav className="p-1 rounded-lg bg-black/20 border border-white/20">
                <div className="flex space-x-1">
                    <TabButton tabId="editor" label="Editor" icon={<EditIcon />} />
                    <TabButton tabId="generate" label="Generate" icon={<SparklesIcon />} />
                    <TabButton tabId="chat" label="Chat" icon={<MessageSquareIcon />} />
                </div>
            </nav>
          </div>
        </header>
        <main className="flex-grow overflow-hidden">
            {activeTab === 'editor' && <EditorView 
                originalImage={originalImage}
                currentImage={currentImage}
                handleImageUpload={handleImageUpload}
                handleEdit={handleEdit}
                handleReset={handleReset}
                handleDownload={handleDownload}
                handleQuickAnalysis={handleQuickAnalysis}
                handlePromptAnalysis={handlePromptAnalysis}
                isEditing={isLoading}
                analysisResult={analysisResult}
                analysisPrompt={analysisPrompt}
                onAnalysisPromptChange={setAnalysisPrompt}
            />}
            {activeTab === 'generate' && <GenerateView 
                handleGenerate={handleGenerate}
                generatedImage={generatedImage}
                isGenerating={isLoading}
            />}
            {activeTab === 'chat' && <ChatView 
                chatHistory={chatHistory}
                handleSendMessage={handleSendMessage}
                isChatting={isChatting}
            />}
        </main>
      </div>
    </div>
  );
}

function Spinner() {
    return <div className="w-12 h-12 border-4 border-t-sky-400 border-gray-600 rounded-full animate-spin"></div>;
}

function EditIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
}

function MessageSquareIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
}

export default App;
