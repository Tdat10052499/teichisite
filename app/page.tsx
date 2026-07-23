"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Terminal, ArrowUpRight, CheckCircle2, Shield, Zap, Code2, Globe, Play } from "lucide-react";

/* Hallmark · macrostructure: Marquee Hero · theme: studied-DNA (source: https://phantom.com/) · nav: N1 Standard · footer: Ft1 Minimal */

function HeroVideoMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Custom cursor states
  const [isHovered, setIsHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Link animation directly to scroll position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // Scale from 0.6 to 1.0 as the user scrolls for a more dramatic zoom
  const scale = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  // When scroll animation is finished (scale reaches 1), play video
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.99 && videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    }
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  const handleVideoClick = () => {
    setShowPopup(true);
    setIsHovered(false); // Hide custom cursor when popup opens
  };

  const handleConfirm = () => {
    window.open("https://www.youtube.com/watch?v=vzHvcZiNi48", "_blank");
    setShowPopup(false);
  };

  return (
    <>
      <motion.div 
        ref={containerRef}
        style={{ scale, opacity }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => !showPopup && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleVideoClick}
        className={`mt-20 w-[95vw] max-w-7xl aspect-video rounded-none sm:rounded-none bg-surface/50 border border-border/50 shadow-2xl overflow-hidden relative flex items-center justify-center origin-center ${isHovered ? "cursor-none" : "cursor-default"}`}
      >
        <video 
          ref={videoRef}
          src="/videos/UniHackfest%202026%20Introduce.mp4"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          muted
          loop
          playsInline
        />

        {/* Bottom Left Status Badge */}
        <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 bg-black/60 backdrop-blur-xl text-white px-5 py-2.5 rounded-none font-sans text-sm font-medium border border-white/10 flex items-center gap-3 pointer-events-none z-10 shadow-xl">
          <div className="w-2 h-2 rounded-none bg-accent animate-pulse shadow-[0_0_8px_var(--color-accent)]"></div>
          UniHackFest 2026 up comming ...
        </div>

        {/* Custom Follow Cursor */}
        <AnimatePresence>
          {isHovered && !showPopup && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              style={{ x: cursorX, y: cursorY }}
              className="absolute left-0 top-0 pointer-events-none z-50 flex items-center justify-center -ml-16 -mt-6"
            >
              <div className="bg-accent text-paper px-5 py-3 rounded-none font-sans font-medium text-sm shadow-xl flex items-center gap-2 whitespace-nowrap">
                <Play className="w-4 h-4 fill-current" />
                Play Intro
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Confirmation Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-paper-1/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-surface border border-border/50 p-8 rounded-none max-w-sm w-full shadow-2xl"
            >
              <h3 className="font-display text-xl font-semibold mb-4 text-center">
                Wanna move to <br/> <span className="text-accent">"Intro Unihackfest 2026"</span> ?
              </h3>
              <div className="flex gap-4 mt-8">
                <button 
                  onClick={() => setShowPopup(false)}
                  className="flex-1 py-3 rounded-none bg-paper border border-border text-ink hover:bg-border transition-colors font-medium text-sm"
                >
                  No, stay here
                </button>
                <button 
                  onClick={handleConfirm}
                  className="flex-1 py-3 rounded-none bg-accent text-paper hover:bg-accent-hover transition-colors font-medium text-sm shadow-lg shadow-accent/20"
                >
                  Yes, let's go
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 150, damping: 20 } 
  }
};

