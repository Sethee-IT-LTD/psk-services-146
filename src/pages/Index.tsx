import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setStatus({ type: "error", message: "Please enter your email address" });
      return;
    }

    setIsLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // Check if the response is empty
      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        console.error("Failed to parse response:", text);
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: Something went wrong`);
      }

      setStatus({ type: "success", message: data.message });
      setEmail(""); // Clear the input on success
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to subscribe",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                Be the First to Experience Elysium Descent
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Join our exclusive beta waitlist to get early access to the
                game, exclusive content, and behind-the-scenes development
                updates directly in your inbox.
              </p>

              <form
                onSubmit={handleSubscribe}
                className="max-w-lg w-full mx-auto"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="bg-psyco-black-DEFAULT border-orange-500/50 flex-grow min-w-0 text-black placeholder-gray-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition-colors whitespace-nowrap ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? "Joining..." : "Join Beta"}
                  </button>
                </div>

                {status.message && (
                  <p
                    className={`mt-4 ${
                      status.type === "success"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {status.message}
                  </p>
                )}
              </form>

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
