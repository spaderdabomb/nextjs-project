import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import luluImg from "@/public/lulu_1.png";
import dog1 from "@/public/dog_01.png";
import dog2 from "@/public/dog_02.png";
import wordanalyticsImg from "@/public/wordanalytics.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Testimonials",
    hash: "#projects",
  },
  {
    name: "Services",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Graduated High School",
    location: "San Marcos High School, Santa Barbara",
    description:
      "I graduated after 4 years at San Marcos High School",
    icon: React.createElement(LuGraduationCap),
    date: "2015 - 2019",
  },
  {
    title: "Isenberg School of Management",
    location: "UMass, Amherst",
    description:
      "I received my Bachelor's degree in Marketing from the Isenberg School of Managment.",
    icon: React.createElement(CgWorkAlt),
    date: "2019 - 2023",
  },
  {
    title: "Founded Santa Barbara Sitter",
    location: "Santa Barbara, CA",
    description:
      "I am motivated to bring a highly competitive, local service using my experience in business and lifelong love for animals!",
    icon: React.createElement(FaReact),
    date: "2024 - present",
  },
] as const;

export const projectsData = [
  {
    title: "Mackenzie Devilbiss",
    date: "April 12, 2025",
    description:
      "\"Juliet gave us live updates of our dog Lulu and went out of her way to play tug while we were away! She made sure Lulu felt loved and gave us total peace of mind.\"",
    tags: ["Lulu"],
    imageUrl: luluImg,
  },
  {
    title: "Christine Walker",
    date: "Dec 27, 2024",
    description:
      "\"Juliet took our dog Bella on plenty of long walks and made sure she got tons of playtime every day. We came home to a happy pup who clearly had the best time while we were away!\"",
    tags: ["Bella"],
    imageUrl: dog1,
  },
  {
    title: "Emily Carter",
    date: "Sept 16, 2024",
    description:
      "\"Juliet made sure our dog Rocky got long walks every day and sent us photo updates. It made being away so much easier knowing he was getting exercise and lots of love.\"",
    tags: ["Rocky"],
    imageUrl: dog2,
  },
] as const;

export const skillsData = [
  "Dog Sitting",
  "Cat Sitting",
  "Dog Walking",
  "Drop-In Visits",
  "Overnight Stays",
  "Light Grooming",
  "Puppy/Senior Care",
  "Medication",
  "Exercise Sessions",
  "House Sitting",
  "Free Meet and Greet",
  "Daily Photo Updates",
] as const;
