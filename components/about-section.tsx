"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Lightbulb, Users } from "lucide-react";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 bg-muted/30"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground">
              Get to know more about me, my background, and what drives me.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://i.pinimg.com/736x/40/dd/18/40dd18e13f80c671c7a3d043902a34af.jpg"
                  alt="About Me"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -z-10 -inset-4 blur-3xl opacity-20 bg-primary rounded-full"></div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-4">
                I'm <span className="text-primary">Srimadhavan G</span>, a passionate Full-Stack Developer and Machine learning enthusiast.
              </h3>
              <p className="mb-4">
               I specialize in creating responsive, user-friendly applications that solve real-world problems. I prefer integrating the latest technologies to build scalable, secure, and efficient applications.
              </p>
              <p className="mb-6">
                I'm pursuing a Bachelor's degree in Computer Science from SRM University. When I'm not coding, you can find me sleeping, reading self-help books, or playing video games.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Code className="h-8 w-8 text-primary mb-2" />
                    <h4 className="font-semibold">Clean Code</h4>
                    <p className="text-sm text-muted-foreground">
                      I write clean, maintainable code that follows best practices.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Lightbulb className="h-8 w-8 text-primary mb-2" />
                    <h4 className="font-semibold">Problem Solver</h4>
                    <p className="text-sm text-muted-foreground">
                      I enjoy tackling complex problems with creative solutions with less time complexity.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Users className="h-8 w-8 text-primary mb-2" />
                    <h4 className="font-semibold">Team Player</h4>
                    <p className="text-sm text-muted-foreground">
                      I love working in teams as i can connect with different people with great minds!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}