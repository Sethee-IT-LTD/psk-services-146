import React from "react";
import { NavLink } from "react-router-dom";
import { Mail, Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-orange-500/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 relative">
                <img
                  src="/elysium_descent_mini_logo.png"
                  alt="Elysium Descent Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-500">
                Elysium Descent
              </h2>
            </div>
            <p className="text-gray-300 max-w-md">
              An epic 3D RPG where your legend is carved in stone. Descend into
              ever-changing dungeons, unearth legendary loot, and build a legacy
              that will last forever.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-medium mb-4 pb-2 border-b border-orange-500/10">
              Contact Us
            </h3>
            <ul className="space-y-4">
              {/*<li className="flex items-center space-x-3 text-gray-300">
                <Mail size={16} className="text-orange-500" />
                <span>psk-services@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-300">
                <Facebook size={16} className="text-orange-500" />
                <a
                  href="https://www.facebook.com/psicptyk.free"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors"
                >
                  facebook.com/psicptyk.free
                </a>
              </li>*/}
              <li className="flex items-center space-x-3 text-gray-300">
                <img
                  src="/x.svg"
                  alt="X (Twitter)"
                  className="w-4 h-4 text-orange-500"
                />
                <a
                  href="https://x.com/elysium_descent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors"
                >
                  @elysium_descent
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-300">
                <img
                  src="/discord.svg"
                  alt="Elysium Descent discord channel"
                  className="w-6 h-6 text-orange-500"
                />
                <a
                  href="https://discord.gg/Ckd3rBn89s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-orange-500/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Elysium Descent. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <NavLink
              to="/privacy-policy"
              className="text-gray-400 hover:text-orange-400 text-sm transition-colors"
            >
              Privacy Policy
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
