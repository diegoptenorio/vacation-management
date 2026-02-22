const classes = {
  h1: "text-[25px] font-bold text-black",
  h2: "text-[#80878D]",
  h3: "text-[20px] font-bold text-[#52555E]",
};

import type { TitleProps } from "./TitleProps";

export const Title = ({ children, className = "", type }: TitleProps) => {
    const Component = type as TitleProps["type"];
    return <Component className={`${classes[type]} ${className}`}>{children}</Component>;
}
