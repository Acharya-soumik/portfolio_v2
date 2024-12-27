"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Palette,
  CodepenIcon as ReactIcon,
  LayoutGrid,
} from "lucide-react";

const ExpSection = () => {
  return (
    <div className="flex flex-col justify-center p-6 bg-gray-800 rounded-2xl shadow-lg">
      <p className="text-gray-400">4 years of</p>
      <p className="text-4xl font-bold text-white mb-2">XP</p>
      <p className="text-gray-400">with the most popular</p>
      <p className="text-gray-400">Frontend ecosystem</p>
    </div>
  );
};

const SkillCard = ({ name, icon: Icon, color, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex flex-col justify-between w-[250px] h-[180px] p-4 rounded-2xl shadow-lg overflow-hidden relative"
      style={{ backgroundColor: color }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-0" />
      <div className="relative z-10">
        <Icon className="w-8 h-8 text-white mb-2" />
        <h3 className="text-white text-xl font-semibold mb-1">{name}</h3>
        <p className="text-gray-200 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

const skillCards = [
  {
    color: "#F7DF1E",
    name: "JavaScript",
    description: "The language of the web",
    icon: Code,
  },
  {
    color: "#61DAFB",
    name: "React",
    description: "A JavaScript library for building user interfaces",
    icon: ReactIcon,
  },
  {
    color: "#000000",
    name: "Next.js",
    description: "The React Framework for Production",
    icon: LayoutGrid,
  },
  {
    color: "#38B2AC",
    name: "Tailwind CSS",
    description: "A utility-first CSS framework",
    icon: Palette,
  },
];

const ScrollingSkills = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Redux",
    "TailwindCSS",
    "HTML5",
    "CSS3",
    "Webpack",
    "GraphQL",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prevPosition) =>
        prevPosition >= skills.length * 30 ? 0 : prevPosition + 1
      );
    }, 50);

    return () => clearInterval(interval);
  }, [skills.length]);

  return (
    <div className="h-[200px] overflow-hidden relative w-[150px]">
      <div
        className="absolute transition-transform duration-1000 ease-linear"
        style={{ transform: `translateY(-${scrollPosition}px)` }}
      >
        {skills.concat(skills).map((skill, index) => (
          <div
            key={`${skill}-${index}`}
            className="text-gray-400 whitespace-nowrap py-2"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

const Exp = () => {
  return (
    <div className="p-6">
      <h2 className="text-white mb-2 text-2xl">Technologies</h2>
      <div className="flex p-6 flex-col md:flex-row gap-6 items-start md:items-stretch bg-gray-900 rounded-3xl">
        <ExpSection />
        <div className="flex-1 overflow-x-auto pb-4 md:pb-0">
          <div className="flex gap-4 md:gap-6">
            {skillCards.map((skill) => (
              <SkillCard key={skill.name} {...skill} />
            ))}
          </div>
        </div>
        <ScrollingSkills />
      </div>
    </div>
  );
};

export default Exp;
