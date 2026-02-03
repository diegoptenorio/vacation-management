"use client";

interface ButtonProps {
  disabled?: boolean;
  text: string;
  onClick: () => void;
  variant?: "active" | "default";
}

export default function Button({
  text,
  onClick,
  disabled = false,
  variant = "default",
}: ButtonProps) {
  const baseClasses = `
    cursor-pointer
    rounded-[19px]
    font-bold
    text-[15px]
    px-[25px]
    py-[16px]
    transition-colors
    disabled:bg-gray-400
    disabled:cursor-default
    w-full
    sm:w-auto
  `;

  const variants = {
    active: "bg-[#D3475E] text-white",
    default: "bg-[#EAEAEA] text-[#1D1D1D]",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {text}
    </button>
  );
}
