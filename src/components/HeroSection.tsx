import React, { useEffect, useRef } from "react";
import "./HeroSection.css";
import { MoveRight, Sparkles, Gamepad2, Sword } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;

      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      backgroundRef.current.style.transform = `translate(${x * -15}px, ${y * -15}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <img
          src="/elysium-quest.gif"
          className="absolute inset-0 w-full h-full object-cover gif-reverse"
          alt=""
        />
      </div>

      {/* Background Elements */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 z-0 transition-transform duration-500 ease-out sm:z-20"
        style={{ willChange: "transform" }}
      >
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-orange-400/5 rounded-full blur-3xl"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-20 hidden lg:block">
        <Gamepad2 className="h-12 w-12 text-orange-500/30" />
      </div>
      <div className="absolute bottom-1/4 right-20 hidden lg:block">
        <Sword className="h-16 w-16 text-orange-500/30" />
      </div>

      <div className="container mx-auto px-6 relative z-30">
        <div className="flex flex-col items-center">
          <div className="max-w-2xl">
            <div className="flex items-center mb-4">
              <div className="bg-orange-500/20 text-orange-400 rounded-full px-4 py-1 text-sm font-medium inline-flex items-center">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                Epic 3D RPG Adventure
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-glow mb-6">
              Your Legend <span className="text-orange-500">Carved</span> in
              Stone.
            </h1>

            <p className="text-xl text-gray-300 mb-8">
              Brave ever-changing dungeons and battle fabled beasts to unearth
              verifiably rare loot. In a world where every deed is permanent,
              what will your legend be?
            </p>

            <div className="flex justify-center">
              <a
                href="#newsletter"
                className="bg-orange-500 hover:bg-orange-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center btn-glow"
              >
                Join Beta Waitlist
                <MoveRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
