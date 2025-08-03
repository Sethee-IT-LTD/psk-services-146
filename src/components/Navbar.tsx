import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    {
      name: "Discord",
      path: "https://discord.gg/Ckd3rBn89s",
      icon: (
        <img
          src="/discord.svg"
          alt="Discord"
          className="w-6 h-6 brightness-0 invert hover:brightness-100 hover:invert-0 transition-all"
        />
      ),
    },
    {
      name: "X",
      path: "https://x.com/elysium_descent",
      icon: (
        <img
          src="/x.svg"
          alt="X (Twitter)"
          className="w-5 h-5 brightness-0 invert hover:brightness-100 hover:invert-0 transition-all"
        />
      ),
    },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12",
        scrolled ? "glassmorphism bg-opacity-80" : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <NavLink to="/" className="flex items-center">
          <div className="h-20 w-auto md:h-28 md:w-auto relative">
            <img
              src="/lovable-uploads/cc8f63cf-a7a4-45e4-bf9f-d53b4d733d70.png"
              alt="PSK Services Logo"
              className="h-full w-auto object-contain"
            />
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-orange-400 transition-colors duration-300 link-hover text-sm font-medium tracking-wide"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-white hover:text-orange-400 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 glassmorphism pt-24 px-8 transition-all duration-300 ease-in-out transform md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-orange-400 py-2 text-xl transition-colors duration-300"
            >
              <div className="flex items-center gap-2">
                {link.icon}
                <span>{link.name}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
