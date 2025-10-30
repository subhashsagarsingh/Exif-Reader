import React, { useState } from "react";
import { Twitter, Mail, Github, Linkedin } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    // Simulate subscription
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-gray-900 text-gray-200 pt-10 pb-6 mt-auto w-full">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Meta<span className="text-blue-600">Lens!</span> </h2>
          <p className="text-gray-400 text-sm">
            Easily analyze image metadata and export reports. Stay updated by subscribing below.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-blue-400 transition">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-gray-100 transition">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="md:col-span-2 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-2">Subscribe to our newsletter</h3>
          <p className="text-gray-400 text-sm mb-4">
            Get tips, updates, and insights on managing your EXIF data.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg text-gray-400 border bg-gray-900 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              <Mail className="w-4 h-4" />
              Subscribe
            </button>
          </form>
          {subscribed && (
            <p className="text-green-400 mt-2 text-sm">Subscribed successfully!</p>
          )}
        </div>

      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-500 text-xs mt-8">
        &copy; {new Date().getFullYear()} MetaLens. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
