"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Code,
  Server,
  Terminal,
  Layers,
  FileCode,
  Cpu,
  Database,
  Globe,
  PenTool,
  GitBranch,
  Cloud,
  Workflow,
  TestTube,
  Figma,
  Users,
} from "lucide-react"

type Skill = {
  name: string
  level: number
  icon: React.ReactNode
  description: string
}

type SkillCategory = {
  name: string
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      {
        name: "HTML/CSS",
        level: 95,
        icon: <FileCode className="h-5 w-5" />,
        description: "Expert in semantic HTML and modern CSS including Flexbox, Grid, and animations.",
      },
      {
        name: "JavaScript",
        level: 90,
        icon: <Code className="h-5 w-5" />,
        description: "Strong knowledge of ES6+, async/await, and modern JavaScript patterns.",
      },
      {
        name: "TypeScript",
        level: 85,
        icon: <Code className="h-5 w-5 text-blue-500" />,
        description: "Proficient with type systems, interfaces, and advanced TypeScript features.",
      },
      {
        name: "React",
        level: 90,
        icon: <Layers className="h-5 w-5 text-blue-400" />,
        description: "Expert in React hooks, context API, and performance optimization.",
      },
      {
        name: "Next.js",
        level: 85,
        icon: <Layers className="h-5 w-5" />,
        description: "Experienced with App Router, Server Components, and full-stack Next.js applications.",
      },
      {
        name: "Tailwind CSS",
        level: 90,
        icon: <PenTool className="h-5 w-5 text-teal-500" />,
        description: "Advanced usage of Tailwind for responsive, maintainable UI development.",
      },
    ],
  },
  {
    name: "Backend",
    skills: [
      {
        name: "Node.js",
        level: 85,
        icon: <Server className="h-5 w-5 text-green-500" />,
        description: "Proficient in building scalable server-side applications with Node.js.",
      },
      {
        name: "Express",
        level: 80,
        icon: <Server className="h-5 w-5" />,
        description: "Experienced in creating RESTful APIs and middleware with Express.",
      },
      {
        name: "Python",
        level: 75,
        icon: <Terminal className="h-5 w-5 text-yellow-500" />,
        description: "Solid foundation in Python for backend development and Machine learning.",
      },
      {
        name: "flask",
        level: 70,
        icon: <Globe className="h-5 w-5 text-green-600" />,
        description: "Working knowledge of flask for full-stack web applications.",
      },
      {
        name: "RESTful APIs",
        level: 90,
        icon: <Globe className="h-5 w-5" />,
        description: "Expert in designing and implementing RESTful API architectures.",
      },
      {
        name: "SQL",
        level: 80,
        icon: <Database className="h-5 w-5 text-blue-600" />,
        description: "Strong database design skills and query optimization experience.",
      },
    ],
  },
  {
    name: "Tools",
    skills: [
      {
        name: "Git/GitHub",
        level: 90,
        icon: <GitBranch className="h-5 w-5 text-orange-500" />,
        description: "Advanced Git workflow knowledge including branching strategies and CI integration.",
      },
      {
        name: "Docker",
        level: 75,
        icon: <Cpu className="h-5 w-5 text-blue-500" />,
        description: "Experienced with containerization, Docker Compose, and multi-container applications.",
      },
      {
        name: "AWS",
        level: 70,
        icon: <Cloud className="h-5 w-5 text-yellow-600" />,
        description: "Working knowledge of EC2, S3, Lambda, and other AWS services.",
      },
      {
        name: "CI/CD",
        level: 75,
        icon: <Workflow className="h-5 w-5 text-green-500" />,
        description: "Proficient with GitHub Actions, Jenkins, and automated deployment pipelines.",
      },

      
    ],
  },
]


const CircularProgress = ({ value, size = 120, strokeWidth = 8, isAnimating = false, isHovered = false }: { value: number, size?: number, strokeWidth?: number, isAnimating?: boolean, isHovered?: boolean }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted opacity-20"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          className={`text-primary ${isHovered ? "drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" : ""}`}
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset: isAnimating ? strokeDashoffset : circumference,
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className={`text-xl font-bold ${isHovered ? "text-primary scale-110" : ""} transition-all duration-300`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isAnimating ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {value}%
        </motion.span>
      </div>
    </div>
  )
}

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="skills" ref={ref} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I've developed a diverse set of skills throughout my career. Here's a comprehensive overview of my
              technical abilities.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Tabs defaultValue="Frontend" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                {skillCategories.map((category) => (
                  <TabsTrigger key={category.name} value={category.name}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {skillCategories.map((category) => (
                <TabsContent key={category.name} value={category.name}>
                  <Card>
                    <CardContent className="pt-6 pb-8">
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8"
                      >
                        {category.skills.map((skill) => (
                          <TooltipProvider key={skill.name}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <motion.div
                                  variants={itemVariants}
                                  className="flex flex-col items-center justify-center gap-3"
                                  onMouseEnter={() => setHoveredSkill(skill.name)}
                                  onMouseLeave={() => setHoveredSkill(null)}
                                >
                                  <CircularProgress
                                    value={skill.level}
                                    isAnimating={isInView}
                                    isHovered={hoveredSkill === skill.name}
                                  />
                                  <div className="flex flex-col items-center text-center">
                                    <div className="flex items-center gap-2 mb-1">
                                      {skill.icon}
                                      <h3 className="font-medium">{skill.name}</h3>
                                    </div>
                                  </div>
                                </motion.div>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs">
                                <p>{skill.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </motion.div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Projects Completed", value: "20+", caption: "No bugs, just 'undocumented features'" },
              { name: "Years Experience", value: "2+", caption: "I'm so old!" },
              { name: "Coding Solutions", value: "30+", caption: "Some actually worked!" },
              { name: "Cups of Coffee", value: "1000+", caption: "Send caffeine, not flowers" },
            ].map((stat, index) => (
              <Card key={index} className="overflow-hidden group">
              <CardContent className="p-6 text-center relative">
                <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-primary/50"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                />
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mb-1">{stat.name}</p>
              </CardContent>
              </Card>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

