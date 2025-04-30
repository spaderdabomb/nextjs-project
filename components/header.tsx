"use client";

import React, { useRef, useEffect, useState, RefObject } from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const navRef = useRef<HTMLDivElement | null>(null);
  const [navWidth, setNavWidth] = useState(0);
  const [navHeight, setNavHeight] = useState(0);
  
  // Force an initial measurement
  useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      if (navRef.current) {
        const currentRef = navRef.current as HTMLElement;
        setNavWidth(Math.min(
          currentRef.offsetWidth + 24,
          typeof window !== 'undefined' ? window.innerWidth * 0.95 : 1000
        ));
        setNavHeight(currentRef.offsetHeight + 20);
      }
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  // Use an effect to measure the nav content width and update it when needed
  useEffect(() => {
    if (!navRef.current) return;
    
    // Create a ResizeObserver to monitor size changes
    const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      if (entries[0]) {
        // Get width of nav element plus padding for aesthetics
        const newWidth = Math.min(
          entries[0].contentRect.width + 24, // add 12px padding on each side
          typeof window !== 'undefined' ? window.innerWidth * 0.95 : 1000 // ensure it doesn't exceed screen width
        );
        setNavWidth(newWidth);
        
        // Check if content is wrapped (multiple rows) based on height
        // Single row is typically around 40-50px, so if height is greater, we have multiple rows
        const isTwoRows = entries[0].contentRect.height > 50;
        
        // Add more padding when there are two rows
        const verticalPadding = isTwoRows ? 60 : 20;
        const newHeight = entries[0].contentRect.height + verticalPadding;
        
        setNavHeight(newHeight);
        
        console.log('ResizeObserver:', { 
          contentHeight: entries[0].contentRect.height,
          isTwoRows,
          verticalPadding,
          newHeight
        });
      }
    });
    
    // Start observing the nav element
    resizeObserver.observe(navRef.current);
    
    // Add window resize listener to handle screen rotation
          const handleResize = () => {
      if (navRef.current) {
        const currentRef = navRef.current as HTMLElement;
        const newWidth = Math.min(
          currentRef.offsetWidth + 24,
          typeof window !== 'undefined' ? window.innerWidth * 0.95 : 1000
        );
        setNavWidth(newWidth);
        
        const newHeight = currentRef.offsetHeight + 20;
        setNavHeight(newHeight);
        
        console.log('handleResize:', { 
          offsetHeight: currentRef.offsetHeight,
          newHeight
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up observer on unmount
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="z-[999] relative">
      {/* Background element that will adapt to the content width */}
      <motion.div
        className="fixed top-0 left-1/2 rounded-2xl border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        style={{
          width: navWidth > 0 ? `${navWidth}px` : '100%',
          height: navHeight > 0 ? `${navHeight}px` : 'auto',
          minHeight: '3.25rem',
          minWidth: typeof window !== 'undefined' && window.innerWidth < 640 ? 'auto' : '36rem',
          maxWidth: '95%',
          transform: 'translateX(-50%)'
        }}
      ></motion.div>

      {/* Navigation element with ref to measure */}
      <nav 
        ref={navRef}
        className="flex fixed top-[0.15rem] left-1/2 h-auto -translate-x-1/2 py-1 sm:top-[2.2rem] sm:h-[initial] sm:py-0"
      >
        <ul className="flex flex-wrap items-center justify-center gap-y-2 gap-x-1 text-[0.9rem] font-medium text-gray-500 px-2 py-1 max-w-[95vw] sm:flex-nowrap sm:gap-5">
          {links.map((link) => (
            <motion.li
              className="h-3/4 flex items-center justify-center relative"
              key={link.hash}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                className={clsx(
                  "flex w-full items-center justify-center px-3 py-2 hover:text-gray-950 transition dark:text-gray-500 dark:hover:text-gray-300",
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