const slideUpVariant = {
  hidden: { y: "120%" },
  visible: { 
    y: "0%", 
    transition: { type: "spring", stiffness: 150, damping: 20 } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

function GlobalCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.15 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' || 
        target.closest('a') || 
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Outer Ring Follower */}
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        animate={{ scale: isHovering ? 2.5 : 1, opacity: isHovering ? 0.3 : 1 }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 w-6 h-6 -ml-3 -mt-3 rounded-none border border-accent pointer-events-none z-[9999] hidden md:block will-change-transform transform-gpu"
      />
      {/* Inner Dot */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        animate={{ scale: isHovering ? 0 : 1, opacity: isHovering ? 0 : 1 }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-none bg-accent pointer-events-none z-[9999] hidden md:block shadow-[0_0_10px_var(--color-accent)] will-change-transform transform-gpu"
      />
    </>
  );
}

const typewriterContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const typewriterChar = {
  hidden: { opacity: 0, display: "none" },
  visible: { opacity: 1, display: "inline-block" }
};

const Typewriter = ({ text, className = "" }: { text: string, className?: string }) => {
  return (
    <motion.h2
      variants={typewriterContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
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
    </motion.h2>
  );
};

export default function Home() {
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
      
      {/* Global Cursor Effect */}
      <GlobalCursor />
      
      {/* Global Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-none bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_70%)] will-change-transform transform-gpu"
        />
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] rounded-none bg-[radial-gradient(circle,rgba(76,162,255,0.05)_0%,transparent_70%)] will-change-transform transform-gpu"
        />
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[80vw] rounded-none bg-[radial-gradient(circle,rgba(20,241,149,0.05)_0%,transparent_70%)] will-change-transform transform-gpu"
        />
      </div>

      {/* Grid Pattern Mask (Hero Area) */}
      <div className="absolute top-0 left-0 w-full h-[150vh] pointer-events-none z-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_40%,transparent_100%)]"></div>

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
          <a href="#experience" className="relative text-ink hover:text-accent transition-colors py-1 group/navlink">
            About me
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#9945FF] transition-all duration-300 ease-out group-hover/navlink:w-full"></span>
          </a>
        </nav>
        
        <a 
          href="#contact" 
          className="px-5 py-2.5 rounded-none bg-ink text-paper hover:bg-ink-subtle font-sans text-sm font-medium transition-transform active:scale-95"
        >
          Contact me !
        </a>
      </motion.header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-10 pb-24 relative z-10">
        
        {/* H1 Marquee Hero */}
        <section className="py-20 md:py-32 flex flex-col items-center text-center relative z-0">
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center max-w-4xl relative z-10"
          >
            <motion.h1 
              variants={staggerContainer}
              className="text-5xl md:text-7xl font-display font-semibold leading-[1.1] tracking-tight mb-6 flex flex-wrap justify-center gap-x-[0.3em] gap-y-2"
            >
              {["The", "Web3", "developer"].map((word, i) => (
                <span key={`l1-${i}`} className="overflow-hidden inline-block pb-4 -mb-4">
                  <motion.span className={`inline-block ${word === "Web3" ? "text-accent relative" : ""}`} variants={slideUpVariant}>
                    {word}
                    {word === "Web3" && <div className="absolute -bottom-1 left-0 w-full h-1.5 bg-accent rounded-none"></div>}
                  </motion.span>
                </span>
              ))}
              <div className="w-full h-0"></div>
              {["that'll", "take", "you", "places."].map((word, i) => (
                <span key={`l2-${i}`} className="overflow-hidden inline-block pb-4 -mb-4">
                  <motion.span className="inline-block text-accent" variants={slideUpVariant}>{word}</motion.span>
                </span>
              ))}
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-ink-subtle leading-relaxed mb-10 max-w-2xl"
            >
              Your home for smart contract development, highly-interactive dApps, 
              and decentralized architecture that scales.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a 
                href="#projects"
                className="w-full sm:w-auto px-8 py-4 rounded-none bg-accent text-paper hover:bg-accent-hover font-sans text-base font-medium transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                View Projects
              </a>
              <a 
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 rounded-none bg-surface text-ink hover:bg-border font-sans text-base font-medium transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                Let's Build
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Visual Mockup */}
          <HeroVideoMockup />
        </section>

        {/* Platforms / Ecosystems */}
        <div id="ecosystems" className="py-24 space-y-32">
          <Typewriter text="Ecosystems I build on." className="text-4xl md:text-5xl text-center" />
          
          {/* Solana Section */}
          <section className="flex flex-col md:flex-row items-center gap-12 md:gap-20 max-w-7xl mx-auto">
            {/* Text Side */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="flex-1 flex flex-col items-start text-left"
            >
              <div className="relative mb-8">
                {/* Logo Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#9945FF] to-[#14F195] blur-[30px] rounded-none opacity-40 animate-pulse"></div>
                
                <div className="w-16 h-16 rounded-full bg-surface/80 backdrop-blur-xl border border-border/50 flex items-center justify-center shadow-lg relative z-10">
                  <svg className="w-8 h-8" viewBox="0 0 318 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M49.6585 53.6499L0 83.1812L266.626 83.1812L317.065 53.6499L49.6585 53.6499Z" fill="url(#solana-grad2)"/>
                    <path d="M267.406 113.626L317.065 143.157L50.4389 143.157L0 113.626L267.406 113.626Z" fill="url(#solana-grad2)"/>
                    <path d="M49.6585 172.819L0 202.35L266.626 202.35L317.065 172.819L49.6585 172.819Z" fill="url(#solana-grad2)"/>
                    <defs>
                      <linearGradient id="solana-grad2" x1="28.919" y1="41.1396" x2="280.993" y2="216.734" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#9945FF"/>
                        <stop offset="1" stopColor="#14F195"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6 text-ink">Solana</h2>
              <p className="text-ink-dim text-lg mb-10 leading-relaxed max-w-xl">
                High-performance decentralized applications built for scale. Leveraging the speed and low costs of the Solana blockchain for seamless user experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://solana.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-none bg-paper border border-border text-ink hover:text-white hover:border-[#14F195]/50 transition-colors font-medium text-sm group/link shadow-sm">
                  Official Website
                  <ArrowUpRight className="w-4 h-4 text-ink-dim group-hover/link:text-[#14F195] transition-colors" />
                </a>
                <a href="/projects?ecosystem=solana" className="flex items-center justify-center gap-2 px-6 py-3 rounded-none bg-surface border border-border/50 text-ink hover:bg-border transition-colors font-medium text-sm shadow-sm">
                  View My Projects
                </a>
              </div>
            </motion.div>
            
            {/* Visual Side */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="flex-1 w-full"
            >
              <div className="aspect-[4/3] sm:aspect-square md:aspect-[4/3] rounded-none border border-border/50 relative flex items-center justify-center overflow-hidden bg-surface/30">
                 {/* Animated Gradient Glows (Solana) */}
                 <motion.div 
                   animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3], x: [0, 50, 0], y: [0, 50, 0] }}
                   transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-0 left-0 w-3/4 h-3/4 bg-[radial-gradient(circle,rgba(153,69,255,0.4)_0%,transparent_70%)] rounded-none pointer-events-none will-change-transform transform-gpu"
                 />
                 <motion.div 
                   animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3], x: [0, -50, 0], y: [0, -50, 0] }}
                   transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                   className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-[radial-gradient(circle,rgba(20,241,149,0.4)_0%,transparent_70%)] rounded-none pointer-events-none will-change-transform transform-gpu"
                 />

                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 sm:w-3/4 h-3/4 bg-[#111111]/80 backdrop-blur-2xl rounded-none border border-white/10 shadow-2xl flex flex-col overflow-hidden z-10">
                    {/* Mock Code window */}
                    <div className="h-10 border-b border-white/5 bg-[#1A1A1A] flex items-center px-4 gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                      <div className="ml-4 text-xs font-mono text-white/30">Anchor Program</div>
                    </div>
                    <div className="p-6 font-mono text-sm md:text-base text-white/70 flex-1 overflow-hidden">
                      <span className="text-[#9945FF]">import</span> {"{ Connection, PublicKey }"} <span className="text-[#9945FF]">from</span> <span className="text-[#14F195]">'@solana/web3.js'</span>;<br/><br/>
                      <span className="text-[#9945FF]">const</span> connection = <span className="text-[#9945FF]">new</span> Connection(<br/>
                      &nbsp;&nbsp;<span className="text-[#14F195]">"https://api.mainnet-beta.solana.com"</span><br/>
                      );
                    </div>
                 </div>
              </div>
            </motion.div>
          </section>

          {/* SUI Section */}
          <section className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20 max-w-7xl mx-auto">
            {/* Visual Side */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="flex-1 w-full"
            >
              <div className="aspect-[4/3] sm:aspect-square md:aspect-[4/3] rounded-none border border-border/50 relative flex items-center justify-center overflow-hidden bg-surface/30">
                 {/* Animated Gradient Glows (Sui) */}
                 <motion.div 
                   animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3], x: [0, 50, 0], y: [0, 50, 0] }}
                   transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-0 left-0 w-3/4 h-3/4 bg-[radial-gradient(circle,rgba(76,162,255,0.4)_0%,transparent_70%)] rounded-none pointer-events-none will-change-transform transform-gpu"
                 />
                 <motion.div 
                   animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3], x: [0, -50, 0], y: [0, -50, 0] }}
                   transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                   className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-[radial-gradient(circle,rgba(2,132,173,0.4)_0%,transparent_70%)] rounded-none pointer-events-none will-change-transform transform-gpu"
                 />

                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 sm:w-3/4 h-3/4 bg-[#111111]/80 backdrop-blur-2xl rounded-none border border-white/10 shadow-2xl flex flex-col overflow-hidden z-10">
                    {/* Mock Code window */}
                    <div className="h-10 border-b border-white/5 bg-[#1A1A1A] flex items-center px-4 gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                      <div className="ml-4 text-xs font-mono text-white/30">Move Contract</div>
                    </div>
                    <div className="p-6 font-mono text-sm md:text-base text-white/70 flex-1 overflow-hidden">
                      <span className="text-[#4CA2FF]">module</span> my_package::sui_logic {"{"}<br/><br/>
                      &nbsp;&nbsp;<span className="text-[#4CA2FF]">use</span> sui::object::{"{Self, UID}"};<br/>
                      &nbsp;&nbsp;<span className="text-[#4CA2FF]">use</span> sui::transfer;<br/><br/>
                      &nbsp;&nbsp;<span className="text-[#4CA2FF]">public struct</span> Asset <span className="text-[#4CA2FF]">has</span> key {"{"}<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;id: UID,<br/>
                      &nbsp;&nbsp;{"}"}<br/>
                      {"}"}
                    </div>
                 </div>
              </div>
            </motion.div>

            {/* Text Side */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="flex-1 flex flex-col items-start text-left"
            >
              <div className="relative mb-8">
                {/* Logo Glow */}
                <div className="absolute inset-0 bg-[#4CA2FF] blur-[30px] rounded-none opacity-40 animate-pulse"></div>
                
                <div className="w-16 h-16 rounded-full bg-surface/80 backdrop-blur-xl border border-border/50 flex items-center justify-center shadow-lg relative z-10">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.636 10.009a7.16 7.16 0 0 1 1.565 4.474 7.2 7.2 0 0 1-1.608 4.53l-.087.106-.023-.135a7 7 0 0 0-.07-.349c-.502-2.21-2.142-4.106-4.84-5.642-1.823-1.034-2.866-2.278-3.14-3.693-.177-.915-.046-1.834.209-2.62.254-.787.631-1.446.953-1.843l1.05-1.284a.46.46 0 0 1 .713 0l5.28 6.456zm1.66-1.283L12.26.123a.336.336 0 0 0-.52 0L4.704 8.726l-.023.029a9.33 9.33 0 0 0-2.07 5.872C2.612 19.803 6.816 24 12 24s9.388-4.197 9.388-9.373a9.32 9.32 0 0 0-2.07-5.871zM6.389 9.981l.63-.77.018.142q.023.17.055.34c.408 2.136 1.862 3.917 4.294 5.297 2.114 1.203 3.345 2.586 3.7 4.103a5.3 5.3 0 0 1 .109 1.801l-.004.034-.03.014A7.2 7.2 0 0 1 12 21.67c-3.976 0-7.2-3.218-7.2-7.188 0-1.705.594-3.27 1.587-4.503z" fill="#4CA2FF"/>
                  </svg>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6 text-ink">Sui</h2>
              <p className="text-ink-dim text-lg mb-10 leading-relaxed max-w-xl">
                Next-generation smart contracts with Move. Building highly interactive, object-centric applications with sub-second finality and dynamic assets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://sui.io" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-none bg-paper border border-border text-ink hover:text-white hover:border-[#4CA2FF]/50 transition-colors font-medium text-sm group/link shadow-sm">
                  Official Website
                  <ArrowUpRight className="w-4 h-4 text-ink-dim group-hover/link:text-[#4CA2FF] transition-colors" />
                </a>
                <a href="/projects?ecosystem=sui" className="flex items-center justify-center gap-2 px-6 py-3 rounded-none bg-surface border border-border/50 text-ink hover:bg-border transition-colors font-medium text-sm shadow-sm">
                  View My Projects
                </a>
              </div>
            </motion.div>
          </section>
        </div>

        {/* Experience Section */}
        <section id="experience" className="py-24 max-w-4xl mx-auto w-full px-6">
          <Typewriter text="Experience" className="mb-12 text-4xl md:text-5xl text-ink" />

          <div className="flex flex-col">
            {[
              { role: "Founder", company: "EduOrigo Solutions" },
              { role: "Leader", company: "EduOrigo Solutions", desc: "[Unihackfest 2026]" },
              { role: "Leader", company: "Sui Harvest", desc: "[Sui Learning Tour 2025]" },
              { role: "Student", company: "Văn Lang University" },
            ].map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-border/50"
              >
                {/* Animated Hover Line */}
                <div className="absolute bottom-[-1px] left-0 h-[1px] bg-white/40 w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
                
                <div className="text-xl md:text-2xl text-ink font-medium mb-2 md:mb-0 flex items-center gap-2">
                  {exp.role}
                  {exp.desc && <span className="text-ink-dim text-lg font-normal">{exp.desc}</span>}
                </div>
                <div className="text-left md:text-right">
                  <div className="text-lg md:text-xl text-ink-dim group-hover:text-ink transition-colors flex items-center md:justify-end gap-2 cursor-pointer">
                    {exp.company}
                    <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-accent" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Social Media Bento Grid */}
        <section className="py-24 max-w-5xl mx-auto w-full px-6">
          <Typewriter text="Connect with me" className="mb-12 text-4xl md:text-5xl text-ink text-center" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
            {/* Blogs - Wide */}
            <motion.a 
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 rounded-none bg-surface/30 border border-border/50 hover:bg-surface/60 transition-all p-8 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[80px] rounded-none pointer-events-none group-hover:opacity-100 transition-opacity opacity-0"></div>
              <div className="w-12 h-12 rounded-none bg-surface border border-border/50 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-medium text-ink mb-2">Read my Blogs</h3>
                <p className="text-ink-dim">Deep dives into tech, blockchain, and life.</p>
              </div>
              <ArrowUpRight className="absolute bottom-8 right-8 w-6 h-6 text-accent opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out" />
            </motion.a>

            {/* YouTube */}
            <motion.a 
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-1 rounded-none bg-surface/30 border border-border/50 hover:bg-surface/60 transition-all p-8 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/20 blur-[60px] rounded-none pointer-events-none group-hover:opacity-100 transition-opacity opacity-0"></div>
              <div className="w-12 h-12 rounded-none bg-surface border border-border/50 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-ink" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-medium text-ink">YouTube</h3>
              </div>
              <ArrowUpRight className="absolute bottom-8 right-8 w-6 h-6 text-red-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out" />
            </motion.a>

            {/* Facebook */}
            <motion.a 
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-1 rounded-none bg-surface/30 border border-border/50 hover:bg-surface/60 transition-all p-8 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 blur-[60px] rounded-none pointer-events-none group-hover:opacity-100 transition-opacity opacity-0"></div>
              <div className="w-12 h-12 rounded-none bg-surface border border-border/50 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-ink" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-medium text-ink">Facebook</h3>
              </div>
              <ArrowUpRight className="absolute bottom-8 right-8 w-6 h-6 text-blue-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out" />
            </motion.a>

            {/* Instagram */}
            <motion.a 
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="md:col-span-1 rounded-none bg-surface/30 border border-border/50 hover:bg-surface/60 transition-all p-8 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/20 blur-[60px] rounded-none pointer-events-none group-hover:opacity-100 transition-opacity opacity-0"></div>
              <div className="w-12 h-12 rounded-none bg-surface border border-border/50 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-ink" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-medium text-ink">Instagram</h3>
              </div>
              <ArrowUpRight className="absolute bottom-8 right-8 w-6 h-6 text-pink-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out" />
            </motion.a>

            {/* Tiktok */}
            <motion.a 
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="md:col-span-1 rounded-none bg-surface/30 border border-border/50 hover:bg-surface/60 transition-all p-8 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/20 blur-[60px] rounded-none pointer-events-none group-hover:opacity-100 transition-opacity opacity-0"></div>
              <div className="w-12 h-12 rounded-none bg-surface border border-border/50 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-ink" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.15 4.39-2.91 5.79-1.84 1.43-4.32 1.83-6.52 1.25-2.09-.55-3.88-2.07-4.68-4.07-.79-1.99-.6-4.35.45-6.2 1.09-1.93 3.12-3.32 5.31-3.6 1.08-.14 2.18-.08 3.23.2v4.18c-.89-.25-1.86-.23-2.73.08-.85.31-1.61.96-2.01 1.75-.41.8-.41 1.76-.03 2.56.39.81 1.15 1.45 2.02 1.71.93.28 1.96.18 2.82-.24.77-.38 1.4-1.07 1.66-1.89.24-.76.24-1.58.24-2.37.01-4.73-.01-9.45.01-14.18z"/></svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-medium text-ink">TikTok</h3>
              </div>
              <ArrowUpRight className="absolute bottom-8 right-8 w-6 h-6 text-cyan-400 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out" />
            </motion.a>

          </div>
        </section>

        {/* Large Feature / Security (Phantom style) */}
        <section id="security" className="py-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="max-w-6xl mx-auto bg-gradient-to-br from-surface to-paper rounded-none p-10 md:p-20 border border-border/50 text-center flex flex-col items-center relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/10 blur-[120px] rounded-none pointer-events-none"></div>

            <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6 relative z-10">
              Controlled by you,<br /> secured by code.
            </h2>
            <p className="text-xl text-ink-subtle max-w-2xl mb-12 relative z-10">
              Every contract is built with security first. I follow strict testing 
              protocols and integrate with top-tier auditing workflows.
            </p>
            <a 
              href="#contact"
              className="px-8 py-4 rounded-none bg-ink text-paper hover:bg-ink-subtle font-sans text-base font-medium transition-transform active:scale-95 flex items-center gap-2 relative z-10"
            >
              See process <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </section>

      </main>

      {/* Ft1 Minimal Footer */}
      <footer id="contact" className="border-t border-border/30 mt-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex flex-col sm:flex-row justify-between items-center gap-8">
          
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-paper">
              <Terminal className="w-3 h-3" />
            </div>
            <span className="font-display font-medium text-ink">teichi.dev</span>
          </div>

          <div className="flex items-center gap-6 font-sans text-sm font-medium">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-ink-subtle hover:text-accent transition-colors flex items-center gap-1">
              Github <ArrowUpRight className="w-3 h-3 text-ink-muted" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-ink-subtle hover:text-accent transition-colors flex items-center gap-1">
              Twitter <ArrowUpRight className="w-3 h-3 text-ink-muted" />
            </a>
          </div>

        </div>
      </footer>
    </div>
  );
}
