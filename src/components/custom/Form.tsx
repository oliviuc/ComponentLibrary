import {
    createContext,
    useContext,
    type ComponentProps,
    type ReactNode,
} from "react";
import { Slot } from "radix-ui";
import {
    FormProvider,
    useFormState,
    type FieldArrayPath,
    type FieldPath,
    type FieldPathValue,
    type FieldValues,
    type Noop,
    type RefCallBack,
    type SubmitErrorHandler,
    type SubmitHandler,
    type UseFormReturn,
    type UseFormStateReturn,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/Label";
import { useFormField, type FormFieldState } from "@/hooks/useFormField";
import {
    useFormFieldArray,
    type FormFieldArrayState,
} from "@/hooks/useFormFieldArray";

type FormFieldContextValue = {
    id: string;
    errorId: string;
    describedBy: string | undefined;
    error: string | null;
    onBlur: Noop;
    inputRef: RefCallBack;
};

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

/** Reads the field a FormField put in context, or null outside one. */
export function useFormFieldContext(): FormFieldContextValue | null {
    return useContext(FormFieldContext);
}

export type FormHandlers<TFieldValues extends FieldValues = FieldValues> = {
    onSubmit?: SubmitHandler<TFieldValues>;
    onInvalid?: SubmitErrorHandler<TFieldValues>;
};

export type FormRootProps<TFieldValues extends FieldValues = FieldValues> =
    Omit<ComponentProps<"form">, "onSubmit" | "noValidate"> & {
        form: UseFormReturn<TFieldValues>;
        handlers: FormHandlers<TFieldValues>;
    };

/** Collects field values and provides them to fields. Does not subscribe to form state. */
export function FormRoot<TFieldValues extends FieldValues = FieldValues>({
    form,
    handlers,
    children,
    className,
    ...formProps
}: FormRootProps<TFieldValues>) {
    return (
        <FormProvider {...form}>
            <form
                data-slot="form"
                noValidate
                onSubmit={form.handleSubmit(
                    (values, event) => handlers.onSubmit?.(values, event),
                    handlers.onInvalid,
                )}
                className={cn("grid gap-4", className)}
                {...formProps}
            >
                {children}
            </form>
        </FormProvider>
    );
}

export type BoundFormProps = Omit<
    ComponentProps<"form">,
    "onSubmit" | "noValidate"
>;

export type FormFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    name: TName;
    children: (
        field: FormFieldState<FieldPathValue<TFieldValues, TName>>,
    ) => ReactNode;
};

/** Binds any control to one field via `value`, `setValue`, `error`, and `isValid`. */
export function FormField<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    name,
    children,
    form,
}: FormFieldProps<TFieldValues, TName> & {
    form?: UseFormReturn<TFieldValues>;
}) {
    const field = useFormField<TFieldValues, TName>(name, form);

    return (
        <FormFieldContext.Provider
            value={{
                id: field.id,
                errorId: field.errorId,
                describedBy: field.describedBy,
                error: field.error,
                onBlur: field.onBlur,
                inputRef: field.ref,
            }}
        >
            {children({
                value: field.value,
                setValue: field.setValue,
                error: field.error,
                isValid: field.isValid,
            })}
        </FormFieldContext.Provider>
    );
}

export type FormFieldComponent<TFieldValues extends FieldValues> = <
    TName extends FieldPath<TFieldValues>,
>(
    props: FormFieldProps<TFieldValues, TName>,
) => ReactNode;

/** Styled field wrapper. Pass className, style, or any div prop. */
export function FormItem({ className, ...props }: ComponentProps<"div">) {
    return (
        <div
            data-slot="form-item"
            className={cn("grid gap-2", className)}
            {...props}
        />
    );
}

/** Names the field and points htmlFor at the control id when inside a FormField. */
export function FormLabel({
    className,
    ...props
}: ComponentProps<typeof Label>) {
    const field = useFormFieldContext();

    return (
        <Label
            data-slot="form-label"
            htmlFor={field?.id}
            data-error={Boolean(field?.error) || undefined}
            className={cn("data-[error=true]:text-destructive", className)}
            {...props}
        />
    );
}

