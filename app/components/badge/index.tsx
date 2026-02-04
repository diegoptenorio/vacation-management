interface BadgeProps {
  text: string;
  intention: "default" | "waiting" | "warning" | "danger" | "success";
}

const classes = {
    default: "bg-gray-500",
    waiting: "bg-gray-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
    success: "bg-green-500",
}

export default function Badge({ text, intention }: BadgeProps) {
    return (
        <span className={`px-2 py-1 rounded-full text-[#555555] ${classes[intention]}`}>
            {text}
        </span>
    )
};