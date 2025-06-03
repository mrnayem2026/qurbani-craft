"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const MemeTemplate = () => {
  const [isHovering, setIsHovering] = useState<boolean | number>(false);
  const router = useRouter();
  return (
    <div className="py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 31 }, (_, i) => i + 1).map((index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-xl bg-white shadow-lg transition-shadow dark:bg-gray-800 w-full group"
            onHoverStart={() => setIsHovering(index)}
            onHoverEnd={() => setIsHovering(false)}
            whileHover={{
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <motion.div 
              className="relative aspect-[3/4] w-full"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3 }
              }}
            >
              <Image
                src={`/images/meme-template/meme${index}.jpg`}
                alt={`Meme template ${index}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>

            <div className="absolute bottom-2 left-2 right-2">
              <AnimatePresence>
                {isHovering === index && (
                  <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 40, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="mt-2"
                  >
                    <Button
                      className="inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-xs font-medium"
                      onClick={() => router.push(`/editor/new?template=${encodeURIComponent(`/images/meme-template/meme${index}.jpg`)}`)}
                    >
                      Use This Template
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MemeTemplate;
