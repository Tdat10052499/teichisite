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
                <a href="/projects/in-development" className="relative block px-3 py-2.5 rounded-none hover:bg-white/5 text-sm transition-colors text-ink group/dropitem overflow-hidden">
                  In development
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-ink transition-all duration-300 ease-out group-hover/dropitem:w-full"></span>
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
          {/* Main Hero Card Layout */}
          <div className="w-full flex flex-col pt-4 pb-12">
            {/* Top Bar above card */}
            <div className="flex justify-between items-center mb-6 px-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none border border-accent/30 bg-accent/5 text-accent text-sm font-mono">
                <Terminal className="w-4 h-4" />
                <span>WHOAMI</span>
              </div>
              <div className="text-right font-mono text-xs text-ink-dim tracking-widest uppercase hidden md:block">
                Building<br/>The Future
              </div>
            </div>

            {/* Banner Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="w-full rounded-[2.5rem] bg-gradient-to-br from-[#1A1A1A] to-[#111111] border border-white/5 relative overflow-hidden flex flex-col md:flex-row items-end justify-between pt-16 px-8 md:px-16 min-h-[500px] shadow-2xl"
            >
              {/* Subtle gradients matching the theme */}
              <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#9945FF]/15 blur-[100px] pointer-events-none rounded-full"></div>
              <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#14F195]/10 blur-[120px] pointer-events-none rounded-full"></div>

              {/* Text Content */}
              <div className="flex-1 pb-16 md:pb-24 z-10 w-full text-center md:text-left flex flex-col justify-end mt-12 md:mt-0">
                <h1 className="text-6xl md:text-7xl lg:text-[6rem] font-display font-semibold text-ink leading-[1.05] tracking-tight mb-6">
                  Hồ Du
                  <br className="hidden md:block" />
                  Tuấn Đạt
                </h1>
                <Typewriter text="TEICHI_WEB3" className="text-xl md:text-2xl font-mono text-[#14F195] tracking-widest uppercase opacity-90" />
              </div>

              {/* Image Content */}
              <div className="relative z-10 w-64 md:w-[450px] h-[300px] md:h-[500px] flex items-end justify-center -mb-4 md:-mb-8 mx-auto md:mx-0">
                <Image 
                  src="/images/Hero.png" 
                  alt="Hồ Du Tuấn Đạt" 
                  width={600} 
                  height={600}
                  className="object-contain object-bottom w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      </main>
    </div>
  );
}
