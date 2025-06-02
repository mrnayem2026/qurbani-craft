import React from "react";
import Link from "next/link";
import ctaBg from '@/public/images/cta-bg.png'
import Image from "next/image";
import { Button } from "./ui/button";
import { Meteors } from "./ui/meteors";
import { ICallToActionProps } from "@/types";

const CallToAction = ({title,description,buttonText,href}: ICallToActionProps) => {
  return (
    <div className="container relative bg-[#FEF3F3] mb-20 py-10 px-4 sm:py-14 sm:px-8 md:py-16 md:px-16 lg:py-20 lg:px-24 xl:py-[3.75rem] xl:px-[6rem] 2xl:px-[12rem] rounded-[24px] md:rounded-[35px] overflow-hidden max-w-full">
      <Image 
        src={ctaBg} 
        alt="cta-bg" 
        className="absolute inset-0 w-full h-full object-cover z-0"
        fill
        priority
      />
      <div className="relative flex flex-col items-center justify-center text-center z-10">
        <h2 className="outfit-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[64px] text-black max-w-full md:max-w-[800px] leading-tight mb-4">
          {title}
        </h2>
        <p className="outfit-regular text-sm sm:text-base md:text-lg text-gray-600 max-w-full md:max-w-[600px] mb-8">
          {description}
        </p>
        <Link href={href as string}>
          <Button variant="secondary" className="outfit-medium text-base md:text-lg px-6 py-4 md:px-8 md:py-6">
            {buttonText}
          </Button>
        </Link>
      </div>
      <Meteors number={20} />
    </div>
  );
};

export default CallToAction;
