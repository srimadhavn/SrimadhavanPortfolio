"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Testimonial = {
  id: number;
  name: string;
  position: string;
  company: string;
  image: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO",
    company: "TechStart Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    quote: "Working with this developer was an absolute pleasure. They delivered our project on time and exceeded our expectations in terms of quality and functionality. Their attention to detail and problem-solving skills are exceptional.",
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Product Manager",
    company: "InnovateSoft",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    quote: "I've worked with many developers over the years, but few have demonstrated the level of expertise and dedication that I experienced with this professional. They not only understood our technical requirements but also provided valuable insights that improved our product.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Marketing Director",
    company: "GrowthBrand",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    quote: "Our website redesign project was handled with exceptional skill and professionalism. The developer was responsive, creative, and delivered a final product that has significantly improved our user engagement and conversion rates.",
  },
  {
    id: 4,
    name: "David Wilson",
    position: "CTO",
    company: "FutureTech Solutions",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    quote: "The technical expertise and problem-solving abilities demonstrated throughout our project were impressive. The developer quickly understood our complex requirements and delivered a robust solution that has been critical to our business operations.",
  },
];

export default function TestimonialsSection() {
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
      id="testimonials"
      ref={ref}
      className="py-20 bg-muted/30"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here's what some of my clients have to say about working with me.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 p-2">
                    <Card className="h-full">
                      <CardContent className="p-6 flex flex-col h-full">
                        <Quote className="h-8 w-8 text-primary mb-4" />
                        <p className="italic mb-6 flex-grow">{testimonial.quote}</p>
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              fill
                              sizes="3rem"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold">{testimonial.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.position}, {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8 gap-4">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}