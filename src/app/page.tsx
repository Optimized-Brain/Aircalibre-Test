'use client';
import { TypingText } from '@/components/typing-text';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  AlertTriangle,
  Award,
  Cpu,
  GitBranch,
  Globe,
  HeartPulse,
  Users,
  ArrowRight
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AwardCard } from '@/components/award-card';
import { AbstractParticleSystem } from '@/components/abstract-particle-system';
import { SpotlightText } from '@/components/spotlight-text';

const problemCards = [
  {
    icon: <HeartPulse className="h-6 w-6" />,
    title: 'Health Impact',
    description: 'PM2.5 particles are small enough to enter the lungs and bloodstream, posing significant stealth health risks globally.',
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Environmental Gaps',
    description: 'Pollution levels can vary dramatically from one street to the next, yet critical granular data remains largely unavailable.',
  },
  {
    icon: <AlertTriangle className="h-6 w-6" />,
    title: 'Inconsistent Data',
    description: 'Readings from standard sensors are skewed by local temperature and humidity, leading to radically unreliable conclusions.',
  },
];

const solutionFeatures = [
  {
    icon: <Cpu className="h-6 w-6" />,
    title: 'Algorithmic Consistency',
    description: 'Our software compensates for local environmental fluctuations, delivering consistent, reliable sensing anywhere on Earth.',
  },
  {
    icon: <GitBranch className="h-6 w-6" />,
    title: 'Open Source Hardware',
    description: 'Full transparency, from our data architectures to our physical blueprints. Built by and for the global community.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Community-Driven Data',
    description: 'Empowering radical, informed decision-making with a globally-shared, distributed, and strictly open data network.',
  },
];

