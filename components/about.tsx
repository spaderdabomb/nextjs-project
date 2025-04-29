"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About Me</SectionHeading>
      <p className="mb-3">
      As a Santa Barbara local and fellow pet enthusiast, 
      I founded Santa Barbara Sitters to offer the kind of trustworthy 
      and loving care I'd want for my own furry friends. 
      I understand how important it is to find someone reliable and compassionate when you can't be there. 
      That's why I'm personally committed to ensuring your pets feel safe, happy, and comfortable in their own home. 
      I offer personalized pet sitting services tailored to your pet's unique needs, 
      giving you peace of mind knowing they're in caring hands right here in our beautiful Santa Barbara community.
      </p>
    </motion.section>
  );
}
