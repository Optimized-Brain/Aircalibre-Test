'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Rocket,
  HelpCircle,
  BookOpen,
  Github,
  Search,
  Mail,
  FlaskConical,
  ArrowRight
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { SpotlightText } from '@/components/spotlight-text';

const supportCategories = [
  {
    icon: <Rocket className="h-6 w-6" />,
    title: 'Deployment',
    description: 'Hardware installation and network configuration guides.',
    href: '#',
  },
  {
    icon: <HelpCircle className="h-6 w-6" />,
    title: 'Diagnostics',
    description: 'Troubleshooting sensor drift and API connection issues.',
    href: '#faqs',
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'API Docs',
    description: 'Endpoints, rate limits, and authentication protocols.',
    href: '/technology',
  },
  {
    icon: <Github className="h-6 w-6" />,
    title: 'Open Source',
    description: 'Community contributions and firmware compilation.',
    href: '#',
  },
];

const faqItems = [
  {
    question: 'INITIAL BOOT SEQUENCE?',
    answer: 'Supply 5V via USB-C. The status LED will blink white during calibration (approx. 30s). Connect to the "AirCal-Setup" Wi-Fi network and navigate to 192.168.4.1 to configure local network credentials.',
  },
  {
    question: 'NETWORK DISCONNECTION?',
    answer: 'If the LED pulses red, local Wi-Fi is unreachable. The sensor will continue logging data locally for up to 48 hours and batch upload upon reconnection. Power cycle if offline for >48h.',
  },
  {
    question: 'DATA DISCREPANCIES VS OFFIICAL STATIONS?',
    answer: 'Official stations are often macro-level and elevated. AirCal sensors measure micro-environments. Variances are expected and represent local exposure differences, not sensor inaccuracy. Onboard neural compensation handles temperature/humidity artifacts.',
  },
];

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name required.' }),
  email: z.string().email({ message: 'Valid email required.' }),
  subject: z.string().min(5, { message: 'Subject required.' }),
  message: z.string().min(10, { message: 'Detailed message required.' }),
});

