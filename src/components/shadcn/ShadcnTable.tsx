import * as React from "react";

import { cn } from "@/lib/utils";

function ShadcnTable({ className, ...props }: React.ComponentProps<"table">) {
    return (
        <div
            data-slot="shadcn-table-container"
            className="relative w-full overflow-x-auto"
        >
            <table
                data-slot="shadcn-table"
                className={cn("w-full caption-bottom text-sm", className)}
                {...props}
            />
        </div>
    );
}

function ShadcnTableHeader({
    className,
    ...props
}: React.ComponentProps<"thead">) {
    return (
        <thead
            data-slot="shadcn-table-header"
            className={cn("[&_tr]:border-b", className)}
            {...props}
        />
    );
}

function ShadcnTableBody({
    className,
    ...props
}: React.ComponentProps<"tbody">) {
    return (
        <tbody
            data-slot="shadcn-table-body"
            className={cn("[&_tr:last-child]:border-0", className)}
            {...props}
        />
    );
}

function ShadcnTableFooter({
    className,
    ...props
}: React.ComponentProps<"tfoot">) {
    return (
        <tfoot
            data-slot="shadcn-table-footer"
            className={cn(
                "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
                className,
            )}
            {...props}
        />
    );
}

function ShadcnTableRow({ className, ...props }: React.ComponentProps<"tr">) {
    return (
        <tr
            data-slot="shadcn-table-row"
            className={cn(
                "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
                className,
            )}
            {...props}
        />
    );
}

function ShadcnTableHead({ className, ...props }: React.ComponentProps<"th">) {
    return (
        <th
            data-slot="shadcn-table-head"
            className={cn(
                "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
                className,
            )}
            {...props}
        />
    );
}

function ShadcnTableCell({ className, ...props }: React.ComponentProps<"td">) {
    return (
        <td
            data-slot="shadcn-table-cell"
            className={cn(
                "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
                className,
            )}
            {...props}
        />
    );
}

function ShadcnTableCaption({
    className,
    ...props
}: React.ComponentProps<"caption">) {
    return (
        <caption
            data-slot="shadcn-table-caption"
            className={cn("mt-4 text-sm text-muted-foreground", className)}
            {...props}
        />
    );
}

export {
    ShadcnTable,
    ShadcnTableHeader,
    ShadcnTableBody,
    ShadcnTableFooter,
    ShadcnTableHead,
    ShadcnTableRow,
    ShadcnTableCell,
    ShadcnTableCaption,
};
