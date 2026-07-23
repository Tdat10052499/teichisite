"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Terminal, ChevronDown, ArrowUpRight, Code, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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
        className="inline-block w-[10px] h-[1em] bg-[#4CA2FF] ml-2 align-middle translate-y-[-0.1em]"
      />
    </motion.h1>
  );
};

export default function SuiProjects() {
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
      
      {/* SUI Themed Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.1, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.06)_0%,transparent_70%)] will-change-transform transform-gpu"
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.25, 0.1], scale: [1, 1.2, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[30%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(76,162,255,0.08)_0%,transparent_70%)] will-change-transform transform-gpu"
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.15, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.05)_0%,transparent_70%)] will-change-transform transform-gpu"
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
          <span className="font-display font-semibold text-lg tracking-tight">Teichi_Web3</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-medium">
          <Link href="/" className="relative text-ink hover:text-accent transition-colors py-1 group/navlink">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4CA2FF] transition-all duration-300 ease-out group-hover/navlink:w-full"></span>
          </Link>
          <Link href="/blogs" className="relative text-ink hover:text-accent transition-colors py-1 group/navlink">
            Blogs
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4CA2FF] transition-all duration-300 ease-out group-hover/navlink:w-full"></span>
          </Link>
          <div className="relative group">
            <button className="relative text-[#4CA2FF] hover:text-[#00E5FF] transition-colors flex items-center gap-1 cursor-pointer py-1 group/navbtn">
              Projects 
              <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              <span className="absolute bottom-0 left-0 w-[100%] h-[2px] bg-[#4CA2FF] transition-all duration-300 ease-out"></span>
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
              <div className="w-36 bg-surface/90 backdrop-blur-xl border-0 rounded-none shadow-2xl opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 flex flex-col p-1.5 z-50">
                <Link href="/projects/solana" className="relative block px-3 py-2.5 rounded-none hover:bg-white/5 text-sm transition-colors text-ink group/dropitem overflow-hidden">
                  Solana
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#14F195] transition-all duration-300 ease-out group-hover/dropitem:w-full"></span>
                </Link>
                <Link href="/projects/sui" className="relative block px-3 py-2.5 rounded-none hover:bg-white/5 text-sm transition-colors text-[#4CA2FF] group/dropitem overflow-hidden">
                  Sui
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4CA2FF] transition-all duration-300 ease-out group-hover/dropitem:w-full"></span>
                </Link>
              </div>
            </div>
          </div>
          <Link href="/#experience" className="relative text-ink hover:text-accent transition-colors py-1 group/navlink">
            About me
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4CA2FF] transition-all duration-300 ease-out group-hover/navlink:w-full"></span>
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
        
        {/* Sui Logo Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="w-24 h-24 rounded-full bg-surface/50 backdrop-blur-xl border border-[#4CA2FF]/30 flex items-center justify-center shadow-[0_0_40px_rgba(76,162,255,0.15)] mb-8 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF] to-[#4CA2FF] blur-[20px] rounded-full opacity-40 animate-pulse"></div>
          <svg className="w-12 h-12 relative z-10" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M197.376 71.3347C198.854 69.5551 201.617 69.5551 203.094 71.3347L280.465 164.535L280.715 164.849C294.951 182.255 303.47 204.374 303.471 228.453C303.471 284.533 257.256 329.998 200.24 330C143.223 330 97 284.534 97 228.453C97.001 204.375 105.52 182.255 119.756 164.849L120.006 164.546L197.376 71.3347ZM138.523 178.129C127.606 191.477 121.069 208.448 121.068 226.913C121.068 269.921 156.51 304.789 200.23 304.791C212.695 304.791 224.493 301.954 234.984 296.905L234.996 296.899C235.197 296.798 235.337 296.604 235.369 296.381C236.074 290.481 235.777 283.729 234.151 276.87C230.251 260.431 216.717 245.436 193.471 232.401C166.73 217.454 150.739 198.154 146.261 175.008C146.023 173.777 145.813 172.551 145.647 171.332C145.567 170.744 144.826 170.531 144.447 170.988L138.523 178.129ZM204.156 108.504C202.132 106.065 198.339 106.065 196.314 108.504L184.775 122.412C181.245 126.711 177.091 133.852 174.298 142.374C171.504 150.898 170.051 160.849 171.996 170.756C175.007 186.079 186.483 199.563 206.521 210.763C236.193 227.395 254.216 247.942 259.75 271.895C260.043 273.162 260.296 274.42 260.51 275.665C260.613 276.242 261.346 276.432 261.718 275.98C272.775 262.589 279.402 245.508 279.402 226.913C279.402 208.594 272.965 191.748 262.202 178.449C262.199 178.446 262.2 178.441 262.202 178.438C262.205 178.435 262.206 178.43 262.203 178.427L204.156 108.504Z" fill="url(#sui-grad-page)"/>
            <defs>
              <linearGradient id="sui-grad-page" x1="120" y1="71" x2="303" y2="330" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00E5FF"/>
                <stop offset="1" stopColor="#4CA2FF"/>
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Hero Title */}
        <Typewriter text="Building on Sui" className="text-5xl md:text-7xl text-ink tracking-tight text-center mb-6" />
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-ink-dim text-lg md:text-xl text-center max-w-2xl mb-16"
        >
          Explore my portfolio of decentralized applications leveraging Sui's unique object-centric architecture for unparalleled composability and speed.
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
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#4CA2FF]/10 blur-[80px] rounded-full pointer-events-none group-hover:opacity-100 transition-opacity opacity-0"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-none bg-[#111] border border-[#4CA2FF]/30 flex items-center justify-center text-[#4CA2FF] font-display font-bold text-xl">
                  L
                </div>
                <div className="flex gap-2">
                  <a href="#" className="w-10 h-10 flex items-center justify-center bg-surface border border-border/50 hover:border-[#4CA2FF]/50 hover:text-[#4CA2FF] transition-colors rounded-none">
                    <Code className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 flex items-center justify-center bg-surface border border-border/50 hover:border-[#4CA2FF]/50 hover:text-[#4CA2FF] transition-colors rounded-none">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="flex gap-2 mb-4 flex-wrap">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-ink-dim rounded-none">Move</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-ink-dim rounded-none">SuiTS</span>
                  <span className="px-3 py-1 bg-[#4CA2FF]/10 border border-[#4CA2FF]/20 text-xs font-mono text-[#4CA2FF] rounded-none">PTBs</span>
                </div>
                <h3 className="text-3xl font-display font-semibold text-ink group-hover:text-[#4CA2FF] transition-colors mb-3">
                  SuiLend Protocol
                </h3>
                <p className="text-ink-dim text-sm max-w-md line-clamp-2">
                  A decentralized lending platform leveraging Sui's unique object-centric model and Programmable Transaction Blocks (PTBs) for atomic DeFi operations.
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
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#00E5FF]/20 blur-[60px] rounded-full pointer-events-none group-hover:opacity-100 transition-opacity opacity-0"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-none bg-[#111] border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] font-display font-bold text-xl">
                  M
                </div>
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-surface border border-border/50 hover:border-[#00E5FF]/50 hover:text-[#00E5FF] transition-colors rounded-none">
                  <Code className="w-5 h-5" />
                </a>
              </div>
              
              <div className="mt-auto">
                <div className="flex gap-2 mb-4 flex-wrap">
                  <span className="px-3 py-1 bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-xs font-mono text-[#00E5FF] rounded-none">Sui Kiosk</span>
                </div>
                <h3 className="text-2xl font-display font-semibold text-ink group-hover:text-[#00E5FF] transition-colors mb-3">
                  Dynamic Move NFTs
                </h3>
                <p className="text-ink-dim text-sm line-clamp-3">
                  Composable on-chain gaming assets utilizing Sui Kiosk and dynamic fields to allow NFTs to own other NFTs seamlessly.
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
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#4CA2FF]/20 blur-[60px] rounded-full pointer-events-none group-hover:opacity-100 transition-opacity opacity-0"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-none bg-[#111] border border-[#4CA2FF]/30 flex items-center justify-center text-[#4CA2FF] font-display font-bold text-xl">
                  S
                </div>
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-surface border border-border/50 hover:border-[#4CA2FF]/50 hover:text-[#4CA2FF] transition-colors rounded-none">
                  <Code className="w-5 h-5" />
                </a>
              </div>
              
              <div className="mt-auto">
                <div className="flex gap-2 mb-4 flex-wrap">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-ink-dim rounded-none">Unity / SDK</span>
                </div>
                <h3 className="text-2xl font-display font-semibold text-ink group-hover:text-[#4CA2FF] transition-colors mb-3">
                  SuiPlay SDK
                </h3>
                <p className="text-ink-dim text-sm line-clamp-3">
                  A robust integration tool bridging Unity game engines directly with the Sui network for in-game transaction signing.
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
            More Objects Incoming...
          </motion.div>
          
        </div>
        
      </main>

    </div>
  );
}
