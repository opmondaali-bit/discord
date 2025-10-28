
import React from 'react';
import type { ToolCategory, AspectRatio } from './types';

export const ASPECT_RATIOS: AspectRatio[] = ["1:1", "3:4", "4:3", "9:16", "16:9"];

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    name: "Basic Tools",
    tools: [
      { id: "remove-bg", name: "Remove Background", prompt: "Remove the background from this image with smooth edge blending.", icon: <CropIcon /> },
      { id: "cut-out", name: "Cut Out Subject", prompt: "Cut out the main subject and place it on a transparent background.", icon: <ScissorsIcon /> },
      { id: "crop-person", name: "Crop Person", prompt: "Automatically detect and crop the person from the photo.", icon: <UserFocusIcon /> },
      { id: "cleanup", name: "Clean Up", prompt: "Clean up the background by removing unwanted objects or people.", icon: <SparklesIcon /> },
      { id: "blur-bg", name: "Blur Background", prompt: "Blur the background but keep the main subject sharp.", icon: <DropletIcon /> },
    ],
  },
  {
    name: "Color & Filters",
    tools: [
      { id: "cinematic", name: "Cinematic Grade", prompt: "Apply cinematic color grading with teal and orange tones.", icon: <FilmIcon /> },
      { id: "enhance", name: "Enhance", prompt: "Enhance brightness, contrast, and sharpness for a professional look.", icon: <WandIcon /> },
      { id: "watercolor", name: "Watercolor", prompt: "Make the image look like a watercolor painting.", icon: <PaintbrushIcon /> },
      { id: "bw", name: "Black & White", prompt: "Apply a black-and-white filter with soft contrast.", icon: <ContrastIcon /> },
      { id: "skin-tone", name: "Portrait Enhance", prompt: "Adjust skin tones and lighting for natural portrait enhancement.", icon: <SmileIcon /> },
    ],
  },
  {
    name: "Editing & Retouch",
    tools: [
      { id: "remove-blemishes", name: "Remove Blemishes", prompt: "Remove blemishes or small spots from faces or surfaces.", icon: <CircleDotIcon /> },
      { id: "heal", name: "Heal Damage", prompt: "Clone and heal damaged parts of the image seamlessly.", icon: <HeartPulseIcon /> },
      { id: "fill", name: "Content-Aware Fill", prompt: "Fill empty areas using AI-powered content-aware fill. This requires a selection mask.", icon: <AppWindowIcon /> },
      { id: "upscale", name: "Upscale 4x", prompt: "Upscale this image to 4x resolution while keeping clarity.", icon: <ExpandIcon /> },
      { id: "denoise", name: "Denoise", prompt: "Convert this low-light photo into a well-lit, noise-free image.", icon: <MoonIcon /> },
    ],
  },
];


function CropIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2v14a2 2 0 0 0 2 2h14" /><path d="M18 22V8a2 2 0 0 0-2-2H2" /></svg>
}
function ScissorsIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" x2="8.12" y1="4" y2="15.88" /><line x1="14.47" x2="20" y1="14.48" y2="20" /><line x1="8.12" x2="12" y1="8.12" y2="12" /></svg>
}
function UserFocusIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M7 12H5" /><path d="M17 12h-2" /><path d="M12 7V5" /><path d="M12 17v-2" /><path d="M9 22a3 3 0 0 1-3-3v-1" /><path d="M21 18v-1a3 3 0 0 0-3-3h-2" /><path d="M3 9V8a3 3 0 0 1 3-3h1" /><path d="M16 5h1a3 3 0 0 1 3 3v1" /></svg>
}
function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" /></svg>
}
function DropletIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" /></svg>
}
function FilmIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M7 3v18" /><path d="M17 3v18" /><path d="M3 7.5h4" /><path d="M3 12h18" /><path d="M3 16.5h4" /><path d="M17 7.5h4" /><path d="M17 16.5h4" /></svg>
}
function WandIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 4V2" /><path d="M15 16v-2" /><path d="M8 9h2" /><path d="M20 9h2" /><path d="M17.8 11.8 19 13" /><path d="M15 9h.01" /><path d="M17.8 6.2 19 5" /><path d="m3 21 9-9" /><path d="M12.2 6.2 11 5" /></svg>
}
function PaintbrushIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
}
function ContrastIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 18a6 6 0 0 0 0-12v12z" /></svg>
}
function SmileIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" x2="9.01" y1="9" y2="9" /><line x1="15" x2="15.01" y1="9" y2="9" /></svg>
}
function CircleDotIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="1" /></svg>
}
function HeartPulseIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /><path d="M3.22 12H9.5l.7-1 2.1 4.4 1.2-2.4H22" /></svg>
}
function AppWindowIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M10 4v4"/><path d="M2 8h20"/><path d="M6 4v4"/></svg>
}
function ExpandIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 21-6-6m6 6v-4m0 4h-4"/><path d="M3 3l6 6"/><path d="M3 3v4m0-4h4"/></svg>
}
function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
}
