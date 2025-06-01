"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export function HeroAnimation() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full h-full">
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              transform: "translateZ(-10px)",
              zIndex: -1,
            }}
          >
            <span className="transform -rotate-6">Beautiful Text</span>
          </motion.div>
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Example image"
              width={400}
              height={400}
              className="object-cover rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

