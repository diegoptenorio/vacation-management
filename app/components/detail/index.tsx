import Badge from "../../components/badge";
import Image from "next/image";
import ArrowIcon from "../../assets/img/arrow.png";
import mountStringByQuantity from "../../../utils/match-string-to-quantity";

interface ListProps {
    quantity?: string;
    intention: "default" | "waiting" | "warning" | "danger" | "success";
    alternativeText?: string;
}

export default function Detail({ quantity, intention, alternativeText }: ListProps) {
    return (
        <div className="flex flex-row justify-between mt-4">
            <Badge intention={intention} alternativeText={alternativeText} />
            <button className="flex flex-row align-right items-center text-[#555555] text-[12px]">
                {mountStringByQuantity({
                    quantity: quantity,
                    singular: " pessoa",
                    plural: " pessoas",
                })}
                <Image
                    className="ml-2"
                    src={ArrowIcon}
                    alt="Seta direita"
                    width={10}
                    height={10}
                />
            </button>
        </div>
    );
}
