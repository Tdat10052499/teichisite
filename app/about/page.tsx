"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Terminal, Loader2 } from "lucide-react";

// Typewriter component
const typewriterContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const typewriterChar = {
  hidden: { opacity: 0, display: "none" },
  visible: { opacity: 1, display: "inline-block" }
};

const Typewriter = ({ text, className = "" }: { text: string, className?: string }) => {
  return (
    <motion.h1
      variants={typewriterContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`font-display font-semibold ${className}`}
    >
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={typewriterChar}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[0.15em] h-[0.8em] bg-accent ml-1 align-baseline"
      />
    </motion.h1>
  );
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink selection:bg-accent/30 selection:text-ink relative overflow-hidden">
      
      {/* N1 Standard Nav */}
      <motion.header 
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="flex items-center justify-between px-6 py-4 md:px-10 md:py-6 border-b border-border/10 bg-paper/80 backdrop-blur-md sticky top-0 z-50 will-change-transform transform-gpu"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-paper">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="font-display font-semibold text-lg tracking-tight">Teichi_Web3</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-medium">
          <a href="/" className="relative text-ink hover:text-accent transition-colors py-1 group/navlink">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#9945FF] transition-all duration-300 ease-out group-hover/navlink:w-full"></span>
          </a>
          <a href="/blogs" className="relative text-ink hover:text-accent transition-colors py-1 group/navlink">
            Blogs
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#9945FF] transition-all duration-300 ease-out group-hover/navlink:w-full"></span>
          </a>
          <div className="relative group">
            <button className="relative text-ink hover:text-accent transition-colors flex items-center gap-1 cursor-pointer py-1 group/navbtn">
              Projects 
              <svg className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#9945FF] transition-all duration-300 ease-out group-hover/navbtn:w-full"></span>
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
              <div className="w-36 bg-surface/90 backdrop-blur-xl border-0 rounded-none shadow-2xl opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 flex flex-col p-1.5 z-50">
                <a href="/projects/solana" className="relative block px-3 py-2.5 rounded-none hover:bg-white/5 text-sm transition-colors text-[#14F195] group/dropitem overflow-hidden">
                  Solana
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#14F195] transition-all duration-300 ease-out group-hover/dropitem:w-full"></span>
                </a>
                <a href="/projects/sui" className="relative block px-3 py-2.5 rounded-none hover:bg-white/5 text-sm transition-colors text-ink group/dropitem overflow-hidden">
                  Sui
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4CA2FF] transition-all duration-300 ease-out group-hover/dropitem:w-full"></span>
                </a>
              </div>
            </div>
          </div>
          <a href="/about" className="relative text-ink hover:text-accent transition-colors py-1 group/navlink">
            About me
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#9945FF] transition-all duration-300 ease-out group-hover/navlink:w-full"></span>
          </a>
        </nav>
        
        <a 
          href="/#contact" 
          className="px-5 py-2.5 rounded-none bg-ink text-paper hover:bg-ink-subtle font-sans text-sm font-medium transition-transform active:scale-95"
        >
          Contact me !
        </a>
      </motion.header>

      <main className="flex-1 w-full pt-16 pb-24 relative z-10">
      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(153,69,255,0.05)_0%,transparent_60%)]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(20,241,149,0.05)_0%,transparent_60%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center"
        >
          {/* Header */}
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-none border border-accent/30 bg-accent/5 text-accent text-sm font-mono mb-8">
            <Terminal className="w-4 h-4" />
            <span>WHOAMI</span>
          </div>

          <Typewriter text="About Me" className="text-5xl md:text-7xl text-ink mb-16 tracking-tight" />

          {/* Main Layout: Split on desktop, stack on mobile */}
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
            
            {/* Image Container (Hero.png) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative group"
            >
              {/* Outer Glowing Border */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700 animate-pulse"></div>
              
              <div className="relative w-64 h-64 md:w-80 md:h-80 bg-surface/50 border border-border/50 rounded-none overflow-hidden flex items-center justify-center">
                {/* Minimal Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
                
                {/* Image */}
                <Image 
                  src="/images/Hero.png" 
                  alt="Teichi Hero" 
                  width={320} 
                  height={320}
                  className="object-cover relative z-10 scale-110 group-hover:scale-125 transition-transform duration-700"
                  priority
                />
              </div>

              {/* Decorative Corner Brackets */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-accent"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#14F195]"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#14F195]"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-accent"></div>
            </motion.div>

            {/* Updating Status Container */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex-1 max-w-md w-full bg-[#111111]/80 backdrop-blur-2xl rounded-none border border-white/10 shadow-2xl overflow-hidden"
            >
              {/* Terminal Header */}
              <div className="h-10 border-b border-white/5 bg-[#1A1A1A] flex items-center px-4 gap-2">
                <div className="w-3 h-3 bg-red-500/80 rounded-none"></div>
                <div className="w-3 h-3 bg-yellow-500/80 rounded-none"></div>
                <div className="w-3 h-3 bg-green-500/80 rounded-none"></div>
                <div className="ml-4 text-xs font-mono text-white/40">about_me.txt - Processing</div>
              </div>
              
              {/* Terminal Body */}
              <div className="p-8 font-mono text-sm md:text-base text-white/80 flex flex-col items-start text-left min-h-[200px] relative">
                
                <div className="flex items-center gap-3 text-accent mb-4">
                  <Terminal className="w-5 h-5" />
                  <span>Fetching profile data...</span>
                </div>
                
                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-2 opacity-50">
                    <span className="text-green-400">✓</span>
                    <span>Loaded Hero.png</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-50">
                    <span className="text-green-400">✓</span>
                    <span>Initialized Web3 Interface</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-yellow-400" />
                    <span className="text-yellow-400">Compiling background story...</span>
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-white/10 w-full flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-display font-medium text-ink">Updating...</h3>
                    <p className="text-ink-dim text-xs mt-1">Please check back later.</p>
                  </div>
                  <div className="w-2 h-4 bg-accent animate-pulse"></div>
                </div>

              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
      </main>
    </div>
  );
}
