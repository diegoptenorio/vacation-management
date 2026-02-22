import { ReactNode } from "react";

export interface MenuItem {
  id: string;
  label: string;
  leftIcon: ReactNode;
  onClick: () => void;
}

export interface MenuProps {
  actions: MenuItem[];
}
