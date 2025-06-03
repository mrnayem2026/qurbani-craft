import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CEBBanner = () => {
  return (
    <div className="text-center">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          {" "}
          Make Your Qurbani Special <br /> with Card-e-Barakah!
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 py-3">
          Celebrate your sacrifice with something that truly speaks you.
        </p>
      </div>
      <div>
        <Button asChild>
          <Link href="/editor/new"> Make Your Eid Card</Link>
        </Button>

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

export default CEBBanner;
