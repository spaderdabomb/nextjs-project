"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const navRef = useRef(null);
  const [navWidth, setNavWidth] = useState(0);
  
  // Use an effect to measure the nav content width and update it when needed
  useEffect(() => {
    if (!navRef.current) return;
    
    // Create a ResizeObserver to monitor size changes
    const resizeObserver = new ResizeObserver(entries => {
      // Get width of nav element plus padding for aesthetics
      const newWidth = entries[0].contentRect.width + 24; // add 24px padding on each side
      setNavWidth(newWidth);
    });
    
    // Start observing the nav element
    resizeObserver.observe(navRef.current);
    
    // Clean up observer on unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <header className="z-[999] relative">
      {/* Background element that will adapt to the content width */}
      <motion.div
        className="fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        style={{
          width: navWidth > 0 ? `${navWidth}px` : '100%',
          minWidth: '30rem',
          maxWidth: '90%',
          transform: 'translateX(-50%)'
        }}
      ></motion.div>

      {/* Navigation element with ref to measure */}
      <nav 
        ref={navRef}
        className="flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0"
      >
        <ul className="flex items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:flex-nowrap sm:gap-5">
          {links.map((link) => (
            <motion.li
              className="h-3/4 flex items-center justify-center relative"
              key={link.hash}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                className={clsx(
                  "flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition dark:text-gray-500 dark:hover:text-gray-300",
                  {
                    "text-gray-950 dark:text-gray-200":
                      activeSection === link.name,
                  }
                )}
                href={link.hash}
                onClick={() => {
                  setActiveSection(link.name);
                  setTimeOfLastClick(Date.now());
                }}
              >
                {link.name}

                {link.name === activeSection && (
                  <motion.span
                    className="bg-gray-100 rounded-full absolute inset-0 -z-10 dark:bg-gray-800"
                    layoutId="activeSection"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  ></motion.span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
}