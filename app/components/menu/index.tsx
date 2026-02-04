"use client";

import { ReactNode } from "react";
import Image from "next/image";
import ArrowIcon from "../../assets/img/arrow.png";

export interface MenuItem {
  id: string;
  label: string;
  leftIcon: ReactNode;
  onClick: () => void;
}

interface MenuProps {
  actions: MenuItem[];
}

export default function Menu({ actions }: MenuProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={action.onClick}
          className="
            cursor-pointer
            flex
            items-center
            justify-between
            gap-3
            w-full
            px-4
            py-3
          "
        >
          <span className="flex items-center">{action.leftIcon}</span>
          <span className="flex-1 text-left font-medium text-[#555555]">
            {action.label}
          </span>
          <span className="flex items-center">
            <Image src={ArrowIcon} alt="Seta direita" width={10} height={10} />
          </span>
        </button>
      ))}
    </div>
  );
}
