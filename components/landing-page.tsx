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
import {
  MoonStar,
  Gift,
  Utensils,
  ChevronRight,
  Menu,
  Moon,
  Sun,
  BarChart2,
} from "lucide-react";
import { useTheme } from "next-themes";
import homeImage from "@/public/images/home.png";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <MoonStar className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">QurbaniCraft</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Start Creating
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

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
              <div className="group relative cursor-pointer">
                <Image
                  src={homeImage}
                  alt="QurbaniCraft Illustration"
                  className="rounded-lg object-cover h-full transition-transform duration-300 group-hover:scale-110"
                />
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
                  <div className="aspect-video overflow-hidden rounded-lg bg-green-50">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      width={400}
                      height={200}
                      alt="Meme Mubarak Feature"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    className="w-full text-primary hover:text-primary/80 hover:bg-red-50 dark:hover:bg-red-950/50"
                  >
                    Try Meme Mubarak
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
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
                  <div className="aspect-video overflow-hidden rounded-lg bg-green-50">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      width={400}
                      height={200}
                      alt="Card-e-Barakah Feature"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    className="w-full text-primary hover:text-primary/80 hover:bg-red-50 dark:hover:bg-red-950/50"
                  >
                    Try Card-e-Barakah
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
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
                  <div className="aspect-video overflow-hidden rounded-lg bg-green-50">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      width={400}
                      height={200}
                      alt="Meat Mate Feature"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    className="w-full text-primary hover:text-primary/80 hover:bg-red-50 dark:hover:bg-red-950/50"
                  >
                    Try Meat Mate
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 md:py-24 bg-red-50 dark:bg-red-950/20">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="relative rounded-2xl bg-white p-6 shadow-lg md:p-10">
                {/* Islamic Border Design */}
                <div
                  className="absolute inset-0 border-8 border-green-100 rounded-2xl opacity-50"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, #f0fdf4 25%, transparent 25%, transparent 50%, #f0fdf4 50%, #f0fdf4 75%, transparent 75%, transparent)",
                    backgroundSize: "10px 10px",
                    borderImage:
                      "repeating-linear-gradient(45deg, #047857, #047857 10px, #10b981 10px, #10b981 20px) 8",
                  }}
                ></div>
                <div className="relative z-10">
                  <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl">
                    What Our Users Say
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg bg-red-50 dark:bg-red-950/50 p-6">
                      <p className="mb-4 italic text-gray-600">
                        "The Meme Mubarak feature had our family WhatsApp group
                        laughing for days! Best Eid ever!"
                      </p>
                      <p className="font-medium">- Ahmed K.</p>
                    </div>
                    <div className="rounded-lg bg-red-50 dark:bg-red-950/50 p-6">
                      <p className="mb-4 italic text-gray-600">
                        "Meat Mate saved us so much time calculating Qurbani
                        shares. Highly recommended!"
                      </p>
                      <p className="font-medium">- Fatima S.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                    Yes! QurbaniCraft is completely free for basic features. We
                    offer premium options for advanced customization.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Can I share my creations on social media?
                  </AccordionTrigger>
                  <AccordionContent>
                    All memes and cards created with QurbaniCraft can be easily
                    shared to any social media platform with a single click.
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
                    No account is needed for basic features. However, creating a
                    free account allows you to save your creations and access
                    them across devices.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-white">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Make This Eid Special?
              </h2>
              <p className="mb-8 text-red-50 md:text-xl/relaxed">
                Join thousands of Muslims making their Eid celebrations more
                memorable with QurbaniCraft.
              </p>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-red-50"
              >
                Start Creating Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <MoonStar className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold text-primary">
              QurbaniCraft
            </span>
          </div>
          <p className="text-center text-sm text-gray-500 md:text-left">
            &copy; {new Date().getFullYear()} QurbaniCraft. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
