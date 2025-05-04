"use client";

import { useRef } from "react";
import { projectsData } from "@/lib/data";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaStar } from "react-icons/fa";

type ProjectProps = (typeof projectsData)[number];

export default function Project({
  title,
  date,
  description,
  tags,
  imageUrl,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgess,
        opacity: opacityProgess,
      }}
      className="group mb-3 sm:mb-8 last:mb-0"
    >
      <section className="bg-gray-100 max-w-[42rem] border border-black/5 rounded-lg overflow-hidden relative hover:bg-gray-200 transition dark:text-white dark:bg-white/10 dark:hover:bg-white/20">
        {/* Text Content - Full width on small screens, half width on larger screens */}
        <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-full md:max-w-[50%] flex flex-col h-full md:group-even:ml-[18rem]">
          <div className="flex items-center mt-2">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} className="text-yellow-400 mr-1" size={20} />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-4">{date}</span>
          </div>
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70 italic">
            {description}
          </p>
          <ul className="flex flex-wrap mt-4 gap-2 mb-4">
            {tags.map((tag, index) => (
              <li
                className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Image for mobile (displayed below text) */}
        <div className="block md:hidden px-5 pb-6">
          <Image
            src={imageUrl}
            alt="Project I worked on"
            quality={95}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Image for desktop (positioned absolutely) */}
        <Image
          src={imageUrl}
          alt="Project I worked on"
          quality={95}
          className="absolute hidden md:block top-8 -right-20 w-[22.25rem] rounded-t-lg shadow-2xl transition 
          group-hover:scale-[1.04] group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 
          group-even:group-hover:translate-x-3 group-even:group-hover:translate-y-3 group-even:group-hover:rotate-2 
          group-even:right-[initial] group-even:-left-20 z-10"
        />
      </section>
    </motion.div>
  );
}