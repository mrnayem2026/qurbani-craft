"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Users, Heart, Gift, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface SplitCalculator {
  isOpen: boolean;
  people: number;
  perPerson: number;
}

export default function MeatMateCalculator() {
  const [totalMeat, setTotalMeat] = useState<number>(0);
  const [relativesCalculator, setRelativesCalculator] =
    useState<SplitCalculator>({
      isOpen: false,
      people: 0,
      perPerson: 0,
    });
  const [poorCalculator, setPoorCalculator] = useState<SplitCalculator>({
    isOpen: false,
    people: 0,
    perPerson: 0,
  });

  const shareAmount = totalMeat / 3;

  const handleRelativesSplit = (people: number) => {
    setRelativesCalculator({
      isOpen: true,
      people,
      perPerson: people > 0 ? shareAmount / people : 0,
    });
  };

  const handlePoorSplit = (people: number) => {
    setPoorCalculator({
      isOpen: true,
      people,
      perPerson: people > 0 ? shareAmount / people : 0,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const splitVariants = {
    hidden: { opacity: 0, height: 0, y: -20 },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen p-4">


      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Following Islamic guidelines: 1/3 each for Self, Relatives & Poor
          </p>
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-transparent backdrop-blur-sm ">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-800 dark:text-white">
                Enter Total Meat Weight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="w-full max-w-xs flex flex-col items-center">
                  <Label htmlFor="meat-weight" className="text-center text-lg font-medium">
                    Weight (kg)
                  </Label>
                  <Input
                    id="meat-weight"
                    type="number"
                    placeholder="Enter weight in kg"
                    value={totalMeat || ""}
                    onChange={(e) => setTotalMeat(Number(e.target.value))}
                    className="text-xl text-center h-12 mt-2 border-2 border-emerald-200 focus:border-emerald-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence>
          {totalMeat > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid md:grid-cols-3 gap-6 mb-8"
            >
              <motion.div variants={cardVariants}>
                <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Heart className="w-6 h-6" />
                      For You & Your Family
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">
                        {shareAmount.toFixed(1)} kg
                      </div>
                      <div className="text-blue-100">1/3 of total meat</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={cardVariants}>
                <Card className="shadow-xl border-0 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Users className="w-6 h-6" />
                      For Relatives & Friends
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold mb-2">
                        {shareAmount.toFixed(1)} kg
                      </div>
                      <div className="text-emerald-100">1/3 of total meat</div>
                    </div>
                    <Button
                      onClick={() =>
                        setRelativesCalculator((prev) => ({
                          ...prev,
                          isOpen: !prev.isOpen,
                        }))
                      }
                      variant="secondary"
                      className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      Split Further
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={cardVariants}>
                <Card className="shadow-xl border-0 bg-gradient-to-br from-amber-500 to-amber-600 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Gift className="w-6 h-6" />
                      For Poor & Needy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold mb-2">
                        {shareAmount.toFixed(1)} kg
                      </div>
                      <div className="text-amber-100">1/3 of total meat</div>
                    </div>
                    <Button
                      onClick={() =>
                        setPoorCalculator((prev) => ({
                          ...prev,
                          isOpen: !prev.isOpen,
                        }))
                      }
                      variant="secondary"
                      className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      Split Further
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-6">
          <AnimatePresence>
            {relativesCalculator.isOpen && totalMeat !== 0 && (
              <motion.div
                variants={splitVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Card className="shadow-xl border-0 bg-gradient-to-r from-emerald-50 to-emerald-100">
                  <CardHeader>
                    <CardTitle className="text-emerald-700 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Split Among Relatives & Friends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 items-end">
                      <div className="flex-1">
                        <Label htmlFor="relatives-count">
                          Number of People
                        </Label>
                        <Input
                          id="relatives-count"
                          type="number"
                          placeholder="Enter number"
                          onChange={(e) =>
                            handleRelativesSplit(Number(e.target.value))
                          }
                          className="mt-1"
                        />
                      </div>
                      {relativesCalculator.people > 0 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-emerald-600 text-white p-4 rounded-lg text-center min-w-[150px]"
                        >
                          <div className="text-2xl font-bold">
                            {relativesCalculator.perPerson.toFixed(2)} kg
                          </div>
                          <div className="text-sm text-emerald-100">
                            per person
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {poorCalculator.isOpen && totalMeat !== 0 && (
              <motion.div
                variants={splitVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Card className="shadow-xl border-0 bg-gradient-to-r from-amber-50 to-amber-100">
                  <CardHeader>
                    <CardTitle className="text-amber-700 flex items-center gap-2">
                      <Gift className="w-5 h-5" />
                      Split Among Poor & Needy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 items-end">
                      <div className="flex-1">
                        <Label htmlFor="poor-count">Number of People</Label>
                        <Input
                          id="poor-count"
                          type="number"
                          placeholder="Enter number"
                          onChange={(e) =>
                            handlePoorSplit(Number(e.target.value))
                          }
                          className="mt-1"
                        />
                      </div>
                      {poorCalculator.people > 0 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-amber-600 text-white p-4 rounded-lg text-center min-w-[150px]"
                        >
                          <div className="text-2xl font-bold">
                            {poorCalculator.perPerson.toFixed(2)} kg
                          </div>
                          <div className="text-sm text-amber-100">
                            per person
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="text-center mt-12 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            May Allah accept your Qurbani and bless your generosity
          </p>
          <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">Built with ❤️ for the Muslim community</p>
        </motion.div>
      </div>
    </div>
  );
}
