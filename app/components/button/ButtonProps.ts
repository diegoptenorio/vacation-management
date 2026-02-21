export interface ButtonProps {
    disabled?: boolean;
    text: string;
    onClick: () => void;
    variant?: "active" | "default";
}