interface BadgeProps {
    intention: "default" | "waiting" | "warning" | "danger" | "success";
    alternativeText?: string;
}

const classes = {
    default: "bg-[#E6E6E6]",
    waiting: "bg-[#EDE1F7]",
    warning: "bg-[#FCE5A8]",
    danger: "bg-[#FFD3D3]",
    success: "bg-green-500",
};

const messages = {
    default: "Não iniciado",
    waiting: "Em andamento",
    warning: "Em aprovação",
    danger: "Expirado",
    success: "Aprovado",
};

export default function Badge({ intention, alternativeText }: BadgeProps) {
    return (
        <span
            className={`px-4 py-2 rounded-full text-[#555555] text-[12px] ${classes[intention]}`}
        >
            {alternativeText ?? messages[intention]}
        </span>
    );
};