import React from "react";
import Link from "next/link";
import ctaBg from '@/public/images/cta-bg.png'
import Image from "next/image";
import { Button } from "./ui/button";
import { Meteors } from "./ui/meteors";
import { ICallToActionProps } from "@/types";

const CallToAction = ({title,description,buttonText,href}: ICallToActionProps) => {
  return (
    <div className="container relative bg-[#FEF3F3] mb-20 py-[3.75rem] px-[21.875rem] rounded-[35px] overflow-hidden">
      <Image 
        src={ctaBg} 
        alt="cta-bg" 
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="relative flex flex-col items-center justify-center text-center z-10">
        <h2 className="outfit-bold text-4xl md:text-5xl lg:text-[64px] text-black max-w-[800px] leading-tight mb-4">
          {title}
        </h2>
        <p className="outfit-regular text-base md:text-lg text-gray-600 max-w-[600px] mb-8">
          {description}
        </p>
        <Link href={href as string}>
          <Button variant="secondary" className="outfit-medium text-base md:text-lg px-8 py-6">
            {buttonText}
          </Button>
        </Link>
      </div>
      <Meteors number={20} />
    </div>
  );
};

export default CallToAction;
