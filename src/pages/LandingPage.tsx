import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Layers, 
  Sparkles, 
  Zap, 
  CreditCard, 
  Clock, 
  ShieldCheck, 
  CheckCircle2,
  Printer
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onOpenTechStack: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onOpenTechStack }) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-[#FAF7F2] overflow-hidden flex flex-col justify-between select-none">
      
      {/* Soft Watercolor Washes & Splashes Background matching the uploaded image */}
      {/* Top Left Sky Blue Wash */}
      <div className="absolute -top-16 -left-16 w-96 h-96 rounded-full bg-sky-200/35 blur-3xl pointer-events-none" />
      {/* Top Right Peach Wash */}
      <div className="absolute -top-12 -right-12 w-96 h-96 rounded-full bg-orange-200/35 blur-3xl pointer-events-none" />
      {/* Center Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />
      {/* Bottom Left Blue & Peach Wash */}
      <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-cyan-100/40 blur-3xl pointer-events-none" />
      {/* Bottom Right Warm Peach Wash */}
      <div className="absolute -bottom-16 -right-16 w-96 h-96 rounded-full bg-orange-200/40 blur-3xl pointer-events-none" />

      {/* Decorative Ink Splatters & Doodle Accents */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-slate-300/40 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-orange-300/40 pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 rounded-full bg-sky-300/40 pointer-events-none" />

      {/* ============================================================ */}
      {/* SURROUNDING STATIONERY & XEROX SKETCHES MATCHING IMAGE */}
      {/* ============================================================ */}

      {/* TOP LEFT: Wire Spiral Notebook, Bulldog Clip & Desktop Printer Sketch */}
      <div className="absolute top-4 left-4 lg:top-8 lg:left-8 pointer-events-none opacity-85 hidden sm:block">
        <div className="relative w-44 h-44">
          {/* Notebook spiral rings */}
          <div className="absolute top-0 left-0 flex flex-col gap-1.5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-5 h-2 rounded-full border-2 border-slate-700 bg-slate-100 transform -rotate-12 shadow-2xs" />
            ))}
          </div>

          {/* Bulldog binder clip sketch */}
          <div className="absolute top-2 left-14">
            <svg width="34" height="42" viewBox="0 0 34 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="16" width="22" height="24" rx="2" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
              <path d="M12 16 L12 6 C12 3, 22 3, 22 6 L22 16" stroke="#94A3B8" strokeWidth="2.5" fill="none" />
            </svg>
          </div>

          {/* Desktop Laser Printer Sketch */}
          <div className="absolute top-18 left-8">
            <svg width="86" height="60" viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 25 L80 25 L75 10 L25 10 Z" stroke="#334155" strokeWidth="1.8" fill="#FFFFFF" />
              <rect x="15" y="25" width="70" height="30" rx="3" stroke="#334155" strokeWidth="2" fill="#F8FAFC" />
              <rect x="25" y="38" width="50" height="6" rx="1" fill="#E2E8F0" stroke="#475569" strokeWidth="1.2" />
              <path d="M22 55 L78 55 L72 68 L28 68 Z" stroke="#334155" strokeWidth="1.6" fill="#FFFFFF" />
              <circle cx="76" cy="31" r="2" fill="#22C55E" />
              <circle cx="70" cy="31" r="1.5" fill="#3B82F6" />
            </svg>
          </div>

          {/* Navy Sketch Pencil */}
          <div className="absolute -top-1 left-24 w-28 h-2.5 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-800 rounded-full border border-slate-600 transform rotate-28 shadow-sm">
            <div className="absolute right-0 top-0 w-3 h-2.5 bg-amber-200 rounded-r-full" />
            <div className="absolute right-0 top-0.5 w-1 h-1.5 bg-slate-900 rounded-r-full" />
          </div>
        </div>
      </div>

      {/* TOP RIGHT: Paper Stack, Clip & Drafting Ruler Triangle */}
      <div className="absolute top-4 right-4 lg:top-8 lg:right-8 pointer-events-none opacity-85 hidden sm:block">
        <div className="relative w-48 h-44">
          {/* Stack of Papers */}
          <div className="absolute top-3 right-6 w-28 h-22 bg-white rounded border border-slate-300 transform rotate-12 shadow-xs" />
          <div className="absolute top-2 right-8 w-28 h-22 bg-white rounded border border-slate-300 transform rotate-6 shadow-sm p-2">
            <div className="w-10 h-1 bg-slate-300 rounded mb-1" />
            <div className="w-16 h-0.5 bg-slate-200 rounded" />
          </div>

          {/* Black Binder Clip */}
          <div className="absolute top-8 right-28">
            <svg width="30" height="36" viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="14" width="22" height="20" rx="2" fill="#0F172A" />
              <path d="M9 14 L9 5 C9 2, 21 2, 21 5 L21 14" stroke="#64748B" strokeWidth="2" fill="none" />
            </svg>
          </div>

          {/* Turquoise Drafting Triangle Tool (45° Ruler) */}
          <div className="absolute top-12 right-0">
            <svg width="80" height="70" viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 80 L90 80 L90 10 Z" fill="#2DD4BF" fillOpacity="0.45" stroke="#0D9488" strokeWidth="2" />
              <path d="M35 70 L75 70 L75 35 Z" fill="#FAF7F2" stroke="#0D9488" strokeWidth="1.5" />
              {/* Tick marks */}
              <line x1="15" y1="80" x2="15" y2="76" stroke="#0D9488" strokeWidth="1" />
              <line x1="25" y1="80" x2="25" y2="74" stroke="#0D9488" strokeWidth="1.5" />
              <line x1="35" y1="80" x2="35" y2="76" stroke="#0D9488" strokeWidth="1" />
              <line x1="45" y1="80" x2="45" y2="74" stroke="#0D9488" strokeWidth="1.5" />
              <line x1="55" y1="80" x2="55" y2="76" stroke="#0D9488" strokeWidth="1" />
              <line x1="65" y1="80" x2="65" y2="74" stroke="#0D9488" strokeWidth="1.5" />
              <line x1="75" y1="80" x2="75" y2="76" stroke="#0D9488" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>

      {/* BOTTOM LEFT: Spiral Grid Notebook, Colored Pencils, Eraser & Clipboard */}
      <div className="absolute bottom-2 left-2 lg:bottom-6 lg:left-6 pointer-events-none opacity-90 hidden sm:block">
        <div className="relative w-56 h-56">
          {/* Open Grid Notebook */}
          <div className="absolute bottom-0 left-0 w-44 h-44 bg-white rounded-xl border-2 border-slate-300 shadow-md p-3 transform -rotate-6">
            <div className="w-full h-full border border-slate-200 grid grid-cols-6 grid-rows-6 opacity-30">
              {[...Array(36)].map((_, i) => (
                <div key={i} className="border-r border-b border-blue-400" />
              ))}
            </div>
            {/* Spiral binding on top edge */}
            <div className="absolute -top-3 left-4 right-4 flex justify-between">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-2.5 h-4 rounded-full border-2 border-slate-700 bg-slate-200" />
              ))}
            </div>
          </div>

          {/* Mini Clipboard with Checklist */}
          <div className="absolute bottom-2 left-32 w-20 h-24 bg-amber-50/90 rounded border border-amber-300 shadow-xs transform rotate-12 p-2">
            <div className="w-6 h-2 bg-slate-700 rounded-t mx-auto mb-1.5" />
            <div className="space-y-1.5">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-xs border border-slate-400" /><div className="w-8 h-1 bg-slate-300 rounded" /></div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-xs border border-slate-400" /><div className="w-10 h-1 bg-slate-300 rounded" /></div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-xs border border-slate-400" /><div className="w-6 h-1 bg-slate-300 rounded" /></div>
            </div>
          </div>

          {/* 3 Real Colored Pencils (1 Orange, 2 Blue) matching Image exactly */}
          <div className="absolute bottom-12 left-6 w-36 h-2.5 bg-orange-500 rounded-full transform -rotate-45 shadow-sm border border-orange-600">
            <div className="absolute left-0 top-0 w-3.5 h-2.5 bg-amber-100 rounded-l-full" />
            <div className="absolute left-0 top-0.5 w-1.5 h-1.5 bg-orange-600 rounded-l-full" />
          </div>
          <div className="absolute bottom-8 left-10 w-36 h-2.5 bg-blue-700 rounded-full transform -rotate-45 shadow-sm border border-blue-800">
            <div className="absolute left-0 top-0 w-3.5 h-2.5 bg-amber-100 rounded-l-full" />
            <div className="absolute left-0 top-0.5 w-1.5 h-1.5 bg-blue-900 rounded-l-full" />
          </div>
          <div className="absolute bottom-4 left-14 w-36 h-2.5 bg-slate-900 rounded-full transform -rotate-45 shadow-sm border border-slate-700">
            <div className="absolute left-0 top-0 w-3.5 h-2.5 bg-amber-100 rounded-l-full" />
            <div className="absolute left-0 top-0.5 w-1.5 h-1.5 bg-slate-950 rounded-l-full" />
          </div>

          {/* Eraser */}
          <div className="absolute bottom-2 left-26 w-7 h-4 bg-slate-800 rounded-xs border border-slate-600 transform rotate-12 shadow-2xs" />
        </div>
      </div>

      {/* BOTTOM RIGHT: Commercial Multi-Tray Xerox Copier Technical Sketch */}
      <div className="absolute bottom-2 right-2 lg:bottom-6 lg:right-6 pointer-events-none opacity-90 hidden sm:block">
        <div className="relative w-64 h-64 flex flex-col items-center justify-end">
          {/* Detailed Commercial Xerox Machine SVG */}
          <svg width="190" height="210" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Base Cabinet & Casters */}
            <rect x="50" y="200" width="100" height="8" rx="2" fill="#E2E8F0" stroke="#334155" strokeWidth="1.8" />
            <circle cx="65" cy="212" r="4" fill="#334155" />
            <circle cx="135" cy="212" r="4" fill="#334155" />

            {/* Paper Drawer 1 & 2 */}
            <rect x="52" y="145" width="96" height="26" rx="2" fill="#FFFFFF" stroke="#334155" strokeWidth="2" />
            <rect x="85" y="155" width="30" height="5" rx="1" fill="#E2E8F0" stroke="#475569" strokeWidth="1" />
            
            <rect x="52" y="173" width="96" height="26" rx="2" fill="#FFFFFF" stroke="#334155" strokeWidth="2" />
            <rect x="85" y="183" width="30" height="5" rx="1" fill="#E2E8F0" stroke="#475569" strokeWidth="1" />

            {/* Main Engine Body & Output Tray */}
            <rect x="50" y="75" width="100" height="68" rx="3" fill="#F8FAFC" stroke="#334155" strokeWidth="2" />
            
            {/* Side Output Bin / Finisher Tray */}
            <path d="M50 95 L22 105 L24 135 L50 125 Z" fill="#E2E8F0" stroke="#334155" strokeWidth="1.8" />
            
            {/* Platen Glass & Scanner section */}
            <rect x="45" y="45" width="110" height="28" rx="3" fill="#FFFFFF" stroke="#334155" strokeWidth="2" />
            
            {/* Automatic Document Feeder (ADF) Top Lid */}
            <path d="M55 45 L50 22 L145 22 L150 45 Z" fill="#F1F5F9" stroke="#334155" strokeWidth="2" />
            <rect x="70" y="12" width="60" height="10" rx="2" fill="#FFFFFF" stroke="#334155" strokeWidth="1.6" />
            
            {/* Touch Screen Control Panel */}
            <rect x="140" y="52" width="28" height="20" rx="2" fill="#1E293B" stroke="#0F172A" strokeWidth="1.8" />
            <rect x="143" y="55" width="22" height="14" rx="1" fill="#38BDF8" opacity="0.8" />
            
            {/* Indicator lights & Keypad */}
            <circle cx="132" cy="56" r="2" fill="#22C55E" />
            <circle cx="132" cy="63" r="2" fill="#3B82F6" />
          </svg>

          {/* Pencil & loop doodles beside printer */}
          <div className="absolute bottom-16 right-42 w-14 h-2 bg-slate-300 rounded-full transform -rotate-30 border border-slate-500" />
        </div>
      </div>

      {/* ============================================================ */}
      {/* MAIN CENTER PIECE MATCHING THE USER'S EXACT UPLOADED IMAGE */}
      {/* ============================================================ */}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-8 flex-1 flex flex-col items-center justify-center text-center">
        
        {/* TOP: OFFICIAL RIT EMBLEM & INSTITUTION LOGO */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-6 sm:mb-8"
        >
          {/* Main Logo Row: Circle Tech Tree + rit + RAJALAKSHMI INSTITUTE OF TECHNOLOGY */}
          <div className="flex items-center gap-3 sm:gap-4 justify-center">
            
            {/* Circular Blue Tech Tree Badge */}
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#123e75] via-[#1a5694] to-[#2563eb] p-2 flex items-center justify-center shadow-md shadow-blue-900/15">
              <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none" stroke="currentColor">
                {/* Tech Tree Trunk and Circuit Branches */}
                <path d="M50 85 L50 45" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                <path d="M50 65 L32 50 L22 55" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M50 65 L68 50 L78 55" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M50 50 L35 32 L25 35" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M50 50 L65 32 L75 35" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M50 45 L50 20" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                {/* Circuit Nodes (Orange & White) */}
                <circle cx="50" cy="18" r="4.5" fill="#F97316" stroke="white" strokeWidth="1.5" />
                <circle cx="20" cy="55" r="4" fill="#F97316" stroke="white" strokeWidth="1.5" />
                <circle cx="80" cy="55" r="4" fill="#F97316" stroke="white" strokeWidth="1.5" />
                <circle cx="23" cy="35" r="4" fill="white" stroke="#1a5694" strokeWidth="1" />
                <circle cx="77" cy="35" r="4" fill="white" stroke="#1a5694" strokeWidth="1" />
                <circle cx="35" cy="28" r="3" fill="#F97316" />
                <circle cx="65" cy="28" r="3" fill="#F97316" />
              </svg>
            </div>

            {/* "rit" typography with orange dot */}
            <div className="flex items-baseline">
              <span className="text-4xl sm:text-6xl font-black text-[#0f172a] tracking-tighter lowercase leading-none font-sans">
                r
              </span>
              <span className="relative text-4xl sm:text-6xl font-black text-[#0f172a] tracking-tighter lowercase leading-none font-sans">
                <span className="absolute -top-1 sm:-top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#f26522]" />
                i
              </span>
              <span className="text-4xl sm:text-6xl font-black text-[#0f172a] tracking-tighter lowercase leading-none font-sans">
                t
              </span>
            </div>

            {/* Vertical dividing line */}
            <div className="w-px h-10 sm:h-14 bg-slate-400/80 mx-1 sm:mx-2" />

            {/* Institution 3-line Text */}
            <div className="text-left font-sans">
              <p className="text-sm sm:text-xl font-black tracking-wider text-[#0f172a] uppercase leading-none">
                RAJALAKSHMI
              </p>
              <p className="text-[10px] sm:text-xs font-bold tracking-widest text-[#1e293b] uppercase leading-tight mt-0.5">
                INSTITUTE OF
              </p>
              <p className="text-xs sm:text-base font-extrabold tracking-wider text-[#0f172a] uppercase leading-tight">
                TECHNOLOGY
              </p>
            </div>
          </div>

          {/* Sublines under logo */}
          <div className="mt-2 text-center">
            <p className="text-[11px] sm:text-xs font-black tracking-[0.25em] text-[#0f172a] uppercase">
              BELIEVE IN THE POSSIBILITIES
            </p>
            <p className="text-[10px] sm:text-[11px] font-black tracking-[0.25em] text-[#f26522] uppercase mt-0.5">
              AN AUTONOMOUS INSTITUTION
            </p>
          </div>
        </motion.div>

        {/* CENTERPIECE: "Welcome to" with accent wings */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center justify-center gap-3 sm:gap-4 mb-1"
        >
          {/* Left accent stroke */}
          <div className="w-6 sm:w-10 h-0.5 bg-[#f26522] rounded-full transform -rotate-12" />
          
          <h2 className="font-script text-3xl sm:text-5xl font-bold text-[#122b48] tracking-wide">
            Welcome to
          </h2>
          
          {/* Right accent stroke */}
          <div className="w-6 sm:w-10 h-0.5 bg-[#f26522] rounded-full transform rotate-12" />
        </motion.div>

        {/* GIANT "ARCADE" TITLE IN 3D COLLEGIATE BLOCK LETTERING */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="my-1 sm:my-2"
        >
          <h1 className="arcade-3d-title text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-wider select-none">
            ARCADE
          </h1>
        </motion.div>

        {/* DECORATIVE STAR & DOT DIVIDER RULE */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-slate-700 my-2 sm:my-3">
          <div className="w-12 sm:w-20 h-px bg-slate-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          <div className="w-2 h-2 rounded-full bg-slate-800" />
          <span className="text-sm sm:text-base text-slate-800 font-bold">&#9733;</span>
          <div className="w-2 h-2 rounded-full bg-slate-800" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          <div className="w-12 sm:w-20 h-px bg-slate-400" />
        </div>

        {/* PEACH-ORANGE CURVED RIBBON BANNER */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="relative my-3 sm:my-4 max-w-md sm:max-w-xl w-full"
        >
          {/* Ribbon SVG with folded ends */}
          <div className="relative py-2.5 px-6 sm:px-12 bg-[#FBD7C2] border-2 border-[#E2875C] rounded-lg shadow-sm">
            {/* Swallowtail cutouts visual simulation */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-full border-t-2 border-b-2 border-l-2 border-[#E2875C] bg-[#F4C4AA] rounded-l-md hidden sm:block" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-full border-t-2 border-b-2 border-r-2 border-[#E2875C] bg-[#F4C4AA] rounded-r-md hidden sm:block" />

            <p className="font-script text-2xl sm:text-3xl md:text-4xl font-bold text-[#142d4c] tracking-wide leading-tight">
              From blank page to final print
            </p>
          </div>
        </motion.div>

        {/* INTERACTIVE CALL-TO-ACTION BUTTONS */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md"
        >
          {/* Main Get Started / Sign In Button */}
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#122b48] via-[#1a4477] to-[#122b48] hover:from-[#0d1e33] hover:to-[#1a4477] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-blue-950/20 flex items-center justify-center gap-2.5 transition-all transform hover:scale-103 cursor-pointer border border-blue-900/30"
          >
            <span>Enter Arcade &bull; Get Started</span>
            <ArrowRight className="w-5 h-5 text-amber-300" />
          </button>

          {/* Tech Stack Pill */}
          <button
            onClick={onOpenTechStack}
            className="w-full sm:w-auto px-5 py-3.5 bg-white/90 hover:bg-white text-slate-800 font-bold text-xs rounded-2xl border border-slate-300 shadow-sm flex items-center justify-center gap-2 transition-all hover:border-blue-400 cursor-pointer"
          >
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Tech Stack (Java + Spring)</span>
          </button>
        </motion.div>

        {/* Feature Highlights Pills under CTA */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-bold text-slate-700">
          <div className="px-3 py-1.5 bg-white/80 rounded-full border border-slate-200/90 shadow-2xs flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Zero Queue Waiting</span>
          </div>
          <div className="px-3 py-1.5 bg-white/80 rounded-full border border-slate-200/90 shadow-2xs flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
            <span>UPI Payments (GPay &bull; PhonePe &bull; Paytm)</span>
          </div>
          <div className="px-3 py-1.5 bg-white/80 rounded-full border border-slate-200/90 shadow-2xs flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Live Token Pickup System</span>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 border-t border-slate-200/60 bg-white/40 backdrop-blur-xs">
        <div className="flex items-center gap-2 font-medium">
          <span className="font-bold text-slate-800">RIT</span>
          <span>&times;</span>
          <span className="font-extrabold text-blue-900">ARCADE</span>
          <span>|</span>
          <span>Smart Xerox &amp; Digital Printing Management System</span>
        </div>
        <div className="font-script text-xl text-blue-900 font-bold">
          Rajalakshmi Institute of Technology
        </div>
      </footer>
    </div>
  );
};
