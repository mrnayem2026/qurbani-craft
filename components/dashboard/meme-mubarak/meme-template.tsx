"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import React from "react";
import memeTemplate1 from "@/public/images/meme-template/meme1.jpg";
import { Button } from "@/components/ui/button";

const MemeTemplate = () => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div className="py-5">
      <motion.div
        className="relative overflow-hidden rounded-xl bg-white shadow-lg transition-shadow dark:bg-gray-800 max-w-xs w-full group"
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
        whileHover={{
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={memeTemplate1 || "/placeholder.svg"}
            alt="asdf"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>

        <div className="absolute bottom-2 left-2 right-2 ">
          <AnimatePresence>
            {isHovering && (
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="mt-2"
              >
                <Button
                  className="inline-flex  w-full items-center justify-center rounded-md  px-4 py-2 text-sm font-medium  "
                >
                  Use Template
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default MemeTemplate;