export default function SupportPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Transmitted.',
      description: 'Support ticket logged into the system queue.',
    });
    form.reset();
  }

  return (
    <div className="flex flex-col bg-background text-foreground selection:bg-foreground selection:text-background min-h-screen">

      {/* HEADER SECTION */}
      <section className="relative w-full flex flex-col justify-end pb-12 pt-32 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="font-code text-xs font-bold tracking-widest text-muted-foreground mb-8 uppercase">
                // System Operations / Support Network
          </div>
          <SpotlightText spotlightSize={350} className="w-full">
            <h1 className="font-headline text-[8.5vw] sm:text-[7vw] md:text-[6vw] lg:text-[5vw] xl:text-[5.5rem] 2xl:text-[7rem] font-normal tracking-tighter uppercase leading-[0.85] text-foreground mb-12 whitespace-nowrap w-full">
              Operations <span className="text-muted-foreground italic font-serif lowercase tracking-normal">and</span> Support.
            </h1>
          </SpotlightText>

          <div className="relative max-w-2xl group border-l-4 border-foreground pl-6">
            <Search className="absolute left-10 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" />
            <Input
              type="search"
              placeholder="QUERY KNOWLEDGE BASE..."
              className="w-full bg-transparent border-0 border-b-2 border-border focus-visible:ring-0 focus-visible:border-foreground rounded-none px-12 py-8 font-code uppercase tracking-widest text-lg placeholder:text-muted-foreground md:text-xl transition-all"
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES MATRIX */}
      <section id="categories" className="py-24 border-y border-border">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {supportCategories.map((category) => (
              <Link href={category.href} key={category.title} className="group bg-background p-8 md:p-12 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex flex-col justify-between min-h-[300px]">
                <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {category.icon}
                </div>
                <div className="mt-auto">
                  <h3 className="font-headline text-2xl uppercase tracking-tighter mb-4">{category.title}</h3>
                  <p className="font-light text-muted-foreground leading-relaxed">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-24 md:py-40 bg-foreground text-background">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-start">
            <div className="lg:col-span-5 sticky top-32">
              <h2 className="font-headline text-4xl sm:text-6xl md:text-7xl tracking-tighter uppercase leading-none mb-8">
                Diagnostics <br /> <span className="text-zinc-500">& Protocol.</span>
              </h2>
              <div className="font-code text-sm text-zinc-500 uppercase tracking-widest">
                  // frequently accessed logs
              </div>
            </div>
            <div className="lg:col-span-7 border-t border-zinc-800">
              {faqItems.map((item, index) => (
                <div key={index} className="border-b border-zinc-800 py-8 lg:py-12 group">
                  <div className="flex gap-6 items-start">
                    <div className="font-code text-xs text-zinc-500 mt-2">
                      {(index + 1).toString().padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="font-headline text-2xl md:text-3xl uppercase tracking-tighter mb-6">{item.question}</h3>
                      <p className="font-light text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT DIRECT */}
      <section id="contact" className="py-24 md:py-40 bg-background border-t border-border">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-start">

            <div className="space-y-16">
              <div>
                <h2 className="font-headline text-4xl sm:text-5xl md:text-7xl tracking-tighter uppercase leading-none mb-6">
                  Direct <br /> <span className="text-muted-foreground">Line.</span>
                </h2>
                <p className="text-xl font-light text-muted-foreground max-w-md">
                  System critical issues? Direct transmissions are handled by engineering lead tier 2.
                </p>
              </div>

              <div className="space-y-8 font-code uppercase tracking-widest text-sm border-t border-border pt-8">
                <div className="flex gap-4 items-center">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <span className="block text-muted-foreground text-xs mb-1">// Technical Ops</span>
                    <a href="mailto:support@aircal.com" className="hover:text-muted-foreground transition-colors">support@aircal.com</a>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <FlaskConical className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <span className="block text-muted-foreground text-xs mb-1">// API & Integration</span>
                    <a href="mailto:research@aircal.com" className="hover:text-muted-foreground transition-colors">research@aircal.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-border p-8 md:p-12 bg-zinc-50 dark:bg-zinc-950">
              <div className="font-code text-xs font-bold tracking-widest text-muted-foreground mb-12 uppercase border-b border-border pb-4">
                  // Initiate transmission
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-code text-xs uppercase tracking-widest text-muted-foreground">Operator ID</FormLabel>
                        <FormControl>
                          <Input className="bg-transparent border-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-foreground px-0 py-6 font-medium text-lg" placeholder="ENTER NAME" {...field} />
                        </FormControl>
                        <FormMessage className="font-code text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-code text-xs uppercase tracking-widest text-muted-foreground">Return Vector (Email)</FormLabel>
                        <FormControl>
                          <Input className="bg-transparent border-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-foreground px-0 py-6 font-medium text-lg" placeholder="ENTER EMAIL" {...field} />
                        </FormControl>
                        <FormMessage className="font-code text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-code text-xs uppercase tracking-widest text-muted-foreground">Classification Topic</FormLabel>
                        <FormControl>
                          <Input className="bg-transparent border-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-foreground px-0 py-6 font-medium text-lg" placeholder="ENTER SUBJECT" {...field} />
                        </FormControl>
                        <FormMessage className="font-code text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-code text-xs uppercase tracking-widest text-muted-foreground">Transmission Payload</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="ENTER DETAILS..."
                            className="bg-transparent border border-border rounded-none focus-visible:ring-0 focus-visible:border-foreground p-4 font-medium text-base min-h-[150px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-code text-xs" />
                      </FormItem>
                    )}
                  />
                  <button
                    type="submit"
                    className="group relative w-full flex items-center justify-between font-code text-sm uppercase tracking-widest font-bold overflow-hidden px-8 py-6 bg-foreground text-background mt-12"
                  >
                    <span className="relative z-10 block">Transmit Payload</span>
                    <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    <div className="absolute inset-0 bg-zinc-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                  </button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
