"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Phone, MapPin, Clock, Sparkles, Heart, Zap, Shield, Menu, X } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

// Typewriter Text Component
const TypewriterText = ({
  text,
  delay = 100,
  className = "",
  trigger = true,
  startDelay = 0,
}: { text: string; delay?: number; className?: string; trigger?: boolean; startDelay?: number }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!trigger) {
      setDisplayText("")
      setCurrentIndex(0)
      setHasStarted(false)
      return
    }

    if (!hasStarted) {
      const startTimeout = setTimeout(() => {
        setHasStarted(true)
      }, startDelay)
      return () => clearTimeout(startTimeout)
    }

    if (hasStarted && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, delay)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, delay, trigger, startDelay, hasStarted])

  return (
    <span className={className}>
      {displayText}
      {trigger && hasStarted && currentIndex < text.length && (
        <motion.span
          className="inline-block w-0.5 h-full bg-rose-gold ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        />
      )}
    </span>
  )
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
}

// Loading Screen Component
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-stone-50 via-white to-stone-100"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center space-y-8">
        <motion.div
          className="relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="w-24 h-24 mx-auto bg-rose-gold rounded-full flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Sparkles className="h-12 w-12 text-white" />
          </motion.div>
          <motion.div
            className="absolute inset-0 w-24 h-24 mx-auto border-4 border-rose-gold/30 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h1 className="text-4xl font-serif text-slate-800 mb-2">Serenity Medspa</h1>
          <p className="text-slate-600">Preparing your wellness journey...</p>
        </motion.div>

        <motion.div
          className="w-64 h-1 bg-stone-200 rounded-full mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="h-full bg-rose-gold rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, delay: 1 }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function MedspaLanding() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <AnimatePresence>{isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}</AnimatePresence>

      <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
        {/* Sticky Header */}
        <motion.header
          className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-white/90 border-b border-stone-200/50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? -20 : 0 }}
          transition={{ duration: 0.6, delay: isLoading ? 0 : 0.5 }}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-10 h-10 bg-rose-gold rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-serif text-slate-800">Serenity Medspa</span>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {["Services", "About", "Reviews", "Contact"].map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-slate-700 hover:text-rose-gold transition-colors font-medium relative group"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-gold transition-all group-hover:w-full"></span>
                  </motion.a>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}>
                  <Button className="bg-rose-gold hover:bg-rose-gold/90 text-white shadow-lg">Book Now</Button>
                </motion.div>

                {/* Mobile Menu Button */}
                <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  className="md:hidden mt-4 py-4 border-t border-stone-200"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="flex flex-col space-y-4">
                    {["Services", "About", "Reviews", "Contact"].map((item) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-slate-700 hover:text-rose-gold transition-colors font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                className="space-y-8"
                variants={staggerContainer}
                initial="initial"
                animate={isLoading ? "initial" : "animate"}
              >
                <div className="space-y-6">
                  <motion.div variants={fadeInUp}>
                    <Badge className="bg-stone-100 text-rose-gold border-0 px-4 py-2 text-sm font-medium">
                      <Sparkles className="h-4 w-4 mr-2 text-rose-gold" />
                      Premium Medical Spa Experience
                    </Badge>
                  </motion.div>

                  <motion.h1
                    className="text-6xl lg:text-7xl font-serif text-slate-800 leading-tight"
                    variants={fadeInUp}
                  >
                    <TypewriterText text="Rediscover Your" delay={100} trigger={!isLoading} startDelay={800} />
                    <motion.span
                      className="text-rose-gold block"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: isLoading ? 0 : 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    >
                      <TypewriterText text="Natural Beauty" delay={120} trigger={!isLoading} startDelay={2500} />
                    </motion.span>
                  </motion.h1>

                  <motion.p className="text-xl text-slate-600 leading-relaxed max-w-lg" variants={fadeInUp}>
                    Experience luxury wellness treatments designed to rejuvenate your skin, restore your confidence, and
                    enhance your natural radiance in our serene, state-of-the-art facility.
                  </motion.p>
                </div>

                <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeInUp}>
                  <Button
                    size="lg"
                    className="bg-rose-gold hover:bg-rose-gold/90 text-white px-10 py-6 text-lg shadow-xl hover:shadow-2xl transition-all"
                  >
                    Schedule Your Visit
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-rose-gold text-rose-gold hover:bg-rose-gold/10 px-10 py-6 text-lg bg-white/50 backdrop-blur"
                  >
                    Virtual Consultation
                  </Button>
                </motion.div>

                <motion.div className="flex items-center space-x-6 pt-4" variants={fadeInUp}>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0 : 1 }}
                        transition={{ duration: 0.3, delay: 1.2 + i * 0.1 }}
                      >
                        <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-slate-600 font-medium">4.9/5 from 200+ reviews</span>
                </motion.div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{
                  opacity: isLoading ? 0 : 1,
                  scale: isLoading ? 0.8 : 1,
                  rotate: 0,
                }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-stone-200 rounded-3xl transform rotate-3"
                  animate={{ rotate: [3, -3, 3] }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src="/velora.png"
                    alt="Luxurious spa treatment room with soft lighting and comfortable treatment bed"
                    width={600}
                    height={700}
                    className="object-cover w-full h-[600px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center space-y-6 mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-stone-100 text-rose-gold border-0 px-4 py-2">Our Signature Treatments</Badge>
              <h2 className="text-5xl font-serif text-slate-800">Transformative Wellness Services</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                From advanced skincare to body contouring, discover treatments tailored to your unique beauty goals with
                our expert practitioners.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: <Sparkles className="h-10 w-10 text-rose-gold" />,
                  title: "Advanced Facials",
                  description:
                    "HydraFacial, chemical peels, and customized treatments for radiant, healthy skin that glows from within.",
                  price: "Starting at $150",
                },
                {
                  icon: <Zap className="h-10 w-10 text-rose-gold" />,
                  title: "Laser Treatments",
                  description:
                    "Hair removal, skin resurfacing, and pigmentation correction with cutting-edge technology.",
                  price: "Starting at $200",
                },
                {
                  icon: <Heart className="h-10 w-10 text-rose-gold" />,
                  title: "Injectable Treatments",
                  description: "Botox, dermal fillers, and other non-surgical solutions for natural-looking results.",
                  price: "Starting at $300",
                },
                {
                  icon: <Shield className="h-10 w-10 text-rose-gold" />,
                  title: "Body Contouring",
                  description: "CoolSculpting and other non-invasive treatments to sculpt your ideal silhouette.",
                  price: "Starting at $500",
                },
                {
                  icon: <Sparkles className="h-10 w-10 text-rose-gold" />,
                  title: "Wellness IV Therapy",
                  description: "Vitamin infusions and hydration therapy for inner radiance and vitality.",
                  price: "Starting at $125",
                },
                {
                  icon: <Heart className="h-10 w-10 text-rose-gold" />,
                  title: "Massage Therapy",
                  description: "Therapeutic and relaxation massages in our tranquil treatment rooms.",
                  price: "Starting at $120",
                },
              ].map((service, index) => (
                <motion.div key={index} variants={scaleIn}>
                  <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-stone-50 backdrop-blur h-full group hover:scale-105">
                    <CardContent className="p-8 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="p-3 bg-white rounded-2xl group-hover:bg-rose-gold/10 transition-colors">
                          {service.icon}
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-rose-gold/10 text-rose-gold font-semibold border-rose-gold/20"
                        >
                          {service.price}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800">{service.title}</h3>
                      <p className="text-slate-700 leading-relaxed">{service.description}</p>
                      <Button
                        variant="outline"
                        className="w-full border-2 border-rose-gold/30 text-rose-gold hover:bg-rose-gold/10 bg-white backdrop-blur font-semibold"
                      >
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Treatment Gallery */}
        <section className="py-20 bg-stone-50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center space-y-6 mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-white text-rose-gold border-0 px-4 py-2">Our Treatments</Badge>
              <h2 className="text-4xl font-serif text-slate-800">Experience the Difference</h2>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  src: "/facial.jpg",
                  alt: "Professional facial treatment",
                  title: "Advanced Facials",
                  subtitle: "Rejuvenating skin treatments",
                },
                {
                  src: "/laser.jpg",
                  alt: "Modern laser treatment equipment",
                  title: "Laser Treatments",
                  subtitle: "Cutting-edge technology",
                },
                {
                  src: "/massage.jpg",
                  alt: "Tranquil massage therapy room",
                  title: "Massage Therapy",
                  subtitle: "Relaxation and wellness",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="relative group overflow-hidden rounded-3xl shadow-xl"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={item.src || "/placeholder.svg"}
                    alt={item.alt}
                    width={400}
                    height={300}
                    className="object-cover w-full h-80 group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <motion.div
                    className="absolute bottom-6 left-6 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-sm opacity-90">{item.subtitle}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="space-y-6">
                  <Badge className="bg-stone-100 text-rose-gold border-0 px-4 py-2">About Serenity Medspa</Badge>
                  <motion.h2
                    className="text-5xl font-serif text-slate-800"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    Where Science Meets Serenity
                  </motion.h2>
                  <motion.p
                    className="text-xl text-slate-600 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    Founded in 2018, Serenity Medspa combines cutting-edge medical aesthetics with a spa-like
                    atmosphere. Our board-certified practitioners and licensed aestheticians are dedicated to helping
                    you achieve your wellness and beauty goals safely and effectively.
                  </motion.p>
                </div>

                <motion.div
                  className="grid grid-cols-2 gap-6"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {[
                    {
                      number: "5+",
                      label: "Years of Excellence",
                    },
                    {
                      number: "2000+",
                      label: "Happy Clients",
                    },
                    {
                      number: "15+",
                      label: "Expert Staff",
                    },
                    {
                      number: "98%",
                      label: "Satisfaction Rate",
                    },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center p-8 bg-stone-50 rounded-3xl shadow-lg border border-rose-gold/10"
                      variants={scaleIn}
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        className="text-4xl font-bold text-rose-gold mb-2"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {stat.number}
                      </motion.div>
                      <div className="text-slate-700 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="absolute inset-0 bg-stone-200 rounded-3xl transform -rotate-3"
                  animate={{ rotate: [-3, 3, -3] }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src="/interior.jpg"
                    alt="Modern spa interior with elegant reception area and minimalist design"
                    width={600}
                    height={500}
                    className="object-cover w-full h-[500px]"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-stone-50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center space-y-6 mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-white text-rose-gold border-0 px-4 py-2">Client Stories</Badge>
              <h2 className="text-5xl font-serif text-slate-800">What Our Clients Say</h2>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  name: "Sarah Johnson",
                  treatment: "HydraFacial Package",
                  rating: 5,
                  text: "The results exceeded my expectations! My skin has never looked better. The staff is incredibly knowledgeable and the atmosphere is so relaxing.",
                },
                {
                  name: "Emily Chen",
                  treatment: "Laser Hair Removal",
                  rating: 5,
                  text: "Professional, clean, and effective. I'm so happy with my laser hair removal results. The process was comfortable and the staff made me feel at ease.",
                },
                {
                  name: "Maria Rodriguez",
                  treatment: "Botox & Fillers",
                  rating: 5,
                  text: "Dr. Smith has an amazing eye for natural-looking results. I look refreshed and youthful without looking overdone. Highly recommend!",
                },
              ].map((testimonial, index) => (
                <motion.div key={index} variants={scaleIn}>
                  <Card className="border-0 shadow-xl bg-white backdrop-blur h-full hover:shadow-2xl transition-all duration-300 border-rose-gold/10">
                    <CardContent className="p-8 space-y-6">
                      <div className="flex items-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                      </div>
                      <p className="text-slate-600 italic leading-relaxed text-lg">&ldquo;{testimonial.text}&rdquo;</p>
                      <div className="pt-4 border-t border-stone-100">
                        <div className="font-bold text-slate-800 text-lg">{testimonial.name}</div>
                        <div className="text-sm text-rose-gold">{testimonial.treatment}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center space-y-6 mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-stone-100 text-rose-gold border-0 px-4 py-2">Get In Touch</Badge>
              <h2 className="text-5xl font-serif text-slate-800">Ready to Begin Your Journey?</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Schedule your complimentary consultation today and discover how we can help you look and feel your best.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="grid gap-6"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {[
                    {
                      icon: Phone,
                      title: "Phone",
                      content: "(555) 123-4567",
                    },
                    {
                      icon: MapPin,
                      title: "Address",
                      content: "123 Wellness Blvd, Suite 200\nBeverly Hills, CA 90210",
                    },
                    {
                      icon: Clock,
                      title: "Hours",
                      content: "Mon-Fri: 9AM-7PM\nSat: 9AM-5PM\nSun: Closed",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-6 p-8 bg-stone-50 rounded-3xl shadow-lg border border-rose-gold/10"
                      variants={fadeInLeft}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="p-4 bg-white rounded-2xl">
                        <item.icon className="h-8 w-8 text-rose-gold" />
                      </div>
                      <div>
                        <div className="font-serif text-slate-800 text-lg mb-1">{item.title}</div>
                        <div className="text-slate-600 whitespace-pre-line">{item.content}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                className="bg-stone-50 rounded-3xl p-10 shadow-2xl border border-rose-gold/10"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-serif text-slate-800 mb-8">Book Your Consultation</h3>
                <motion.div
                  className="space-y-6"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  <motion.div className="grid grid-cols-2 gap-4" variants={fadeInUp}>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="px-6 py-4 border-2 border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-gold/50 focus:border-rose-gold"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="px-6 py-4 border-2 border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-gold/50 focus:border-rose-gold"
                    />
                  </motion.div>
                  <motion.input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-6 py-4 border-2 border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-gold/50 focus:border-rose-gold"
                    variants={fadeInUp}
                  />
                  <motion.input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-6 py-4 border-2 border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-gold/50 focus:border-rose-gold"
                    variants={fadeInUp}
                  />
                  <motion.select
                    className="w-full px-6 py-4 border-2 border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-gold/50 focus:border-rose-gold"
                    variants={fadeInUp}
                  >
                    <option>Select Service Interest</option>
                    <option>Advanced Facials</option>
                    <option>Laser Treatments</option>
                    <option>Injectable Treatments</option>
                    <option>Body Contouring</option>
                    <option>Wellness IV Therapy</option>
                    <option>Massage Therapy</option>
                  </motion.select>
                  <motion.textarea
                    placeholder="Tell us about your goals and any questions you have..."
                    rows={4}
                    className="w-full px-6 py-4 border-2 border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-gold/50 focus:border-rose-gold resize-none"
                    variants={fadeInUp}
                  />
                  <motion.div variants={fadeInUp}>
                    <Button className="w-full bg-rose-gold hover:bg-rose-gold/90 text-white py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all">
                      Schedule Consultation
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <motion.footer
          className="bg-slate-800 text-white py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="grid md:grid-cols-4 gap-12"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div className="space-y-6" variants={fadeInUp}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-rose-gold rounded-full flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-serif">Serenity Medspa</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Your premier destination for luxury medical spa treatments and wellness services.
                </p>
              </motion.div>
              <motion.div className="space-y-4" variants={fadeInUp}>
                <h4 className="font-bold text-lg">Services</h4>
                <div className="space-y-3 text-slate-300">
                  <div className="hover:text-rose-gold transition-colors cursor-pointer">Advanced Facials</div>
                  <div className="hover:text-rose-gold transition-colors cursor-pointer">Laser Treatments</div>
                  <div className="hover:text-rose-gold transition-colors cursor-pointer">Injectable Treatments</div>
                  <div className="hover:text-rose-gold transition-colors cursor-pointer">Body Contouring</div>
                </div>
              </motion.div>
              <motion.div className="space-y-4" variants={fadeInUp}>
                <h4 className="font-bold text-lg">Company</h4>
                <div className="space-y-3 text-slate-300">
                  <div className="hover:text-rose-gold transition-colors cursor-pointer">About Us</div>
                  <div className="hover:text-rose-gold transition-colors cursor-pointer">Our Team</div>
                  <div className="hover:text-rose-gold transition-colors cursor-pointer">Reviews</div>
                  <div className="hover:text-rose-gold transition-colors cursor-pointer">Contact</div>
                </div>
              </motion.div>
              <motion.div className="space-y-4" variants={fadeInUp}>
                <h4 className="font-bold text-lg">Connect</h4>
                <div className="space-y-3 text-slate-300">
                  <div className="hover:text-rose-gold transition-colors cursor-pointer">Instagram</div>
                  <div className="hover:text-rose-gold transition-colors cursor-pointer">Facebook</div>
                  <div className="hover:text-rose-gold transition-colors cursor-pointer">Newsletter</div>
                  <div className="hover:text-rose-gold transition-colors cursor-pointer">Blog</div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p>&copy; 2024 Serenity Medspa. All rights reserved.</p>
            </motion.div>
          </div>
        </motion.footer>
      </div>
    </>
  )
}
