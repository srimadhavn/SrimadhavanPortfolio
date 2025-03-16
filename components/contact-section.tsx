"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useForm as useFormspree, ValidationError } from "@formspree/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { CheckCircle, Loader2, Mail, MapPin, Phone } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const [formspreeState, handleFormspreeSubmit] = useFormspree("xeoaqzpl")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await handleFormspreeSubmit({
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
      })

      if (formspreeState.succeeded) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        })
        form.reset()
      } else if (formspreeState.errors && formspreeState.errors.length > 0) {
        const errorMessage = formspreeState.errors.map((error) => error.message).join(", ")
        toast({
          title: "Form submission error",
          description:
            errorMessage || "There was an error sending your message. Please check your inputs and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Unexpected error during form submission:", error)
      toast({
        title: "Error",
        description: "There was an unexpected error sending your message. Please try again later.",
        variant: "destructive",
      })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const inputVariants = {
    focused: { scale: 1.02, transition: { duration: 0.3 } },
    unfocused: { scale: 1, transition: { duration: 0.3 } },
  }

  // If the form is successfully submitted
  if (formspreeState.succeeded) {
    return (
      <section id="contact" ref={ref} className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={successVariants} className="max-w-xl mx-auto">
            <Card className="shadow-lg overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60"
              />
              <CardContent className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                  className="bg-primary/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="h-10 w-10 text-primary" />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-2xl font-bold mb-4"
                >
                  Thank You!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-lg mb-6"
                >
                  Your message has been sent successfully. I'll get back to you as soon as possible.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Button onClick={() => window.location.reload()} className="mx-auto relative overflow-hidden group">
                    <span className="absolute right-full w-full h-full bg-primary/20 transform group-hover:translate-x-full transition-transform duration-500"></span>
                    Send Another Message
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" ref={ref} className="py-20 bg-muted/30" aria-label="Contact section">
      <div className="container mx-auto px-4">
        <AnimatePresence>
          {isInView && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl mx-auto">
              <motion.div variants={itemVariants} className="text-center mb-12">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-3xl md:text-4xl font-bold mb-4"
                >
                  Get In Touch
                </motion.h2>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "5rem" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-1 bg-primary mx-auto mb-6"
                  aria-hidden="true"
                />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg text-muted-foreground max-w-2xl mx-auto"
                >
                  Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
                </motion.p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                <motion.div variants={itemVariants} className="md:col-span-1">
                  <div className="space-y-6 md:space-y-8">
                    <motion.div variants={cardVariants} whileHover="hover">
                      <Card className="transition-all duration-300 overflow-hidden">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                          className="h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60"
                        />
                        <CardContent className="p-6 flex items-start gap-4">
                          <motion.div
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="bg-primary/10 p-3 rounded-full"
                          >
                            <Mail className="h-6 w-6 text-primary" />
                          </motion.div>
                          <div>
                            <h3 className="font-semibold mb-1">Email</h3>
                            <p className="text-muted-foreground mb-2">For general inquiries</p>
                            <a
                              href="mailto:srimadhavan@aol.com"
                              className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                            >
                              srimadhavan@aol.com
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div variants={cardVariants} whileHover="hover">
                      <Card className="transition-all duration-300 overflow-hidden">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.8, delay: 0.6 }}
                          className="h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60"
                        />
                        <CardContent className="p-6 flex items-start gap-4">
                          <motion.div
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="bg-primary/10 p-3 rounded-full"
                          >
                            <Phone className="h-6 w-6 text-primary" />
                          </motion.div>
                          <div>
                            <h3 className="font-semibold mb-1">Phone</h3>
                            <a
                              href="tel:+917845558595"
                              className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
                            >
                              +91 78455 58595
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div variants={cardVariants} whileHover="hover">
                      <Card className="transition-all duration-300 overflow-hidden">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.8, delay: 0.7 }}
                          className="h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60"
                        />
                        <CardContent className="p-6 flex items-start gap-4">
                          <motion.div
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="bg-primary/10 p-3 rounded-full"
                          >
                            <MapPin className="h-6 w-6 text-primary" />
                          </motion.div>
                          <div>
                            <h3 className="font-semibold mb-1">Location</h3>
                            <p>Chennai, IN</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="md:col-span-2">
                  <Card className="shadow-md overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className="h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60"
                    />
                    <CardContent className="p-6 sm:p-8">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" aria-label="Contact form">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem className="relative">
                                  <motion.div
                                    className="group relative z-0 transition-all duration-300"
                                    variants={inputVariants}
                                    animate={focusedField === "name" ? "focused" : "unfocused"}
                                  >
                                    <FormControl>
                                      <Input
                                        placeholder=" "
                                        {...field}
                                        id="name"
                                        aria-required="true"
                                        className="peer block w-full appearance-none border-0 border-b-2 border-primary/30 bg-transparent px-0 py-3 focus:border-primary focus:outline-none focus:ring-0"
                                        onFocus={() => setFocusedField("name")}
                                        onBlur={() => setFocusedField(null)}
                                      />
                                    </FormControl>
                                    <FormLabel
                                      htmlFor="name"
                                      className="absolute top-3 -z-10 origin-[0] transform text-base duration-300 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
                                    >
                                      Name
                                    </FormLabel>
                                    <motion.div
                                      className="h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"
                                      animate={{
                                        width: focusedField === "name" ? "100%" : "0%",
                                        transition: { duration: 0.3 },
                                      }}
                                    />
                                  </motion.div>
                                  <FormMessage className="mt-1 text-sm" />
                                  <ValidationError prefix="Name" field="name" errors={formspreeState.errors} />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem className="relative">
                                  <motion.div
                                    className="group relative z-0 transition-all duration-300"
                                    variants={inputVariants}
                                    animate={focusedField === "email" ? "focused" : "unfocused"}
                                  >
                                    <FormControl>
                                      <Input
                                        placeholder=" "
                                        {...field}
                                        id="email"
                                        type="email"
                                        aria-required="true"
                                        className="peer block w-full appearance-none border-0 border-b-2 border-primary/30 bg-transparent px-0 py-3 focus:border-primary focus:outline-none focus:ring-0"
                                        onFocus={() => setFocusedField("email")}
                                        onBlur={() => setFocusedField(null)}
                                      />
                                    </FormControl>
                                    <FormLabel
                                      htmlFor="email"
                                      className="absolute top-3 -z-10 origin-[0] transform text-base duration-300 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
                                    >
                                      Email
                                    </FormLabel>
                                    <motion.div
                                      className="h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"
                                      animate={{
                                        width: focusedField === "email" ? "100%" : "0%",
                                        transition: { duration: 0.3 },
                                      }}
                                    />
                                  </motion.div>
                                  <FormMessage className="mt-1 text-sm" />
                                  <ValidationError prefix="Email" field="email" errors={formspreeState.errors} />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem className="relative">
                                <motion.div
                                  className="group relative z-0 transition-all duration-300"
                                  variants={inputVariants}
                                  animate={focusedField === "subject" ? "focused" : "unfocused"}
                                >
                                  <FormControl>
                                    <Input
                                      placeholder=" "
                                      {...field}
                                      id="subject"
                                      aria-required="true"
                                      className="peer block w-full appearance-none border-0 border-b-2 border-primary/30 bg-transparent px-0 py-3 focus:border-primary focus:outline-none focus:ring-0"
                                      onFocus={() => setFocusedField("subject")}
                                      onBlur={() => setFocusedField(null)}
                                    />
                                  </FormControl>
                                  <FormLabel
                                    htmlFor="subject"
                                    className="absolute top-3 -z-10 origin-[0] transform text-base duration-300 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
                                  >
                                    Subject
                                  </FormLabel>
                                  <motion.div
                                    className="h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"
                                    animate={{
                                      width: focusedField === "subject" ? "100%" : "0%",
                                      transition: { duration: 0.3 },
                                    }}
                                  />
                                </motion.div>
                                <FormMessage className="mt-1 text-sm" />
                                <ValidationError prefix="Subject" field="subject" errors={formspreeState.errors} />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem className="relative mt-8">
                                <motion.div
                                  className="group relative z-0 transition-all duration-300"
                                  variants={inputVariants}
                                  animate={focusedField === "message" ? "focused" : "unfocused"}
                                >
                                  <FormControl>
                                    <Textarea
                                      placeholder=" "
                                      className="peer min-h-32 block w-full appearance-none border-0 border-b-2 border-primary/30 bg-transparent px-0 py-3 focus:border-primary focus:outline-none focus:ring-0 resize-none"
                                      {...field}
                                      id="message"
                                      aria-required="true"
                                      onFocus={() => setFocusedField("message")}
                                      onBlur={() => setFocusedField(null)}
                                    />
                                  </FormControl>
                                  <FormLabel
                                    htmlFor="message"
                                    className="absolute top-3 -z-10 origin-[0] transform text-base duration-300 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary"
                                  >
                                    Message
                                  </FormLabel>
                                  <motion.div
                                    className="h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"
                                    animate={{
                                      width: focusedField === "message" ? "100%" : "0%",
                                      transition: { duration: 0.3 },
                                    }}
                                  />
                                </motion.div>
                                <FormMessage className="mt-1 text-sm" />
                                <ValidationError prefix="Message" field="message" errors={formspreeState.errors} />
                              </FormItem>
                            )}
                          />
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                          >
                            <Button
                              type="submit"
                              className="w-full mt-8 relative overflow-hidden group bg-primary hover:bg-primary/90 transition-all duration-300"
                              disabled={formspreeState.submitting}
                              aria-label="Send message"
                            >
                              <motion.span
                                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{
                                  repeat: Number.POSITIVE_INFINITY,
                                  repeatType: "loop",
                                  duration: 2,
                                  ease: "linear",
                                  repeatDelay: 0.5,
                                }}
                              />
                              {formspreeState.submitting ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Sending...
                                </>
                              ) : (
                                "Send Message"
                              )}
                            </Button>
                          </motion.div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

