import { useState, type BaseSyntheticEvent, type ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    useForm as useRhfForm,
    useFormState,
    type FieldValues,
    type SubmitErrorHandler,
    type SubmitHandler,
    type UseFormProps,
    type UseFormReturn,
} from "react-hook-form";
import type { ZodType } from "zod";

import {
    createFormParts,
    FormControl,
    FormErrorMessage,
    FormItem,
    FormLabel,
    type BoundFormProps,
    type FormFieldArrayComponent,
    type FormFieldComponent,
    type FormHandlers,
} from "@/components/custom/Form";

export type UseFormOptions<
    TFieldValues extends FieldValues = FieldValues,
    TContext = unknown,
    TTransformedValues = TFieldValues,
> = Omit<
    UseFormProps<TFieldValues, TContext, TTransformedValues>,
    "resolver"
> & {
    schema?: ZodType<TFieldValues, TFieldValues>;
    onSubmit?: SubmitHandler<TFieldValues>;
    onInvalid?: SubmitErrorHandler<TFieldValues>;
};

export type UseFormResult<TFieldValues extends FieldValues = FieldValues> =
    UseFormReturn<TFieldValues> & {
        form: UseFormReturn<TFieldValues>;
        submit: (event?: BaseSyntheticEvent) => Promise<boolean>;
        isSubmitting: boolean;
        Form: (props: BoundFormProps) => ReactNode;
        FormField: FormFieldComponent<TFieldValues>;
        FormFieldArray: FormFieldArrayComponent<TFieldValues>;
        FormItem: typeof FormItem;
        FormLabel: typeof FormLabel;
        FormControl: typeof FormControl;
        FormErrorMessage: typeof FormErrorMessage;
    };

/** Creates a typed form and the components bound to it. */
export function useForm<TFieldValues extends FieldValues = FieldValues>({
    schema,
    mode = "onChange",
    reValidateMode = "onChange",
    onSubmit,
    onInvalid,
    ...options
}: UseFormOptions<TFieldValues> = {}): UseFormResult<TFieldValues> {
    const form = useRhfForm<TFieldValues>({
        ...options,
        mode,
        reValidateMode,
        resolver: schema ? zodResolver(schema) : undefined,
    });

    const [handlers] = useState<FormHandlers<TFieldValues>>(() => ({}));
    // Latest handlers on a stable object so Form, created once, never remounts.
    // eslint-disable-next-line react-hooks/immutability -- holder is not rendered state
    handlers.onSubmit = onSubmit;
    // eslint-disable-next-line react-hooks/immutability -- holder is not rendered state
    handlers.onInvalid = onInvalid;

    // Created once. A new identity each render would remount every field.
    const [parts] = useState(() => createFormParts(form, handlers));

    const { isSubmitting } = useFormState({ control: form.control });

    const submit = async (event?: BaseSyntheticEvent) => {
        let submitted = false;
        await form.handleSubmit(async (values, submitEvent) => {
            await handlers.onSubmit?.(values, submitEvent);
            submitted = true;
        }, handlers.onInvalid)(event);
        return submitted;
    };

    return {
        ...form,
        form,
        submit,
        isSubmitting,
        ...parts,
        FormItem,
        FormLabel,
        FormControl,
        FormErrorMessage,
    };
}
