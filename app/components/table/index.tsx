import Badge from "../badge";

interface ContentProps {
    id: string;
    name: string;
    start_date: string;
    end_date: string;
    status: "default" | "waiting" | "warning" | "danger" | "success";
}

interface TableProps {
    header: string[];
    content: ContentProps[] | [];
}

export default function Table({ header, content }: TableProps) {
    return (
        <table className="w-full text-left">
            <thead>
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
                    <tr key={index} className="border-t border-[#DDCBEC]">
                        <td className="py-4 text-[#555555] text-[12px]">
                            <Badge intention={vacation.status} />
                        </td>
                        <td className="py-4 text-[#555555] text-[12px]">
                            {vacation.name}
                        </td>
                        <td className="py-4 text-[#555555] text-[12px]">
                            {vacation.start_date}
                        </td>
                        <td className="py-4 text-[#555555] text-[12px]">
                            {vacation.end_date}
                        </td>
                        <td className="py-4 text-[#555555] text-[12px]"></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
