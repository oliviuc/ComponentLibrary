import type { ComponentProps } from "react";

import {
    ShadcnTable,
    ShadcnTableBody,
    ShadcnTableCaption,
    ShadcnTableCell,
    ShadcnTableFooter,
    ShadcnTableHead,
    ShadcnTableHeader,
    ShadcnTableRow,
} from "@/components/shadcn/ShadcnTable";

/** Rows of related data in columns. */
export function Table(props: ComponentProps<typeof ShadcnTable>) {
    return <ShadcnTable {...props} />;
}

export function TableHeader(props: ComponentProps<typeof ShadcnTableHeader>) {
    return <ShadcnTableHeader {...props} />;
}

export function TableBody(props: ComponentProps<typeof ShadcnTableBody>) {
    return <ShadcnTableBody {...props} />;
}

export function TableFooter(props: ComponentProps<typeof ShadcnTableFooter>) {
    return <ShadcnTableFooter {...props} />;
}

export function TableHead(props: ComponentProps<typeof ShadcnTableHead>) {
    return <ShadcnTableHead {...props} />;
}

export function TableRow(props: ComponentProps<typeof ShadcnTableRow>) {
    return <ShadcnTableRow {...props} />;
}

export function TableCell(props: ComponentProps<typeof ShadcnTableCell>) {
    return <ShadcnTableCell {...props} />;
}

export function TableCaption(props: ComponentProps<typeof ShadcnTableCaption>) {
    return <ShadcnTableCaption {...props} />;
}
