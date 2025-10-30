import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactCards = [
    {
      icon: <MapPin className="w-10 h-10 text-blue-600" />,
      title: "Our Office",
      desc: "1234 Photography St, Image City, PC 56789",
      gradient: "from-blue-100 to-blue-50",
    },
    {
      icon: <Phone className="w-10 h-10 text-green-600" />,
      title: "Call Us",
      desc: "+1 234 567 890",
      gradient: "from-green-100 to-green-50",
    },
    {
      icon: <Mail className="w-10 h-10 text-purple-600" />,
      title: "Email Us",
      desc: "support@metalens.com",
      gradient: "from-purple-100 to-purple-50",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <main className="flex-1 pt-28 px-6 lg:px-12 relative overflow-hidden pb-24">
        {/* Background Decorations */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-40 -z-10"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-30 -z-10"></div>

        {/* Header Section */}
        <div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r bg-clip-text mb-4">
            Contact
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            We’d love to hear from you! Whether you have questions, feedback, or collaboration ideas,
            our team is just one message away.
          </p>
        </div>

        {/* Contact Section */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left: Contact Info Cards */}
          <div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.2 },
              },
            }}
            className="flex flex-col gap-6"
          >
            {contactCards.map((item, index) => (
              <div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className={` rounded-2xl p-6 flex items-center gap-5 border border-gray-200 transition`}
              >
                <div className="flex-shrink-0 bg-white p-3 rounded-xl shadow-sm">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-xl text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Contact Form */}
          <div
            className="bg-white/90 backdrop-blur-md  border border-gray-200 p-10 rounded-2xl"
          >
            <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 "
                required
              />
              <input
                whileFocus={{ scale: 1.02 }}
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                required
              />
              <textarea
                whileFocus={{ scale: 1.02 }}
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 "
                rows="5"
                required
              />

              <button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-xl font-medium shadow-lg transition"
              >
                {submitted ? "Message Sent!" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
