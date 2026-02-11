import { useState } from "react";
import Image from "next/image";
import SearchIcon from "../../assets/img/search.png"

interface TypeProps {
    value: string;
    label: string;
};

interface QueryParamsProps {
    page: number;
    filterType?: string;
    filterValue?: string;
};

interface FilterProps {
    action: ({ page, filterType, filterValue }: QueryParamsProps) => void;
    options: TypeProps[];
};

export default function Filter({ action, options }: FilterProps) {
    const [form, setForm] = useState({
        type: options[0].value,
        value: "",
    });

    return (
        <form
            className="flex items-center justify-between gap-4 mb-[16px] md:flex-row flex-col"
            onSubmit={(e) => {
                e.preventDefault();
                action({
                    page: 1,
                    filterType: form.type,
                    filterValue: form.value,
                });
            }}
        >
            <span
                className="
                    p-4
                    border border-gray-300 rounded-[19px]
                    text-[#555555] text-[12px] font-bold
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    md:w-auto w-full min-w-fit
                "
            >
                <select
                    className="w-full"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </span>
            <input
                type="text"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                className="
                    p-4 w-full
                    border border-gray-300 rounded-[19px]
                    bg-white
                    text-[#555555] text-[12px]
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                "
            />
            <button
                type="submit"
                className="
                    p-4
                    flex justify-center items-center gap-4 min-w-fit
                    md:w-auto w-full
                    border border-gray-300 rounded-[19px]
                    text-[#555555] text-[12px] font-bold
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                "
            >
                <Image src={SearchIcon} alt="Buscar" width={16} height={16} />
                Buscar
            </button>
        </form>
    );
};
