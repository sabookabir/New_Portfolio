const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-base-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <div className="text-xl font-black text-white italic mb-2 uppercase">Kabir Saboo</div>
            <div className="text-sm text-surface-500 font-medium">
              &copy; {new Date().getFullYear()} Build with Excellence. All rights reserved.
            </div>
          </div>
          
          <div className="flex items-center gap-10 text-sm font-bold uppercase tracking-widest italic">
            <a href="https://www.linkedin.com/in/kabir-saboo-507129380/" target="_blank" rel="noreferrer" className="text-surface-500 hover:text-primary transition-all">LinkedIn</a>
            <a href="https://github.com/sabookabir" target="_blank" rel="noreferrer" className="text-surface-500 hover:text-primary transition-all">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
