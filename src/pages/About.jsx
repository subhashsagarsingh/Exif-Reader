// src/pages/About.jsx
import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { Camera, Target, Users, Globe } from "lucide-react";

const About = () => {
  const cardData = [
    {
      icon: <Camera className="w-10 h-10 text-blue-600" />,
      title: "What We Do",
      desc: "We help you uncover hidden metadata in your images — from camera settings to GPS coordinates.",
    },
    {
      icon: <Target className="w-10 h-10 text-purple-600" />,
      title: "Our Mission",
      desc: "To make image data analysis simple, accurate, and accessible for professionals and beginners alike.",
    },
    {
      icon: <Users className="w-10 h-10 text-green-600" />,
      title: "Who Uses MetaLens",
      desc: "From photographers to developers — anyone curious about the data behind digital images.",
    },
    {
      icon: <Globe className="w-10 h-10 text-yellow-600" />,
      title: "Our Vision",
      desc: "To become the most trusted and easy-to-use EXIF data platform across the globe.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <main className="flex-1 pt-32 pb-16 flex flex-col items-center w-full px-6">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl"
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r bg-clip-text  mb-4">
            About
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            MetaLens! is a next-generation EXIF Data Extractor designed for photographers,
            developers, and image enthusiasts. Our goal is to make image metadata easy to access,
            interpret, and use — empowering you to understand every detail behind your photos.
          </p>
        </motion.div>

        {/* Animated Cards Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl"
        >
          {cardData.map((item, index) => (
            <Card key={index} icon={item.icon} title={item.title} desc={item.desc} />
          ))}
        </motion.div>

        {/* Animated CTA Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mt-16 text-center bg-white/80 backdrop-blur-md border border-gray-200 p-10 rounded-3xl"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Why Choose <span className="">Meta</span><span className="text-blue-600">Lens?</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Unlike traditional tools, MetaLens offers a modern interface, instant analysis,
            and secure client-side processing — your data stays yours.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 border font-semibold py-3 px-6 rounded-lg transition"
          >
            Get Started
          </motion.button>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
