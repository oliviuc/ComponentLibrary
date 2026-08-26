import type { ComponentProps } from "react";

import {
    ShadcnAvatar,
    ShadcnAvatarBadge,
    ShadcnAvatarFallback,
    ShadcnAvatarGroup,
    ShadcnAvatarGroupCount,
    ShadcnAvatarImage,
} from "@/components/shadcn/ShadcnAvatar";

/** A photo or initials for a person. */
export function Avatar(props: ComponentProps<typeof ShadcnAvatar>) {
    return <ShadcnAvatar {...props} />;
}

export function AvatarImage(props: ComponentProps<typeof ShadcnAvatarImage>) {
    return <ShadcnAvatarImage {...props} />;
}

export function AvatarFallback(
    props: ComponentProps<typeof ShadcnAvatarFallback>,
) {
    return <ShadcnAvatarFallback {...props} />;
}

export function AvatarBadge(props: ComponentProps<typeof ShadcnAvatarBadge>) {
    return <ShadcnAvatarBadge {...props} />;
}

export function AvatarGroup(props: ComponentProps<typeof ShadcnAvatarGroup>) {
    return <ShadcnAvatarGroup {...props} />;
}

export function AvatarGroupCount(
    props: ComponentProps<typeof ShadcnAvatarGroupCount>,
) {
    return <ShadcnAvatarGroupCount {...props} />;
}
