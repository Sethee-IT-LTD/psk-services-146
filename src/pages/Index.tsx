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

  const featuredServices = [
    {
      title: "Sound System",
      description:
        "Professional sound systems for any size venue, from small gatherings to large festivals.",
      icon: <Volume2 size={24} />,
      imageSrc: "/lovable-uploads/708f9e32-840d-46a4-aaa4-75ad2689e16f.png",
      link: "/services#sound",
    },
    {
      title: "Lighting Equipment",
      description:
        "Create the perfect atmosphere with our state-of-the-art lighting equipment and expert setup.",
      icon: <Lightbulb size={24} />,
      imageSrc: "/lovable-uploads/becfc2e3-b59f-4f86-afca-b9f6fc7b7c14.png",
      link: "/services#lighting",
    },
    {
      title: "DJ Services",
      description:
        "Experienced DJs to keep your event energized with the perfect music selection.",
      icon: <Music2 size={24} />,
      imageSrc: "/lovable-uploads/03e83f18-76a1-4349-a197-dbde03a93343.png",
      link: "/services#dj",
    },
  ];

  return (
    <div>
      <HeroSection />

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-psyco-black-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-orange-500/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Newsletter Section */}
        <section id="newsletter" className="py-16 px-6 md:px-12 bg-psyco-black-light">
          <div className="max-w-7xl mx-auto">
            <div className="glassmorphism p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Stay Updated with Industry Insights
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Subscribe to our newsletter to receive the latest articles,
                tips, and industry news directly in your inbox.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-psyco-black-DEFAULT border-orange-500/50 flex-grow"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>

              <p className="text-gray-400 text-sm mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Index;
