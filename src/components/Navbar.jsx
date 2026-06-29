import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HeartPulse, PhoneCall } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated'); // keeping it for backward compatibility
    window.location.href = '/login';
  };

  const isActive = (path) => location.pathname === path;
  const linkClass = (path) => 
    `text-sm font-semibold transition-colors h-full flex items-center ${isActive(path) ? 'text-primary border-b-[3px] border-primary' : 'text-foreground/80 hover:text-primary'}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-8 h-8 text-primary" />
          <span className="font-['Playfair_Display'] font-bold text-2xl tracking-tight text-foreground">
            Pulse Life Care Hospital
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 h-full">
          <Link to="/dashboard" className={linkClass('/dashboard')}>Dashboard</Link>
          <Link to="/our-branches" className={linkClass('/our-branches')}>Our Hospitals</Link>
          <Link to="/doctors" className={linkClass('/doctors')}>Doctors</Link>
          <Link to="/specialities" className={linkClass('/specialities')}>Body Navigator</Link>
          <Link to="/health-checks" className={linkClass('/health-checks')}>Health Checks</Link>
          <Link to="/reports" className={linkClass('/reports')}>Reports</Link>
        </nav>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLogout} 
            className="text-sm font-semibold text-muted-foreground hover:text-foreground hidden sm:block px-4 py-2 cursor-pointer transition-colors"
          >
            Logout
          </button>
          <a href="tel:911" className="flex items-center gap-3 bg-[#e11d48] hover:bg-[#be123c] text-white px-8 py-3.5 rounded-full font-black text-lg transition-all shadow-[0_0_20px_rgba(225,29,72,0.5)] hover:shadow-[0_0_30px_rgba(225,29,72,0.8)] hover:-translate-y-1 cursor-pointer tracking-widest border-2 border-[#e11d48] hover:border-white/50">
            <PhoneCall className="w-5 h-5 animate-pulse" />
            <span>EMERGENCY</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
