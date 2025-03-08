"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Instagram, Linkedin, Code2 } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToNextSection = () => {
    if (scrollRef.current) {
      const nextSection = scrollRef.current.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="home"
      ref={scrollRef}
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-background/50 to-background"></div>
      </div>

      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
        <span className="block">Hi, I'm</span>
        <span className="text-primary bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-typing">
          Srimadhavan G
        </span>
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">
        Full-Stack Developer & AI/ML Enthusiast
          </h2>
          <p className="text-lg mb-8 max-w-lg mx-auto md:mx-0">
        I build scalable web applications leveraging machine learning to solve real-world problems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild size="lg">
              <a href="#contact">Get in Touch</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#projects">View My Work</a>
            </Button>
          </div>
          <div className="flex gap-4 mt-8 justify-center md:justify-start">
            <a
              href="https://github.com/srimadhavn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/srimadhavn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://leetcode.com/u/srimadhavn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Code2 className="h-6 w-6" />
              <span className="sr-only">LeetCode</span>
            </a>
            <a
              href="https://www.instagram.com/srimadhavn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mx-auto md:ml-auto"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/20">
            <Image
              src="https://i.pinimg.com/736x/71/42/d2/7142d2a4199e9d21647e4960488d8fb8.jpg"
              alt="Srimadhavan"
              fill
              sizes="(max-width: 768px) 16rem, (max-width: 1024px) 20rem, 24rem"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -z-10 inset-0 blur-3xl opacity-20 bg-primary rounded-full"></div>
        </motion.div>
      </div>

      <button
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown className="h-8 w-8" />
      </button>
    </section>
  );
}