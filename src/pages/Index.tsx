import React, { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Volume2,
  Music2,
  Lightbulb,
  PartyPopper,
  MoveRight,
  CalendarDays,
} from "lucide-react";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <HeroSection />

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-psyco-black-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-orange-500/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Newsletter Section */}
        <section
          id="newsletter"
          className="py-16 px-6 md:px-12 bg-psyco-black-light"
        >
          <div className="max-w-7xl mx-auto">
            <div className="glassmorphism p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Be the First to Experience the Adventure
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Join our exclusive beta waitlist to get early access to the
                game, exclusive content, and behind-the-scenes development
                updates directly in your inbox.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-lg w-full mx-auto">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-psyco-black-DEFAULT border-orange-500/50 flex-grow min-w-0"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition-colors whitespace-nowrap">
                  Join Beta
                </button>
              </div>

              <p className="text-gray-400 text-sm mt-4">
                We respect your privacy. No spam, just epic gaming updates.
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Index;
