"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface Lesson {
  id: number;
  title: string;
  completed: boolean;
}

const lessons: Lesson[] = [
  { id: 1, title: "Introduction to Next.js", completed: false },
  { id: 2, title: "Routing in Next.js", completed: false },
  { id: 3, title: "Data Fetching", completed: false },
  { id: 4, title: "API Routes", completed: false },
  { id: 5, title: "Deployment", completed: false },
];

export default function Roadmap() {
  const [userProgress, setUserProgress] = useState<number>(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  useEffect(() => {
    const storedProgress = localStorage.getItem("roadmapProgress");
    if (storedProgress) {
      const parsedProgress = JSON.parse(storedProgress);
      setUserProgress(parsedProgress.progress);
      setCompletedLessons(parsedProgress.completed);
    }
  }, []);

  const handleLessonClick = (lessonId: number) => {
    toast.success(`Navigating to lesson ${lessonId}`, {
      icon: "🚀",
      duration: 2000,
    });

    if (!completedLessons.includes(lessonId)) {
      const newCompletedLessons = [...completedLessons, lessonId];
      setCompletedLessons(newCompletedLessons);
      const newProgress = (newCompletedLessons.length / lessons.length) * 100;
      setUserProgress(newProgress);
      localStorage.setItem(
        "roadmapProgress",
        JSON.stringify({
          progress: newProgress,
          completed: newCompletedLessons,
        })
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Next.js Learning Roadmap
      </h1>
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200"></div>
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full z-10"
          style={{ top: `${userProgress}%` }}
          initial={{ top: 0 }}
          animate={{ top: `${userProgress}%` }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <Image
            src="/placeholder.svg"
            width={32}
            height={32}
            alt="User Avatar"
            className="w-full h-full rounded-full"
          />
        </motion.div>
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            className={`flex items-center mb-8 ${
              index % 2 === 0 ? "flex-row-reverse" : ""
            }`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="w-1/2 px-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  completedLessons.includes(lesson.id)
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
                onClick={() => handleLessonClick(lesson.id)}
                aria-label={`Go to lesson: ${lesson.title}`}
              >
                {completedLessons.includes(lesson.id) ? (
                  <CheckCircleIcon className="w-8 h-8" />
                ) : (
                  <ChevronRightIcon className="w-8 h-8" />
                )}
              </motion.button>
            </div>
            <div
              className={`w-1/2 px-4 ${
                index % 2 === 0 ? "text-right" : "text-left"
              }`}
            >
              <h3 className="text-lg font-semibold">{lesson.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
