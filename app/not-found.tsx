import React from "react";
import { Metadata } from "next";
import notFound from "@/public/images/not-found.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
};

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="not-found text-center max-w-3xl mx-auto">
        <Image 
          src={notFound} 
          alt="404" 
          className="w-full h-auto max-w-[400px] md:max-w-[600px] mx-auto"
          priority
        />
        <div className="mt-2 md:mt-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4">
            There is nothing here...
          </h1>
          <h2 className="text-lg md:text-xl lg:text-2xl">
            May be the page your looking for is not found or never existed
          </h2>
          <Link href="javascript:history.go(-1)">
            <Button className="mt-8 md:mt-11 bg-primary hover:bg-primary outfit-medium text-sm md:text-base lg:text-lg px-6 md:px-8 py-4 md:py-6">
             Go Back
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
