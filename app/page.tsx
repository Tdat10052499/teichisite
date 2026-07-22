"use client";

import { motion } from "framer-motion";
import { Terminal, ArrowUpRight, CheckCircle2, Shield, Zap, Code2, Globe } from "lucide-react";

/* Hallmark · macrostructure: Marquee Hero · theme: studied-DNA (source: https://phantom.com/) · nav: N1 Standard · footer: Ft1 Minimal */

const fadeInUp = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { type: "spring", stiffness: 200, damping: 20 } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-paper overflow-hidden">
      
      {/* N1 Standard Nav */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center justify-between px-6 py-4 md:px-10 md:py-6 border-b border-border/10 bg-paper/80 backdrop-blur-md sticky top-0 z-50"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-paper">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="font-display font-semibold text-lg tracking-tight">teichi.dev</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-medium">
          <a href="#features" className="text-ink hover:text-accent transition-colors">Features</a>
          <a href="#projects" className="text-ink hover:text-accent transition-colors">Projects</a>
          <a href="#security" className="text-ink hover:text-accent transition-colors">Security</a>
        </nav>
        
        <a 
          href="#contact" 
          className="px-5 py-2.5 rounded-full bg-ink text-paper hover:bg-ink-subtle font-sans text-sm font-medium transition-transform active:scale-95"
        >
          Get in touch
        </a>
      </motion.header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-10 pb-24">
        
        {/* H1 Marquee Hero */}
        <section className="py-20 md:py-32 flex flex-col items-center text-center relative z-0 overflow-hidden">
          
          {/* Animated Ambient Background */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full pointer-events-none z-0 flex items-center justify-center"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
                x: [0, 50, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[400px] h-[400px] bg-accent blur-3xl rounded-full opacity-50 translate-x-[-10%] translate-y-[-10%]" 
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.6, 0.4],
                x: [0, -60, 0],
                y: [0, 40, 0]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute w-[500px] h-[500px] bg-accent blur-3xl rounded-full opacity-40 translate-x-[10%] translate-y-[10%]" 
            />
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center max-w-4xl relative z-10"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-display font-semibold leading-[1.1] tracking-tight mb-6"
            >
              The Web3 developer <br />
              <span className="text-accent">that'll take you places.</span>
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
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-accent text-paper hover:bg-accent-hover font-sans text-base font-medium transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                View Projects
              </a>
              <a 
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-surface text-ink hover:bg-border font-sans text-base font-medium transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                Let's Build
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Visual Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 150, damping: 25 }}
            className="mt-20 w-full max-w-5xl aspect-video rounded-[2rem] bg-gradient-to-br from-surface to-paper border border-border/50 shadow-2xl overflow-hidden relative flex items-center justify-center group"
          >
            {/* Abstract geometric visualization to replace video */}
            <div className="absolute inset-0 bg-accent/5 opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-accent/20 blur-[100px] rounded-full"></div>
            <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-accent/20 blur-[100px] rounded-full"></div>
            
            <div className="relative z-10 flex flex-col items-center gap-6 p-8 rounded-2xl bg-paper/50 backdrop-blur-xl border border-border/50">
              <Code2 className="w-16 h-16 text-accent" />
              <div className="font-mono text-ink text-sm text-center">
                status: <span className="text-accent">synced</span><br/>
                block: 19482910
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features / Services (Phantom F3 style) */}
        <section id="features" className="py-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-semibold mb-4">Building tools <br className="md:hidden" />for everyone.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="bg-surface rounded-3xl p-10 md:p-14 border border-border/30 hover:border-accent/30 transition-colors group flex flex-col items-start"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-8 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-semibold mb-4">On-Chain Logic</h3>
              <p className="text-ink-subtle text-lg leading-relaxed flex-1">
                Secure, audited, and gas-optimized smart contracts. 
                From complex DeFi AMMs to cross-chain NFT bridges.
              </p>
              <ul className="mt-8 space-y-3 font-medium text-ink">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent"/> Solidity & Yul</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent"/> Foundry Testing</li>
              </ul>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="bg-surface rounded-3xl p-10 md:p-14 border border-border/30 hover:border-accent/30 transition-colors group flex flex-col items-start"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-8 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-semibold mb-4">Client / Frontend</h3>
              <p className="text-ink-subtle text-lg leading-relaxed flex-1">
                Pixel-perfect, highly responsive interfaces that bridge the gap 
                between complex protocols and everyday users.
              </p>
              <ul className="mt-8 space-y-3 font-medium text-ink">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent"/> React & Next.js</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent"/> viem & wagmi</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Large Feature / Security (Phantom style) */}
        <section id="security" className="py-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="max-w-6xl mx-auto bg-gradient-to-br from-surface to-paper rounded-[3rem] p-10 md:p-20 border border-border/50 text-center flex flex-col items-center relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/10 blur-[120px] rounded-full pointer-events-none"></div>

            <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6 relative z-10">
              Controlled by you,<br /> secured by code.
            </h2>
            <p className="text-xl text-ink-subtle max-w-2xl mb-12 relative z-10">
              Every contract is built with security first. I follow strict testing 
              protocols and integrate with top-tier auditing workflows.
            </p>
            <a 
              href="#contact"
              className="px-8 py-4 rounded-full bg-ink text-paper hover:bg-ink-subtle font-sans text-base font-medium transition-transform active:scale-95 flex items-center gap-2 relative z-10"
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
