import { ContentProps } from "../../features/vacation-list/useVacationList";

export interface TableProps {
    header: string[];
    content: ContentProps[] | [];
}
