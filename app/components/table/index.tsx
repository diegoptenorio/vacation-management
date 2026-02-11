import Badge from "../badge";
import { ContentProps } from "../../features/vacation-list/useVacationList";

interface TableProps {
    header: string[];
    content: ContentProps[] | [];
}

export default function Table({ header, content }: TableProps) {
    return (
        <table className="w-full text-left">
            <thead className="hidden md:table-header-group">
                <tr>
                    {header.map((title, index) => (
                        <th
                            className="py-2 text-[#555555] text-[12px]"
                            key={index}
                        >
                            {title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {content.map((vacation, index) => (
                    <tr key={index} className="md:border-t border-[#DDCBEC]">
                        <td
                            className="
                            flex md:table-cell
                            justify-between
                            py-2 md:py-4
                            text-[#555555] text-[12px]
                            border-b md:border-0 border-[#DDCBEC]
                        "
                        >
                            <Badge intention={vacation.status.value} label={vacation.status.label} />
                        </td>
                        <td
                            className="
                            flex md:table-cell
                            justify-between
                            py-2 md:py-4
                            text-[#555555] text-[12px]
                            border-b md:border-0 border-[#DDCBEC]
                        "
                        >
                            {vacation.name}
                        </td>
                        <td
                            className="
                            flex md:table-cell
                            justify-between
                            py-2 md:py-4
                            text-[#555555] text-[12px]
                            border-b md:border-0 border-[#DDCBEC]
                        "
                        >
                            {new Date(vacation.start_date).toLocaleDateString(
                                "pt-BR",
                            )}
                        </td>
                        <td
                            className="
                            flex md:table-cell
                            justify-between
                            py-2 md:py-4
                            text-[#555555] text-[12px]
                            border-b md:border-0 border-[#DDCBEC]
                        "
                        >
                            {new Date(vacation.end_date).toLocaleDateString(
                                "pt-BR",
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