/** Forwards id, ref, blur, and invalid state onto a single child control. */
export function FormControl(props: ComponentProps<typeof Slot.Root>) {
    const context = useFormFieldContext();
    if (!context) {
        throw new Error("FormControl must render inside a FormField.");
    }
    const { id, describedBy, error, inputRef, onBlur } = context;

    return (
        <Slot.Root
            data-slot="form-control"
            id={id}
            ref={inputRef}
            onBlur={onBlur}
            aria-describedby={describedBy}
            aria-invalid={Boolean(error) || undefined}
            {...props}
        />
    );
}

/** Styled field error. Pass the message as children. */
export function FormErrorMessage({
    className,
    children,
    ...props
}: ComponentProps<"p">) {
    const field = useFormFieldContext();

    if (!children) {
        return null;
    }

    return (
        <p
            id={field?.errorId}
            data-slot="form-error-message"
            className={cn("text-sm text-destructive", className)}
            {...props}
        >
            {children}
        </p>
    );
}

export type FormFieldArrayProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
> = {
    name: TName;
    children: (array: FormFieldArrayState<TFieldValues, TName>) => ReactNode;
};

/** Renders a list of object rows with stable keys. */
export function FormFieldArray<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
>({
    name,
    children,
    form,
}: FormFieldArrayProps<TFieldValues, TName> & {
    form?: UseFormReturn<TFieldValues>;
}) {
    const array = useFormFieldArray<TFieldValues, TName>(name, form);
    return children(array);
}

export type FormFieldArrayComponent<TFieldValues extends FieldValues> = <
    TName extends FieldArrayPath<TFieldValues>,
>(
    props: FormFieldArrayProps<TFieldValues, TName>,
) => ReactNode;

export type FormStatusState<TFieldValues extends FieldValues = FieldValues> =
    Pick<
        UseFormStateReturn<TFieldValues>,
        "isSubmitting" | "isValid" | "isDirty" | "isSubmitted" | "errors"
    >;

export type FormStatusProps<TFieldValues extends FieldValues = FieldValues> = {
    children: (status: FormStatusState<TFieldValues>) => ReactNode;
};

/** Subscribes to form-level status without re-rendering the rest of the form. */
export function FormStatus<TFieldValues extends FieldValues = FieldValues>({
    children,
    form,
}: FormStatusProps<TFieldValues> & {
    form?: UseFormReturn<TFieldValues>;
}) {
    const formState = useFormState<TFieldValues>({
        control: form?.control,
    });
    return children(formState);
}

export type FormStatusComponent<TFieldValues extends FieldValues> = (
    props: FormStatusProps<TFieldValues>,
) => ReactNode;

/** Binds Form, FormField, FormFieldArray, and FormStatus to one form. Call once so the identity stays stable. */
export function createFormParts<TFieldValues extends FieldValues>(
    form: UseFormReturn<TFieldValues>,
    handlers: FormHandlers<TFieldValues>,
) {
    function Form(props: BoundFormProps) {
        return <FormRoot form={form} handlers={handlers} {...props} />;
    }

    function BoundFormField<TName extends FieldPath<TFieldValues>>(
        props: FormFieldProps<TFieldValues, TName>,
    ) {
        return <FormField form={form} {...props} />;
    }

    function BoundFormFieldArray<TName extends FieldArrayPath<TFieldValues>>(
        props: FormFieldArrayProps<TFieldValues, TName>,
    ) {
        return <FormFieldArray form={form} {...props} />;
    }

    function BoundFormStatus(props: FormStatusProps<TFieldValues>) {
        return <FormStatus form={form} {...props} />;
    }

    return {
        Form,
        FormField: BoundFormField as FormFieldComponent<TFieldValues>,
        FormFieldArray:
            BoundFormFieldArray as FormFieldArrayComponent<TFieldValues>,
        FormStatus: BoundFormStatus as FormStatusComponent<TFieldValues>,
    };
}
