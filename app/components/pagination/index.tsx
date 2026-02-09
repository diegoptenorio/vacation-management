import Image from "next/image";
import ArrowIcon from "../../assets/img/arrow.png";

interface paginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    totalPages,
    currentPage,
    onPageChange,
}: paginationProps) {
    return (
        <div className="flex items-center justify-end gap-2 mt-4">
            {currentPage > 1 && (
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    className="flex items-center gap-1 text-[#D3475E] text-[12px] font-bold cursor-pointer"
                >
                    <Image
                        className="transform -scale-x-100"
                        src={ArrowIcon}
                        alt="Seta direita"
                        width={10}
                        height={10}
                    />
                    Anterior
                </button>
            )}
            {currentPage < totalPages && (
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    className="flex items-center gap-1 text-[#D3475E] text-[12px] font-bold cursor-pointer"
                >
                    Próximo
                    <Image
                        src={ArrowIcon}
                        alt="Seta direita"
                        width={10}
                        height={10}
                    />
                </button>
            )}
        </div>
    );
}
