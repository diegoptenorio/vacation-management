"use client";

import type { CardProps } from "./CardProps";

export const Card = ({
    children,
    isWhite = false,
    isFullWidth = true,
}: CardProps) => (
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
