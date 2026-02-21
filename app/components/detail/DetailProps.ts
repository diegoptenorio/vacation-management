export interface DetailProps {
    quantity?: string;
    intention: "default" | "waiting" | "warning" | "danger" | "success";
    alternativeText: string;
}
