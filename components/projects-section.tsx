"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "LexIntellect",
    description: "Developed an AI-driven legal assistant to streamline contract analysis and predict case outcomes. Integrated Huggingface datasets and web scraping tools to gather legal data, providing law firms with insights into case strength and potential legal risks.",
    image: "https://images.pexels.com/photos/8112199/pexels-photo-8112199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2&fit=crop",
    tags: ["Next.js", "TypeScript", "Flask", "TensorFlow", "Python3"],
    liveUrl: "",
    githubUrl: "https://github.com/srimadhavn/LexIntellect",
    category: "Web App",
  },
  {
    id: 2,
    title: "RuralRise",
    description: "Developed a platform to provide small-scale farmers with real-time, data-driven insights on water management, crop planning, and agricultural practices. Integrated AI models to offer advice on optimizing resource usage and improving crop yields.",
    image: "https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2&fit=crop",
    tags: ["Next.js", "Flask", "TensorFlow", "MongoDB", "PostgreSQL"],
    liveUrl: "",
    githubUrl: "",
    category: "AI/ML",
  },
  {
    id: 3,
    title: "Maddy's Cave",
    description: "Created a personal blog using Next.js and Tailwind CSS to share insights on web development, AI, and programming. Reached 500 monthly visitors by optimizing performance and providing relevant, developer-focused content.",
    image: "https://i.pinimg.com/736x/18/bf/d5/18bfd56bf338c12297c690bcdf3f9b5e.jpg",
    tags: ["Next.js", "Shadcn/UI", "Tailwind CSS", "Markdown"],
    liveUrl: "https://maddyscave.vercel.app/",
    githubUrl: "https://github.com/srimadhavn/Maddys-Cave",
    category: "Mobile App",
  },
  {
    id: 4,
    title: "Meowscape",
    description: "Developed a real-time, private messaging web app allowing two users to securely chat using their own login credentials. Built using the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.io for seamless real-time communication. The app emphasizes privacy, ensuring that conversations remain secure and confidential.",
    image: "https://images.pexels.com/photos/1111368/pexels-photo-1111368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2&fit=crop",
    tags: ["React", "Node", "Socket", "MongoDB", "Express"],
    liveUrl: "",
    githubUrl: "https://github.com/srimadhavn/meowscapeserver",
    category: "Mobile App",
  },
];

const categories = ["All", "Web App", "Mobile App", "AI/ML"];

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

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
      id="projects"
      ref={ref}
      className="py-20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are some of my recent projects. Each one was carefully crafted to solve specific problems and showcase different skills.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative h-60 w-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}