"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Moon, Star } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownDigitProps {
  value: number;
  label: string;
}

const CountdownDigit = ({ value, label }: CountdownDigitProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative bg-gradient-to-br from-red-500 to-red-300 dark:from-red-600 dark:to-red-900 rounded-xl p-4 md:p-6 shadow-lg min-w-[80px] md:min-w-[100px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={value}
            initial={{ y: -20, opacity: 0, rotateX: -90 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: 20, opacity: 0, rotateX: 90 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              duration: 0.3,
            }}
            className="text-2xl md:text-4xl font-bold text-white text-center"
          >
            {value.toString().padStart(2, "0")}
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.p
        className="text-sm md:text-base font-medium text-gray-600 dark:text-gray-300 mt-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {label}
      </motion.p>
    </div>
  );
};

const CelebrationAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6"
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 bg-clip-text text-transparent">
          Eid Mubarak!
        </h1>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -top-4 -right-4"
        >
          <Sparkles className="w-8 h-8 text-yellow-400" />
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 font-medium"
      >
        Qurbani Time Has Arrived!
      </motion.p>

      <div className="flex justify-center items-center space-x-4">
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: 0,
          }}
        >
          <Moon className="w-8 h-8 text-blue-400" />
        </motion.div>

        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
          >
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
          </motion.div>
        ))}
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.5,
            ease: "easeOut",
          }}
          style={{
            left: `${20 + i * 10}%`,
            top: "50%",
          }}
        />
      ))}
    </motion.div>
  );
};

export default function QurbaniCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Target date: Friday, June 6th, 2025 at 6:30 PM
  const targetDate = new Date("2025-06-06T18:30:00");

  // Hide the component entirely after the target date
  if (typeof window !== "undefined" && new Date() > targetDate) {
    return null;
  }

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsCompleted(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsCompleted(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="animate-pulse text-2xl text-gray-600 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <div
      className={`mt-6 ransition-all duration-1000 flex items-center justify-center p-4`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4"
          >
            Qurbani Countdown
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300"
          >
            Friday, June 6th, 2025 at 6:30 PM
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {isCompleted ? (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <CelebrationAnimation />
            </motion.div>
          ) : (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 justify-items-center"
            >
              <CountdownDigit value={timeLeft.days} label="Days" />
              <CountdownDigit value={timeLeft.hours} label="Hours" />
              <CountdownDigit value={timeLeft.minutes} label="Minutes" />
              <CountdownDigit value={timeLeft.seconds} label="Seconds" />
            </motion.div>
          )}
        </AnimatePresence>

        {!isCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8"
          >
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
              May Allah accept our prayers and sacrifices
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
