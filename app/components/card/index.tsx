"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div
      className="
        bg-[#F9F8FA]
        border
        border-[#DDCBEC]
        rounded-[19px]
        p-6
      "
    >
      {children}
    </div>
  );
}
