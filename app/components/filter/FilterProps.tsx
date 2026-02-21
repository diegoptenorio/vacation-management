export interface TypeProps {
    value: string;
    label: string;
}

export interface QueryParamsProps {
    page: number;
    filterType?: string;
    filterValue?: string;
}

export interface FilterProps {
    action: ({ page, filterType, filterValue }: QueryParamsProps) => void;
    options: TypeProps[];
}
