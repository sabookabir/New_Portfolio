import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-base-950/80 backdrop-blur-xl border-b border-white/5 h-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-full">
          <div className="flex items-center justify-between h-full">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-black text-base-950 italic text-xl group-hover:rotate-6 transition-transform">
                K
              </div>
              <span className="text-xl font-bold text-white tracking-tight group-hover:text-primary transition-colors uppercase italic">Kabir Saboo</span>
            </Link>
            
            <div className="hidden md:block">
              <ul className="flex items-center space-x-10">
                <li><a href="#projects" className="nav-link">Projects</a></li>
                <li><a href="#skills" className="nav-link">Skills</a></li>
                <li><Link to="/login" className="nav-link">Admin</Link></li>
                <li>
                  <a href="#contact" className="px-6 py-2.5 bg-white text-base-950 font-bold rounded-xl hover:bg-primary transition-all">
                    Contact Me
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
