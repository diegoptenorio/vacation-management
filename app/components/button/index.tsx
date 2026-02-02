"use client";

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: "active" | "default";
}

export default function Button({
  text,
  onClick,
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
  `;

  const variants = {
    active: "bg-[#D3475E] text-white",
    default: "bg-[#EAEAEA] text-[#1D1D1D]",
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]}`}>
      {text}
    </button>
  );
}
