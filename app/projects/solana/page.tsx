"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Terminal, ChevronDown, ArrowUpRight, Code, ExternalLink } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

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
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={typewriterChar}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="inline-block w-[10px] h-[1em] bg-[#14F195] ml-2 align-middle translate-y-[-0.1em]"
      />
    </motion.h1>
  );
};

export default function SolanaProjects() {
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
      
      {/* Solana Themed Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(153,69,255,0.06)_0%,transparent_70%)] will-change-transform transform-gpu"
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.25, 0.1], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[30%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(20,241,149,0.08)_0%,transparent_70%)] will-change-transform transform-gpu"
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle,rgba(153,69,255,0.05)_0%,transparent_70%)] will-change-transform transform-gpu"
        />
      </div>

      {/* Grid Pattern Mask */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_30%,transparent_100%)]"></div>

      {/* NavBar */}
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
          <Link href="/" className="relative text-ink hover:text-accent transition-colors py-1 group/navlink">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#9945FF] transition-all duration-300 ease-out group-hover/navlink:w-full"></span>
          </Link>
          <Link href="/blogs" className="relative text-ink hover:text-accent transition-colors py-1 group/navlink">
            Blogs
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#9945FF] transition-all duration-300 ease-out group-hover/navlink:w-full"></span>
          </Link>
          <div className="relative group">
            <button className="relative text-accent hover:text-[#14F195] transition-colors flex items-center gap-1 cursor-pointer py-1 group/navbtn">
              Projects 
              <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              <span className="absolute bottom-0 left-0 w-[100%] h-[2px] bg-[#14F195] transition-all duration-300 ease-out"></span>
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
              <div className="w-36 bg-surface/90 backdrop-blur-xl border-0 rounded-none shadow-2xl opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 flex flex-col p-1.5 z-50">
                <Link href="/projects/solana" className="relative block px-3 py-2.5 rounded-none hover:bg-white/5 text-sm transition-colors text-[#14F195] group/dropitem overflow-hidden">
                  Solana
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#14F195] transition-all duration-300 ease-out group-hover/dropitem:w-full"></span>
                </Link>
                <Link href="/projects/sui" className="relative block px-3 py-2.5 rounded-none hover:bg-white/5 text-sm transition-colors text-ink group/dropitem overflow-hidden">
                  Sui
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4CA2FF] transition-all duration-300 ease-out group-hover/dropitem:w-full"></span>
                </Link>
              </div>
            </div>
          </div>
          <Link href="/#experience" className="relative text-ink hover:text-accent transition-colors py-1 group/navlink">
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
      <main className="flex-grow flex flex-col items-center justify-start relative z-10 px-6 pt-24 pb-32 min-h-screen max-w-7xl mx-auto w-full">
        
        {/* Solana Logo Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="w-24 h-24 rounded-full bg-surface/50 backdrop-blur-xl border border-[#14F195]/30 flex items-center justify-center shadow-[0_0_40px_rgba(20,241,149,0.15)] mb-8 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#9945FF] to-[#14F195] blur-[20px] rounded-full opacity-40 animate-pulse"></div>
          <svg className="w-12 h-12 relative z-10" viewBox="0 0 318 256" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M49.6585 53.6499L0 83.1812L266.626 83.1812L317.065 53.6499L49.6585 53.6499Z" fill="url(#solana-grad-page)"/>
            <path d="M267.406 113.626L317.065 143.157L50.4389 143.157L0 113.626L267.406 113.626Z" fill="url(#solana-grad-page)"/>
            <path d="M49.6585 172.819L0 202.35L266.626 202.35L317.065 172.819L49.6585 172.819Z" fill="url(#solana-grad-page)"/>
            <defs>
              <linearGradient id="solana-grad-page" x1="28.919" y1="41.1396" x2="280.993" y2="216.734" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9945FF"/>
                <stop offset="1" stopColor="#14F195"/>
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Hero Title */}
        <Typewriter text="Building on Solana" className="text-5xl md:text-7xl text-ink tracking-tight text-center mb-6" />
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-ink-dim text-lg md:text-xl text-center max-w-2xl mb-16"
        >
          Explore my portfolio of high-performance decentralized applications built for scale, speed, and incredibly low costs.
        </motion.p>
        
        {/* Projects Bento Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[340px]">
          
          {/* Project 1: Large Featured */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2 rounded-none bg-surface/30 border border-border/50 hover:bg-surface/60 transition-all p-8 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#14F195]/10 blur-[80px] rounded-full pointer-events-none group-hover:opacity-100 transition-opacity opacity-0"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-none bg-[#111] border border-[#14F195]/30 flex items-center justify-center text-[#14F195] font-display font-bold text-xl">
                  S
                </div>
                <div className="flex gap-2">
                  <a href="#" className="w-10 h-10 flex items-center justify-center bg-surface border border-border/50 hover:border-[#14F195]/50 hover:text-[#14F195] transition-colors rounded-none">
                    <Code className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 flex items-center justify-center bg-surface border border-border/50 hover:border-[#14F195]/50 hover:text-[#14F195] transition-colors rounded-none">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="flex gap-2 mb-4 flex-wrap">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-ink-dim rounded-none">Rust / Anchor</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-ink-dim rounded-none">Next.js</span>
                  <span className="px-3 py-1 bg-[#14F195]/10 border border-[#14F195]/20 text-xs font-mono text-[#14F195] rounded-none">Web3.js</span>
                </div>
                <h3 className="text-3xl font-display font-semibold text-ink group-hover:text-[#14F195] transition-colors mb-3">
                  SolaDEX Orderbook
                </h3>
                <p className="text-ink-dim text-sm max-w-md line-clamp-2">
                  A high-speed, fully on-chain decentralized exchange. Featuring custom matching engines built in Rust, enabling sub-second trade execution directly on Solana.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Project 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-1 rounded-none bg-surface/30 border border-border/50 hover:bg-surface/60 transition-all p-8 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#9945FF]/20 blur-[60px] rounded-full pointer-events-none group-hover:opacity-100 transition-opacity opacity-0"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-none bg-[#111] border border-[#9945FF]/30 flex items-center justify-center text-[#9945FF] font-display font-bold text-xl">
                  N
                </div>
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-surface border border-border/50 hover:border-[#9945FF]/50 hover:text-[#9945FF] transition-colors rounded-none">
                  <Code className="w-5 h-5" />
                </a>
              </div>
              
              <div className="mt-auto">
                <div className="flex gap-2 mb-4 flex-wrap">
                  <span className="px-3 py-1 bg-[#9945FF]/10 border border-[#9945FF]/20 text-xs font-mono text-[#9945FF] rounded-none">Metaplex</span>
                </div>
                <h3 className="text-2xl font-display font-semibold text-ink group-hover:text-[#9945FF] transition-colors mb-3">
                  cNFT Launchpad
                </h3>
                <p className="text-ink-dim text-sm line-clamp-3">
                  An NFT minting platform utilizing state compression. Allows creators to mint thousands of NFTs for fractions of a penny.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Project 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="lg:col-span-1 rounded-none bg-surface/30 border border-border/50 hover:bg-surface/60 transition-all p-8 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#14F195]/20 blur-[60px] rounded-full pointer-events-none group-hover:opacity-100 transition-opacity opacity-0"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-none bg-[#111] border border-[#14F195]/30 flex items-center justify-center text-[#14F195] font-display font-bold text-xl">
                  P
                </div>
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-surface border border-border/50 hover:border-[#14F195]/50 hover:text-[#14F195] transition-colors rounded-none">
                  <Code className="w-5 h-5" />
                </a>
              </div>
              
              <div className="mt-auto">
                <div className="flex gap-2 mb-4 flex-wrap">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-ink-dim rounded-none">Solana Pay</span>
                </div>
                <h3 className="text-2xl font-display font-semibold text-ink group-hover:text-[#14F195] transition-colors mb-3">
                  Solana POS
                </h3>
                <p className="text-ink-dim text-sm line-clamp-3">
                  A point-of-sale payment gateway bridging physical merchants with Solana Pay for instant crypto transactions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Decorative Blank Tile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="lg:col-span-2 rounded-none border border-border/20 border-dashed p-8 flex flex-col items-center justify-center text-ink-dim/50 font-mono text-sm uppercase tracking-widest relative"
          >
            <div className="w-8 h-8 rounded-none border border-ink-dim/30 flex items-center justify-center mb-4">
              <span className="animate-pulse">+</span>
            </div>
            More Protocols Brewing...
          </motion.div>
          
        </div>
        
      </main>

    </div>
  );
}
