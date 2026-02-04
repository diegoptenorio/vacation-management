const classes = {
  h1: "text-[25px] font-bold text-black",
  h2: "text-[#80878D]",
  h3: "text-[20px] font-bold text-[#52555E]",
};

interface TitleProps {
  type: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
}

export default function Title({ children, className = "", type }: TitleProps) {
    const Component = type;
    return  <Component className={`${classes[type]} ${className}`}>{children}</Component>;
}