export default function Home() {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'feature-map');

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end center"]
  });
  const smoothHeroScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Smother transitions mapping to 0 for opacity faster and translating down a bit
  const heroOpacity = useTransform(smoothHeroScroll, [0, 0.4, 0.8], [1, 0.5, 0]);
  const heroY = useTransform(smoothHeroScroll, [0, 0.8], [0, 80]);

  // Variables for Problem and Solution sections refactored to use whileInView hook directly on elements.

  return (
    <div className="flex flex-col bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] w-full flex flex-col justify-center overflow-hidden bg-black text-white">
        <AbstractParticleSystem />

        <div className="relative z-10 container px-4 md:px-6 md:pt-20 flex flex-col items-center text-center">
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="flex flex-col items-center w-full max-w-5xl"
          >
            <SpotlightText spotlightSize={150}>
              <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[7rem] font-normal tracking-tighter leading-[0.9] mt-12 mb-8 text-balance break-words max-w-full">
                CLARITY <span className="text-muted-foreground">IN EVERY</span> BREATH.
              </h1>
            </SpotlightText>

            <div className="mt-12 md:mt-16 flex flex-col items-center gap-8 border-t border-white/20 pt-8 w-full max-w-3xl">
              <p className="text-base sm:text-lg md:text-xl font-light text-zinc-400 text-balance break-words max-w-full px-4">
                AirCalibrate builds advanced PM2.5 sensors on an open-source platform.
                Visualize the invisible particulates you breathe, live, with data architecture you can explicitly trust.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center w-full mt-4">
                <Button asChild size="lg" className="rounded-none bg-white text-black hover:bg-zinc-200 h-14 px-8 text-base">
                  <Link href="/technology">
                    Explore Tech <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-none border-white/20 hover:bg-white/10 text-white h-14 px-8 bg-transparent">
                  <Link href="/map" className="flex items-center gap-2 justify-center">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    Live Data
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABSTRACT PROBLEM STATEMENT */}
      <section id="problem" className="relative bg-background text-foreground border-b border-border">
        <div className="container px-4 md:px-6 py-24 md:py-40">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 relative">
              <div className="sticky top-40">
                <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tighter mb-6 uppercase text-balance break-words max-w-full">
                  THE INVISIBLE <br /><span className="text-muted-foreground">THREAT</span>
                </h2>
                <div className="h-1 w-24 bg-foreground mb-8"></div>
                <p className="text-lg sm:text-xl font-light text-muted-foreground text-balance break-words max-w-full">
                  The air we breathe is a complex, undocumented chemical soup. Standard monitoring fails to capture the granular reality of our immediate atmosphere.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8 md:space-y-24 lg:mt-32">
              {problemCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative p-8 md:p-12 bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-zinc-500 transition-colors duration-500"
                >
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-zinc-700 bg-black text-white group-hover:bg-white group-hover:text-black transition-colors duration-500">
                      {card.icon}
                    </div>
                    <div className="font-code text-xs text-zinc-500 mb-4 uppercase tracking-widest">// Problem 0{index + 1}</div>
                    <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter mb-6 uppercase text-white text-balance break-words max-w-full">{card.title}</h3>
                    <p className="text-zinc-400 leading-relaxed font-light text-base sm:text-lg md:text-xl lg:text-2xl text-balance break-words max-w-full">{card.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION REDESIGN */}
      <section id="solution" className="relative bg-background text-foreground border-b border-border">
        <div className="container px-4 md:px-6 py-24 md:py-40">
          <div className="flex flex-col mb-24">
            <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tighter uppercase mb-8 text-balance break-words max-w-full">
              RADICAL <br /> <span className="text-muted-foreground">PRECISION.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start relative">
            <div className="space-y-32 pb-32">
              {solutionFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0.2 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ margin: "-40% 0px -40% 0px" }}
                  transition={{ duration: 0.5 }}
                  className="relative space-y-6"
                >
                  <div className="font-code text-xs text-zinc-500 uppercase tracking-widest border-b border-zinc-200 pb-4">
                    // Solution Paradigm 0{index + 1}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-foreground mb-4">
                    <div className="shrink-0">{feature.icon}</div>
                    <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl uppercase tracking-tighter text-foreground text-balance break-words max-w-full">{feature.title}</h3>
                  </div>
                  <p className="text-zinc-600 font-light leading-relaxed text-lg sm:text-xl lg:text-2xl text-balance break-words max-w-full">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="hidden lg:flex sticky top-40 h-[60vh] w-full overflow-hidden bg-zinc-50 border border-zinc-200 flex-col justify-center items-center group">
              {/* Cyberpunk scanning grid element */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ background: 'conic-gradient(from 0deg, transparent 0 340deg, black 360deg)' }}
              />
              <div className="relative z-10 border border-zinc-300 bg-white/50 backdrop-blur-md p-8 shadow-2xl">
                <div className="font-headline text-2xl tracking-widest text-foreground uppercase text-center mb-4">Core Analytics</div>
                <div className="flex items-center justify-center gap-4">
                  <div className="h-16 w-1 border border-zinc-300 bg-zinc-100 relative overflow-hidden">
                    <motion.div className="absolute bottom-0 w-full bg-black" animate={{ height: ["20%", "80%", "40%"] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} />
                  </div>
                  <div className="h-24 w-1 border border-zinc-300 bg-zinc-100 relative overflow-hidden">
                    <motion.div className="absolute bottom-0 w-full bg-black" animate={{ height: ["60%", "30%", "90%"] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }} />
                  </div>
                  <div className="h-12 w-1 border border-zinc-300 bg-zinc-100 relative overflow-hidden">
                    <motion.div className="absolute bottom-0 w-full bg-black" animate={{ height: ["80%", "10%", "50%"] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPEN SOURCE VISION - MINIMALIST */}
      <section id="vision" className="py-32 md:py-48 bg-background border-y border-border overflow-hidden">
        <div className="container px-4 md:px-6 relative">
          <div className="mx-auto max-w-4xl text-center flex flex-col items-center">
            <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-tighter mb-8 uppercase text-foreground text-balance break-words max-w-full flex flex-col sm:flex-row items-center justify-center gap-3">
              <span>Open</span> <span className="text-muted-foreground italic tracking-tight font-serif lowercase">by</span> <TypingText words={['Design', 'Code', 'Hardware', 'Data']} className="text-muted-foreground" />
            </h2>
            <p className="max-w-2xl text-base sm:text-lg md:text-xl font-light text-muted-foreground mb-12 text-balance break-words px-4">
              Our mission supersedes proprietary hardware. We are architecting an open-source, globally verifiable air quality standard. Free schematics. Free data. Zero compromises.
            </p>
            <Button asChild size="lg" className="rounded-full bg-foreground text-background hover:bg-zinc-800 h-16 px-10 text-lg group">
              <Link href="https://github.com/Optimized-Brain/AirCal-Demo-Website">
                Inspect Repository <GitBranch className="ml-3 h-5 w-5 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-zinc-100 dark:bg-zinc-900 border-t border-border">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between pb-12">
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter font-normal max-w-lg mb-8 md:mb-0 text-balance break-words">
              Contribute to a clearer atmosphere.
            </h2>
            <Button asChild size="lg" variant="outline" className="rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background h-14 px-8 bg-transparent transition-all duration-300">
              <Link href="/support">Initiate Contact</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

