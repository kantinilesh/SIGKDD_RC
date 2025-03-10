'use client';

import { useEffect, useState } from 'react';
import { Hourglass, Menu, X } from 'lucide-react';
import { Mail, Instagram, Linkedin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local'; // Import for local fonts

// Define the Montserrat font
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });

// Define the custom Octets Guerrilla font
const octetsGuerrilla = localFont({
  src: '../public/fonts/ProtestGuerrilla.ttf', // Adjust path to your font file
  variable: '--font-octets-guerrilla', // Optional: CSS variable for flexibility
});

// Register GSAP plugins
gsap.registerPlugin(TextPlugin);

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2025-03-18T23:59:59').getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const distance = targetDate - now;
      
      setTimeLeft({
        days: Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        minutes: Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))),
        seconds: Math.max(0, Math.floor((distance % (1000 * 60)) / 1000)),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Animation for Typing Effect
  useEffect(() => {
    gsap.to('.typing-text', {
      duration: 2,
      text: 'Recruitments 2025',
      ease: 'none',
    });
  }, []);

  // Audio on Load
  useEffect(() => {
    const audio = new Audio('/audio.mp3');
    audio.play();
  }, []);

  // Flip animation variants for the countdown
  const flipVariants = {
    hidden: { rotateX: -90, opacity: 0 },
    visible: { rotateX: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className={`min-h-screen bg-black text-white overflow-hidden ${montserrat.className}`}>
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-sm border-b border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/Srmseal.png" alt="SRM Logo" className="h-12 w-18" />
              <img src="/acmnav.svg" alt="ACM SIGKDD Logo" className="h-12 w-18" />
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-yellow-500" />
                ) : (
                  <Menu className="h-6 w-6 text-yellow-500" />
                )}
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="hover:text-yellow-500 transition-colors">Home</a>
              <a href="#faq" className="hover:text-yellow-500 transition-colors">FAQ</a>
              <a href="#contact" className="hover:text-yellow-500 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen">
        <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          {/* Hollow text effect with Octets Guerrilla font */}
          <h1
            className={`text-4xl md:text-6xl font-bold mb-6 text-transparent ${octetsGuerrilla.className} typing-text`}
            style={{ WebkitTextStroke: '2px #EAB308' }}
          >
          </h1>
          {/* Dark web quote */}
          <p className="text-lg md:text-xl text-gray-400 mb-6 italic">
            "In the shadows of data, we weave the threads of destiny." - Anonymous, Dark Web
          </p>

          {/* Countdown Timer with Flip Animation */}
          <div className="flex space-x-4 mb-8">
            {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
              <div key={unit} className="text-center">
                <motion.div
                  key={timeLeft[unit as keyof typeof timeLeft]}
                  variants={flipVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-yellow-500 text-black text-2xl md:text-4xl font-bold w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-lg"
                >
                  {timeLeft[unit as keyof typeof timeLeft] < 0 ? 0 : timeLeft[unit as keyof typeof timeLeft]}

                </motion.div>
                <p className="text-sm md:text-base mt-2 capitalize">{unit}</p>
              </div>
            ))}
          </div>

          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-6 text-lg rounded-full"
            onClick={() => window.open('https://form.typeform.com/to/LPz52SQ4', '_blank')}
          >
            APPLY NOW
          </Button>
        </div>
      </div>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-black/90">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-yellow-500">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-yellow-500/20">
              <AccordionTrigger className="text-left text-lg hover:text-yellow-500">What are the eligibility criteria?</AccordionTrigger>
              <AccordionContent className="text-gray-300">Any student currently enrolled at SRM Institute of Science and Technology with an interest in Data Science, Machine Learning, Deep Learning, or NLP is eligible to apply.</AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-yellow-500/20">
              <AccordionTrigger className="text-left text-lg hover:text-yellow-500">Can I still join if I am a fresher with no prior experience?</AccordionTrigger>
              <AccordionContent className="text-gray-300">Absolutely! Freshers with a passion for learning and a curiosity about data-driven technologies are encouraged to join. No prior experience is required.</AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-yellow-500/20">
              <AccordionTrigger className="text-left text-lg hover:text-yellow-500">Do I need prior experience in data science or machine learning to apply?</AccordionTrigger>
              <AccordionContent className="text-gray-300">No, prior experience in data science or machine learning is not necessary. The chapter is open to all levels, and you'll have opportunities to learn and grow.</AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-yellow-500/20">
              <AccordionTrigger className="text-left text-lg hover:text-yellow-500">Is there a membership fee to join our club?</AccordionTrigger>
              <AccordionContent className="text-gray-300">There are no membership fees to join the club; however, acquiring ACM and SIGKDD memberships, which offer significant benefits, is highly recommended.</AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-yellow-500/20">
              <AccordionTrigger className="text-left text-lg hover:text-yellow-500">How to become a member of the student chapter?</AccordionTrigger>
              <AccordionContent className="text-gray-300">Timely recruitments for the student chapter is conducted every semester that consists of test and interview rounds. Evaluation of the candidate after both rounds ensures selection in the student chapter.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-yellow-500/20">
              <AccordionTrigger className="text-left text-lg hover:text-yellow-500">Does the club offer resources or mentorship for learning new technologies?</AccordionTrigger>
              <AccordionContent className="text-gray-300">Yes, we provide resources and mentorship to our members, fostering an environment where they can readily access support and guidance, empowering them to enhance their skills and remain abreast of the latest advancements in the field.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-yellow-500/20 py-12">
  <div className="max-w-4xl mx-auto px-4 text-center">
    <div className="flex justify-center items-center space-x-4 mb-6">
      <img src="/BIG_400x400.png" alt="SRM Logo" className="h-14 w-14" />
      <img src="/acmnav.svg" alt="ACM SIGKDD Logo" className="h-14 w-14" />
    </div>
    <p className="text-gray-400 max-w-lg mx-auto mb-6">
      SRM ACM SIGKDD is dedicated to fostering innovation in Data Science, Machine Learning, and AI.
    </p>
    <div className="flex flex-col space-y-3 text-gray-300 mb-6">
      <div className="flex items-center justify-center space-x-2">
        <User className="h-5 w-5 text-yellow-500" />
        <p><span className="font-semibold">Chair:</span> Srijan (+91 83368 94338)</p>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <User className="h-5 w-5 text-yellow-500" />
        <p><span className="font-semibold">Vice Chair:</span> Saakshi (+91 97358 44700)</p>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <User className="h-5 w-5 text-yellow-500" />
        <p><span className="font-semibold">Treasurer:</span> Nilesh (+91 93412 07002)</p>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <Mail className="h-5 w-5 text-yellow-500" />
        <p>srmacmsigkdd@gmail.com</p>
      </div>
    </div>
    <div className="flex justify-center space-x-6 mb-6">
      <a href="#" className="text-gray-400 hover:text-yellow-500 transition">
        <Instagram className="h-6 w-6" />
      </a>
      <a href="#" className="text-gray-400 hover:text-yellow-500 transition">
        <Linkedin className="h-6 w-6" />
      </a>
    </div>
    <p className="text-gray-500 text-sm">© 2024 SRM ACM SIGKDD. All rights reserved.</p>
  </div>
</footer>
    </div>
  );
}
