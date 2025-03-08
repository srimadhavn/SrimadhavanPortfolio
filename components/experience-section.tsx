"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, GraduationCap } from "lucide-react";

type Experience = {
  id: number;
  title: string;
  company: string;
  location: string;
  date: string;
  description: string[];
  type: "work" | "education";
  skills?: string[];
};

const experiences: Experience[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "San Francisco, CA",
    date: "Jan 2022 - Present",
    description: [
      "Lead a team of 5 developers in building and maintaining multiple client-facing web applications",
      "Implemented modern frontend architecture using Next.js, resulting in a 40% improvement in page load times",
      "Collaborated with UX designers to create intuitive user interfaces and seamless user experiences",
      "Mentored junior developers and conducted code reviews to ensure code quality and best practices",
    ],
    type: "work",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
  },
  {
    id: 2,
    title: "Full-Stack Developer",
    company: "Digital Innovations",
    location: "Remote",
    date: "Mar 2020 - Dec 2021",
    description: [
      "Developed and maintained full-stack web applications for clients in various industries",
      "Built RESTful APIs and integrated third-party services to enhance application functionality",
      "Implemented responsive designs and ensured cross-browser compatibility",
      "Participated in agile development processes, including daily stand-ups and sprint planning",
    ],
    type: "work",
    skills: ["JavaScript", "Node.js", "Express", "MongoDB", "React"],
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "WebCraft Studios",
    location: "Boston, MA",
    date: "Jun 2018 - Feb 2020",
    description: [
      "Created responsive and interactive user interfaces for web applications",
      "Collaborated with backend developers to integrate frontend components with APIs",
      "Optimized website performance and improved SEO rankings",
      "Participated in user testing and implemented feedback to enhance user experience",
    ],
    type: "work",
    skills: ["HTML/CSS", "JavaScript", "React", "SASS", "Webpack"],
  },
  {
    id: 4,
    title: "Bachelor of Science in Computer Science",
    company: "University of Technology",
    location: "Boston, MA",
    date: "Sep 2014 - May 2018",
    description: [
      "Graduated with honors (GPA: 3.8/4.0)",
      "Specialized in Web Development and Software Engineering",
      "Completed a capstone project developing a full-stack e-commerce platform",
      "Participated in hackathons and coding competitions",
    ],
    type: "education",
  },
];

export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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
      id="experience"
      ref={ref}
      className="py-20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience & Education</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My professional journey and educational background that have shaped my career.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="absolute left-0 md:left-1/2 top-0 w-6 h-6 rounded-full bg-primary transform -translate-x-1/2 flex items-center justify-center">
                    {exp.type === "work" ? (
                      <Briefcase className="h-3 w-3 text-primary-foreground" />
                    ) : (
                      <GraduationCap className="h-3 w-3 text-primary-foreground" />
                    )}
                  </div>

                  <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"} pl-10 md:pl-0`}>
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <CardDescription>{exp.date}</CardDescription>
                        </div>
                        <CardTitle>{exp.title}</CardTitle>
                        <CardDescription className="text-base font-medium">
                          {exp.company} • {exp.location}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                          {exp.description.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                        {exp.skills && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {exp.skills.map((skill) => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}