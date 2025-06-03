"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoonStar, Gift, Utensils, ChevronRight } from "lucide-react";
import homeImage from "@/public/images/home.png";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { useSupabase } from "@/components/supabase-provider";
import { ThemeToggle } from "./dashboard/theme-toggle";
import MemeMubarok from "@/public/images/meme-mubarok.jpg";
import CardEBarakah from "@/public/images/card-e-barakah.jpg";
import MeatMate from "@/public/images/meat-mate.jpg";
import TestimonialSection from "./testimonial-section";
import CallToAction from "./CallToAction";
import QurbaniCountdown from "./qurbani-countdown";

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Start Creating",
      link: "/dashboard",
    },
    {
      name: "Contact",
      link: "https://wa.me/+8801324207023?text=I%20want%20to%20work%20with%20you",
    },
  ];
  const { user, isLoading, supabase } = useSupabase();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen flex-col">
      <>
        <Navbar>
          {/* Desktop Navigation */}
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} />
            <div className="flex items-center gap-4">
              <ThemeToggle />
              {isLoading ? (
                <div>Loading...</div>
              ) : user ? (
                <NavbarButton variant="dark" onClick={handleSignOut}>
                  Log Out
                </NavbarButton>
              ) : (
                <NavbarButton variant="dark" href="/login">
                  Login
                </NavbarButton>
              )}

              <NavbarButton
                variant="primary"
                href="https://cal.com/mostafizur-rahman-nayem-x1yiih/15min"
              >
                Book a call
              </NavbarButton>
            </div>
          </NavBody>

          {/* Mobile Navigation */}
          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300"
                >
                  <span className="block">{item.name}</span>
                </a>
              ))}
              <div className="flex items-center gap-4">
                <ThemeToggle />
                {isLoading ? (
                  <div>Loading...</div>
                ) : user ? (
                  <NavbarButton variant="dark" onClick={handleSignOut}>
                    Log Out
                  </NavbarButton>
                ) : (
                  <NavbarButton variant="dark" href="/login">
                    Login
                  </NavbarButton>
                )}

                <NavbarButton
                  variant="primary"
                  href="https://cal.com/mostafizur-rahman-nayem-x1yiih/15min"
                >
                  Book a call
                </NavbarButton>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </>

      <main className="flex-1">
        {/* Hero Section with Islamic Pattern Background */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          </div>
          <div
            className="absolute inset-0 opacity-5 pattern-islamic"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23047857' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="container relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">
                  Eid Mubarak 🌙
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Celebrate Eid <span className="text-primary">Creatively</span>
                </h1>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Create memes, design cards, and divide Qurbani meat with our
                  all-in-one Eid celebration toolkit.
                </p>
                <Link href="/dashboard" className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Start Creating
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="group relative cursor-pointer order-12">
                <Image
                  src={homeImage}
                  alt="QurbaniCraft Illustration"
                  className="rounded-lg object-cover h-full transition-transform duration-300 group-hover:scale-110 relative z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-3xl -z-10" />
                <audio id="hambaHumba" className="hidden">
                  <source src="/hamba-humba.mp3" type="audio/mpeg" />
                </audio>
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      document.querySelector('.group').addEventListener('mouseenter', () => {
                        document.getElementById('hambaHumba').play();
                      });
                    `,
                  }}
                />
              </div>
            </div>
            <QurbaniCountdown/>
          </div>
        </section>

        {/* Feature Cards */}
        <section id="features" className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our <span className="text-primary">Festive</span> Features
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-gray-500 md:text-xl/relaxed">
                Everything you need to make your Eid celebrations more memorable
                and organized.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Meme Generator Card */}
              <Card className="overflow-hidden border-2 border-red-100 dark:border-red-900/50 transition-all hover:border-red-200 dark:hover:border-red-800 hover:shadow-md">
                <CardHeader className="bg-red-50 dark:bg-red-950/50 pb-4">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
                    <MoonStar className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    Make Hilarious Eid Memes
                  </CardTitle>
                  <CardDescription>
                    Create and share funny Eid-themed memes with friends and
                    family.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="overflow-hidden rounded-lg bg-green-50">
                    <Image
                      src={MemeMubarok}
                      width={400}
                      height={200}
                      alt="Meme Mubarak Feature"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard/meme-mubarak" className="w-full">
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-center text-primary hover:text-primary/80 hover:bg-red-50 dark:hover:bg-red-950/50"
                    >
                      Try Meme Mubarak
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Eid Card Maker */}
              <Card className="overflow-hidden border-2 border-red-100 dark:border-red-900/50 transition-all hover:border-red-200 dark:hover:border-red-800 hover:shadow-md">
                <CardHeader className="bg-red-50 dark:bg-red-950/50 pb-4">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
                    <Gift className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    Send Personalized Eid Cards
                  </CardTitle>
                  <CardDescription>
                    Design beautiful digital Eid cards with custom messages and
                    designs.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="overflow-hidden rounded-lg bg-green-50">
                    <Image
                      src={CardEBarakah}
                      width={400}
                      height={200}
                      alt="Card-e-Barakah Feature"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard/card-e-barakah" className="w-full">
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-center text-primary hover:text-primary/80 hover:bg-red-50 dark:hover:bg-red-950/50"
                    >
                      Try Card-e-Barakah
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Qurbani Meat Divider */}
              <Card className="overflow-hidden border-2 border-red-100 dark:border-red-900/50 transition-all hover:border-red-200 dark:hover:border-red-800 hover:shadow-md">
                <CardHeader className="bg-red-50 dark:bg-red-950/50 pb-4">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
                    <Utensils className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    Split Qurbani Meat the Halal Way
                  </CardTitle>
                  <CardDescription>
                    Easily calculate and track Qurbani meat distribution among
                    family and charity.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="overflow-hidden rounded-lg bg-green-50">
                    <Image
                      src={MeatMate}
                      alt="Meat Mate Feature"
                      className="object-cover"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard/meat-mate" className="w-full">
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-center text-primary hover:text-primary/80 hover:bg-red-50 dark:hover:bg-red-950/50"
                    >
                      Try Meat Mate
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <TestimonialSection />

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Is QurbaniCraft free to use?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes! QurbaniCraft is completely free to use.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Can I share my creations on social media?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yap, All memes and cards created with QurbaniCraft can be
                    easily shared to any social media platform with a single
                    click.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    How does the Qurbani meat calculator work?
                  </AccordionTrigger>
                  <AccordionContent>
                    Our Meat Mate tool allows you to input the total weight of
                    your Qurbani and the number of shares. It then calculates
                    the exact distribution according to Islamic guidelines,
                    ensuring fair division.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Do I need to create an account?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, creating an account is required to access all features.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CallToAction
          title="Ready to Make Your Qurbani Special?"
          description="Join thousands of Muslims creating meaningful Qurbani cards and memes. Let's make this Eid celebration more memorable together."
          buttonText="Start Creating Now"
          href="/dashboard"
        />
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <Link href="/" className="flex items-center gap-2">
            <MoonStar className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold text-primary">
              QurbaniCraft
            </span>
          </Link>
          <p className="text-center text-sm text-gray-500 md:text-left">
            &copy; {new Date().getFullYear()} QurbaniCraft. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              target="_blank"
              href="https://x.com/mrnayem4403"
              className="text-sm text-muted-foreground"
            >
              Building in public <span className="text-primary">@mrnayem4403</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
