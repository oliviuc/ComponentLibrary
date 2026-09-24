import type { ComponentProps } from "react";
import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

function ShadcnSpinner({ className, ...props }: ComponentProps<"svg">) {
    return (
        <Loader2Icon
            data-slot="shadcn-spinner"
            role="status"
            aria-label="Loading"
            className={cn(
                "size-4 animate-spin motion-reduce:animate-[spin_1.5s_linear_infinite]",
                className,
            )}
            {...props}
        />
    );
}

export { ShadcnSpinner };
