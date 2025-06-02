import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const MmBanner = () => {
  return (
    <div className="text-center">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          {" "}
          Make Everyone Laugh This Eid <br /> with Meme Mubarak!
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 py-3">
          Turn your Eid moments into hilarious, share-worthy memes in seconds.
        </p>
      </div>
      <div>
        <Button>Generate Your Eid Meme</Button>

        <div className="flex gap-2 justify-center items-center">
          <div className="flex -space-x-2 my-5">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className="w-9 h-9 rounded-full border-2 border-black overflow-hidden"
              >
                <Image
                  src={`/images/team${num}.png`}
                  alt={`Customer ${num}`}
                  width={30}
                  height={30}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={17}
                  className="text-[#FED16A] fill-[#FED16A] "
                />
              ))}
            </div>
            <p className="dark:text-gray-300">used by 5,460+ users</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MmBanner;
