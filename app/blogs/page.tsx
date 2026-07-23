"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Terminal } from "lucide-react";
import { useState } from "react";

// Re-use Typewriter effect
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
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={typewriterChar}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="inline-block w-[10px] h-[1em] bg-accent ml-2 align-middle translate-y-[-0.1em]"
      />
    </motion.h1>
  );
};

export default function Blogs() {
  const { scrollY } = useScroll();
  const [navHidden, setNavHidden] = useState(false);
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setNavHidden(true);
    } else {
      setNavHidden(false);
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-paper overflow-hidden relative cursor-default">
      
      {/* Global Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_70%)] will-change-transform transform-gpu"
        />
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(76,162,255,0.05)_0%,transparent_70%)] will-change-transform transform-gpu"
        />
      </div>

      {/* N1 Standard Nav */}
      <motion.header 
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 }
        }}
        animate={navHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="flex items-center justify-between px-6 py-4 md:px-10 md:py-6 border-b border-border/10 bg-paper/80 backdrop-blur-md sticky top-0 z-50 will-change-transform transform-gpu"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-paper">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="font-display font-semibold text-lg tracking-tight">Teichi.DEV</span>
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
                <a href="/#ecosystems" className="relative block px-3 py-2.5 rounded-none hover:bg-white/5 text-sm transition-colors text-ink group/dropitem overflow-hidden">
                  Solana
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#9945FF] transition-all duration-300 ease-out group-hover/dropitem:w-full"></span>
                </a>
                <a href="/#ecosystems" className="relative block px-3 py-2.5 rounded-none hover:bg-white/5 text-sm transition-colors text-ink group/dropitem overflow-hidden">
                  Sui
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#9945FF] transition-all duration-300 ease-out group-hover/dropitem:w-full"></span>
                </a>
              </div>
            </div>
          </div>
          <a href="/#experience" className="relative text-ink hover:text-accent transition-colors py-1 group/navlink">
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

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-start relative z-10 px-6 pt-32 pb-24 min-h-[calc(100vh-80px)]">
        
        {/* Terminal Icon Decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="w-16 h-16 rounded-full bg-accent/10 border border-accent flex items-center justify-center text-accent mb-8"
        >
          <Terminal className="w-8 h-8" />
        </motion.div>

        {/* Hero Title */}
        <Typewriter text="Blogs" className="text-6xl md:text-8xl text-ink tracking-tight text-center mb-16" />
        
        {/* Coming Soon Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col items-center gap-6 mt-12"
        >
          <div className="px-6 py-3 border border-border/50 bg-surface/50 backdrop-blur-md rounded-none text-ink-dim font-mono text-sm uppercase tracking-widest flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
            Up coming ...
          </div>

          <motion.div 
            className="w-[1px] h-24 bg-gradient-to-b from-border to-transparent mt-4"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
        
      </main>

    </div>
  );
}
