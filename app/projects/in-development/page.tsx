"use client";

import { motion } from "framer-motion";
import { Terminal, ChevronDown, ArrowUpRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Typewriter } from "@/components/ui/typewriter";

export default function InDevelopment() {
  const [navHidden, setNavHidden] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  
  // Fake terminal logs effect
  useEffect(() => {
    const initialLogs = [
      "> Initializing decentralized environment...",
      "> Establishing P2P node connection... SUCCESS",
      "> Compiling smart contract structures...",
      "> Scanning blockchain networks...",
      "> SYSTEM: Learning modules active.",
    ];
    
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < initialLogs.length) {
        setLogs(prev => [...prev, initialLogs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-ink font-sans selection:bg-accent/30 flex flex-col relative overflow-hidden">
      
      {/* Noise Overlay */}
      <div 
        className="fixed inset-0 opacity-[0.03] z-50 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>

      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_10%,transparent_100%)] pointer-events-none z-0"></div>

      {/* Nav */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: navHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/5"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-surface border border-border flex items-center justify-center">
            <Terminal className="w-4 h-4 text-ink-subtle" />
          </div>
          <span className="font-display font-semibold text-lg tracking-tight">Teichi_Web3</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-medium">
          <Link href="/" className="relative text-ink hover:text-accent transition-colors py-1 group/navlink">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#9945FF] transition-all duration-300 ease-out group-hover/navlink:w-full"></span>
          </Link>
          <Link href="/blogs" className="relative text-ink hover:text-accent transition-colors py-1 group/navlink">
            Blogs
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#9945FF] transition-all duration-300 ease-out group-hover/navlink:w-full"></span>
          </Link>
          <div className="relative group">
            <button className="relative text-ink hover:text-ink transition-colors flex items-center gap-1 cursor-pointer py-1 group/navbtn">
              Projects 
              <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              <span className="absolute bottom-0 left-0 w-[100%] h-[2px] bg-ink transition-all duration-300 ease-out"></span>
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
              <div className="w-36 bg-surface/90 backdrop-blur-xl border-0 rounded-none shadow-2xl opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 flex flex-col p-1.5 z-50">
                <Link href="/projects/solana" className="relative block px-3 py-2.5 rounded-none hover:bg-white/5 text-sm transition-colors text-[#14F195] group/dropitem overflow-hidden">
                  Solana
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#14F195] transition-all duration-300 ease-out group-hover/dropitem:w-full"></span>
                </Link>
                <Link href="/projects/in-development" className="relative block px-3 py-2.5 rounded-none hover:bg-white/5 text-sm transition-colors text-ink group/dropitem overflow-hidden bg-white/5">
                  In development
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-ink transition-all duration-300 ease-out group-hover/dropitem:w-full"></span>
                </Link>
              </div>
            </div>
          </div>
          <Link href="/about" className="relative text-ink hover:text-accent transition-colors py-1 group/navlink">
            About me
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#9945FF] transition-all duration-300 ease-out group-hover/navlink:w-full"></span>
          </Link>
        </nav>
        
        <Link 
          href="/#contact" 
          className="px-5 py-2.5 rounded-none bg-ink text-paper hover:bg-ink-subtle font-sans text-sm font-medium transition-transform active:scale-95"
        >
          Contact me !
        </Link>
      </motion.header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center relative z-10 px-6 pt-32 pb-24 min-h-screen">
        
        <div className="w-full max-w-3xl border border-white/10 bg-surface/50 backdrop-blur-xl p-8 relative group">
          {/* Decorative Corner Brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/40"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/40"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/40"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/40"></div>
          
          <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
            <Loader2 className="w-5 h-5 text-accent animate-spin" />
            <h1 className="text-xl font-mono text-ink">STATUS: <span className="text-accent animate-pulse">IN DEVELOPMENT</span></h1>
          </div>
          
          <div className="space-y-6">
            <Typewriter text="Exploring New Horizons" className="text-4xl md:text-5xl text-ink font-display font-semibold tracking-tight" />
            
            <p className="text-ink-subtle text-lg max-w-xl font-mono leading-relaxed">
              I am constantly expanding my knowledge base and developing new skills across multiple decentralized ecosystems. 
              Stay tuned for upcoming projects and experiments.
            </p>
            
            {/* Terminal logs display */}
            <div className="bg-black/80 border border-white/5 p-4 min-h-[160px] font-mono text-sm mt-8 flex flex-col gap-2">
              {logs.map((log, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-ink-dim"
                >
                  {log}
                </motion.div>
              ))}
              <div className="flex items-center gap-2 text-accent mt-2 animate-pulse">
                <span>_</span>
              </div>
            </div>
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link href="/" className="px-6 py-3 border border-border bg-paper hover:bg-white/5 text-ink text-sm font-medium transition-colors flex items-center justify-center gap-2">
              Return Home <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link href="/projects/solana" className="px-6 py-3 bg-[#14F195]/10 border border-[#14F195]/30 hover:bg-[#14F195]/20 text-[#14F195] text-sm font-medium transition-colors flex items-center justify-center gap-2">
              View Solana Portfolio <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
