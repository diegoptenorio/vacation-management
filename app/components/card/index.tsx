"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  isWhite?: boolean;
  isFullWidth?: boolean;
}

export default function Card({ children, isWhite = false, isFullWidth = true }: CardProps) {
  return (
    <div
      className={`
        rounded-[19px]
        p-6
        ${isWhite ? "bg-white" : "bg-[#F9F8FA] border border-[#DDCBEC]"}
        ${isFullWidth ? `w-full` : "w-full max-w-[512px]"}
      `}
    >
      {children}
    </div>
  );
}
