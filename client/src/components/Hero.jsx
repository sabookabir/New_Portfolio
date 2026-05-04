import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-base-950">
      {/* Subtle Background Glows */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[11px] font-bold text-surface-400 tracking-widest uppercase">Available for New Projects</span>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.9] mb-8">
              Building <br />
              <span className="text-primary glow-text">Premium</span> <br />
              Software.
            </h1>
            
            <p className="text-lg md:text-xl text-surface-400 mb-10 max-w-xl leading-relaxed">
              I'm Kabir Saboo, a Full-Stack Engineer who specializes in creating high-end, performance-optimized web applications with a modern touch.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <a href="#projects" className="btn-primary group">
                View My Work
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </a>
              <a href="#contact" className="btn-secondary">
                Get In Touch
              </a>
            </div>

            <div className="mt-16 flex items-center gap-10 opacity-30">
              <div className="h-[1px] w-20 bg-white"></div>
              <div className="flex gap-6">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Architecture</span>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Design</span>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Scale</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Modern Tech Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="hidden lg:flex justify-end relative"
          >
            <div className="relative w-full max-w-md aspect-square glass-card p-8 group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="flex items-center gap-2 mb-10">
                <div className="w-3 h-3 rounded-full bg-secondary"></div>
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <div className="w-3 h-3 rounded-full bg-surface-700"></div>
              </div>

              <div className="space-y-6">
                <div className="h-4 w-1/3 bg-white/10 rounded-full"></div>
                <div className="h-4 w-3/4 bg-white/5 rounded-full"></div>
                
                <div className="mt-12 grid grid-cols-2 gap-4">
                  <div className="aspect-square glass-card bg-white/5 flex items-center justify-center p-6 border-white/5">
                    <div className="w-16 h-16 rounded-full border-4 border-white/5 border-t-primary animate-spin"></div>
                  </div>
                  <div className="aspect-square glass-card bg-gradient-to-br from-secondary/20 to-transparent p-6 border-secondary/20">
                    <div className="h-2 w-full bg-white/20 rounded-full mb-3"></div>
                    <div className="h-2 w-1/2 bg-white/20 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8 p-4 bg-white/5 rounded-xl border border-white/10 font-mono text-[10px] text-surface-400">
                <div className="flex justify-between mb-2">
                  <span className="text-primary font-bold">Status: Online</span>
                  <span className="opacity-50">v4.0.2</span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
