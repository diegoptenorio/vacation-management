interface MountStringByQuantityProps {
    quantity?: string;
    singular?: string;
    plural?: string;
}

export default function mountStringByQuantity({
    quantity = "0",
    singular = "",
    plural = ""
}: MountStringByQuantityProps) {
    const quantityNumber = Number(quantity);
    return quantityNumber === 1 ?
        `${quantity} ${singular}`
        :
        `${quantity} ${plural}`;
};