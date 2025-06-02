"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Testimonial {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  content: string;
  link?: string;
  verified?: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ahmed Khan",
    handle: "@ahmedkhan",
    avatar: "/images/testimonial1.jpg",
    content:
      "QurbaniCraft made organizing our Eid celebrations so much easier! The meat distribution calculator is a game-changer.",
    verified: true,
  },
  {
    id: "2",
    name: "Fatima Ali",
    handle: "@fatimaali",
    avatar: "/images/testimonial2.jpg",
    content:
      "The Eid cards feature is beautiful! I sent personalized cards to all my family members.",
    verified: true,
  },
  {
    id: "3",
    name: "Mohammed Rahman",
    handle: "@mrahman",
    avatar: "/images/testimonial3.jpg",
    content:
      "Finally, a platform that understands the needs of Muslim communities during Eid! The meme generator is hilarious 😂",
    verified: true,
  },
  {
    id: "4",
    name: "Aisha Patel",
    handle: "@aishapatel",
    avatar: "/images/testimonial4.jpg",
    content:
      "The Qurbani meat calculator saved us so much time and ensured fair distribution. Highly recommended!",
    verified: true,
  },
  {
    id: "5",
    name: "Yusuf Hassan",
    handle: "@yhassan",
    avatar: "/images/testimonial5.jpg",
    content:
      "QurbaniCraft's features are exactly what we needed for Eid. The interface is so user-friendly!",
    verified: true,
  },
  {
    id: "6",
    name: "Zainab Malik",
    handle: "@zmalik",
    avatar: "/images/testimonial6.jpg",
    content:
      "The digital Eid cards are stunning! Made my celebrations more special ❤️",
    verified: false,
  },
  {
    id: "7",
    name: "Omar Farooq",
    handle: "@ofarooq",
    avatar: "/images/testimonial7.jpg",
    content:
      "✨ QurbaniCraft is a complete solution for Eid celebrations. From meat distribution to digital cards, it has everything!",
    link: "qurbanicraft.com",
    verified: false,
  },
  {
    id: "8",
    name: "Layla Ahmed",
    handle: "@laylaahmed",
    avatar: "/images/testimonial8.jpg",
    content:
      "This platform is revolutionary for Muslim communities. The Qurbani calculator is so accurate and easy to use!",
    verified: true,
  },
  {
    id: "9",
    name: "Ibrahim Khan",
    handle: "@ikhan",
    avatar: "/images/testimonial9.jpg",
    content:
      "Have you tried QurbaniCraft?\n\nIt's packed with amazing features for Eid celebrations! The meme generator is hilarious 🤯\n\nVisit ➡️ qurbanicraft.com\n\n#Eid #Qurbani #MuslimTech",
    verified: true,
  },
  {
    id: "10",
    name: "Sara Hassan",
    handle: "@shassan",
    avatar: "/images/testimonial10.jpg",
    content:
      "The digital Eid cards are beautiful! Why is this platform free? It's too good!",
    verified: false,
  },
  {
    id: "11",
    name: "Hamza Ali",
    handle: "@hamzaali",
    avatar: "/images/testimonial11.jpg",
    content:
      "QurbaniCraft's features are incredible! The meat distribution calculator is so precise and helpful.",
    verified: true,
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ duration: 0.2 }}
      className="w-full"
    >
      <Card className="relative overflow-hidden border border-border bg-card hover:bg-accent/50 transition-colors duration-200">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                />
                <AvatarFallback>
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </span>
                  {testimonial.verified && (
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <span className="text-muted-foreground text-sm">
                  {testimonial.handle}
                </span>
              </div>
            </div>
            <Twitter className="h-4 w-4 text-blue-400 flex-shrink-0" />
          </div>

          <p className="text-foreground text-sm leading-relaxed whitespace-pre-line mb-3">
            {testimonial.content}
          </p>

          {testimonial.link && (
            <div className="flex items-center gap-1 text-blue-400 text-sm">
              <span>👉</span>
              <Link href={`https://${testimonial.link}`}>{testimonial.link}</Link>
              <ExternalLink className="h-3 w-3" />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function TestimonialColumn({
  testimonials,
  direction = "up",
  duration = 20,
}: {
  testimonials: Testimonial[];
  direction?: "up" | "down";
  duration?: number;
}) {
  return (
    <div className="flex flex-col gap-4 h-full overflow-hidden">
      <motion.div
        animate={{
          y:
            direction === "up"
              ? [0, -100 * testimonials.length]
              : [-100 * testimonials.length, 0],
        }}
        transition={{
          duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="flex flex-col gap-4"
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div key={`${testimonial.id}-${index}`} className="min-h-fit">
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function TestimonialSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Split testimonials into columns for larger screens
  const column1 = testimonials.slice(0, 4);
  const column2 = testimonials.slice(4, 8);
  const column3 = testimonials.slice(8, 11);

  return (
    <section className="w-full py-16 md:py-24 relative testimonial-top bg-gradient-to-b from-red-50 to-[#ffffff] dark:from-background dark:to-background rounded-tl-[50%_10%] rounded-tr-[50%_10%] ">
      <div className="container mx-auto px-4 ">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Eid Joy from Our Community
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of Muslims who are making their Eid celebrations more
            special with QurbaniCraft.
          </p>
        </div>

        {/* Mobile: Single column */}
        <div className="block md:hidden">
          <div className="h-[600px] overflow-hidden">
            <TestimonialColumn testimonials={testimonials} duration={30} />
          </div>
        </div>

        {/* Desktop: Multiple columns */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 h-[600px]">
          <div className="overflow-hidden">
            <TestimonialColumn
              testimonials={column1}
              direction="up"
              duration={25}
            />
          </div>
          <div className="overflow-hidden">
            <TestimonialColumn
              testimonials={column2}
              direction="down"
              duration={20}
            />
          </div>
          <div className="hidden lg:block overflow-hidden">
            <TestimonialColumn
              testimonials={column3}
              direction="up"
              duration={30}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
