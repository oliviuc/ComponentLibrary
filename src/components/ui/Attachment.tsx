import type { ComponentProps } from "react";

import {
    ShadcnAttachment,
    ShadcnAttachmentAction,
    ShadcnAttachmentActions,
    ShadcnAttachmentContent,
    ShadcnAttachmentDescription,
    ShadcnAttachmentGroup,
    ShadcnAttachmentMedia,
    ShadcnAttachmentTitle,
    ShadcnAttachmentTrigger,
} from "@/components/shadcn/ShadcnAttachment";

/** A file or image chip, with upload state. */
export function Attachment(props: ComponentProps<typeof ShadcnAttachment>) {
    return <ShadcnAttachment {...props} />;
}

/** A scrolling row of attachments. */
export function AttachmentGroup(
    props: ComponentProps<typeof ShadcnAttachmentGroup>,
) {
    return <ShadcnAttachmentGroup {...props} />;
}

/** The icon or image on an attachment. */
export function AttachmentMedia(
    props: ComponentProps<typeof ShadcnAttachmentMedia>,
) {
    return <ShadcnAttachmentMedia {...props} />;
}

/** The text block of an attachment. */
export function AttachmentContent(
    props: ComponentProps<typeof ShadcnAttachmentContent>,
) {
    return <ShadcnAttachmentContent {...props} />;
}

/** The file name. Shimmers while the attachment is uploading or processing. */
export function AttachmentTitle(
    props: ComponentProps<typeof ShadcnAttachmentTitle>,
) {
    return <ShadcnAttachmentTitle {...props} />;
}

/** Secondary text, such as a file size. */
export function AttachmentDescription(
    props: ComponentProps<typeof ShadcnAttachmentDescription>,
) {
    return <ShadcnAttachmentDescription {...props} />;
}

/** A slot for action buttons. */
export function AttachmentActions(
    props: ComponentProps<typeof ShadcnAttachmentActions>,
) {
    return <ShadcnAttachmentActions {...props} />;
}

/** An icon button on an attachment. */
export function AttachmentAction(
    props: ComponentProps<typeof ShadcnAttachmentAction>,
) {
    return <ShadcnAttachmentAction {...props} />;
}

/** A full-card button. Actions stay clickable above it. */
export function AttachmentTrigger(
    props: ComponentProps<typeof ShadcnAttachmentTrigger>,
) {
    return <ShadcnAttachmentTrigger {...props} />;
}
