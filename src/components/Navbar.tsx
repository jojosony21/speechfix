import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed w-full z-30 top-0 text-white bg-neutral-900 shadow-lg">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between py-2 px-4 md:px-6">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold tracking-tight flex items-center">
            <span className="text-blue-500">Speech</span><span className="text-green-400">Emotion</span>
            <span className="ml-1 bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text">AI</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button 
            onClick={toggleMenu}
            className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-blue-500 hover:border-blue-500" 
            aria-label="Toggle mobile menu" 
            aria-expanded={isMenuOpen}
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:items-center md:w-auto w-full">
          <ul className="md:flex flex-col md:flex-row items-center justify-between text-base text-neutral-100 pt-4 md:pt-0">
            <li><Link className="inline-block py-2 px-4 hover:text-blue-400 transition duration-300" to="/">Home</Link></li>
            <li><Link className="inline-block py-2 px-4 hover:text-blue-400 transition duration-300" to="/features">Features</Link></li>
            <li><Link className="inline-block py-2 px-4 hover:text-blue-400 transition duration-300" to="/audio-recording">Record Audio</Link></li>
            <li><Link className="inline-block py-2 px-4 hover:text-blue-400 transition duration-300" to="/emotion-analysis">Analysis</Link></li>
            <li><Link className="inline-block py-2 px-4 ml-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition duration-300" to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className={`bg-neutral-800 md:hidden w-full ${isMenuOpen ? 'block' : 'hidden'}`}>
        <ul className="px-4 py-2">
          <li><Link className="block py-2 px-4 hover:text-blue-400 transition duration-300" to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link className="block py-2 px-4 hover:text-blue-400 transition duration-300" to="/features" onClick={toggleMenu}>Features</Link></li>
          <li><Link className="block py-2 px-4 hover:text-blue-400 transition duration-300" to="/audio-recording" onClick={toggleMenu}>Record Audio</Link></li>
          <li><Link className="block py-2 px-4 hover:text-blue-400 transition duration-300" to="/emotion-analysis" onClick={toggleMenu}>Analysis</Link></li>
          <li><Link className="block py-2 px-4 my-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-center transition duration-300" to="/contact" onClick={toggleMenu}>Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;