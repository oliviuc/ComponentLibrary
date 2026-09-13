import { useId, type SetStateAction } from "react";
import {
    useController,
    type FieldPath,
    type FieldPathValue,
    type FieldValues,
    type Noop,
    type RefCallBack,
    type UseFormReturn,
} from "react-hook-form";

import { resolveNextValue, toErrorMessage } from "@/utils/form";

export type FormFieldState<TValue> = {
    value: TValue;
    setValue: (next: SetStateAction<TValue>) => void;
    error: string | null;
    isValid: boolean;
};

export type UseFormFieldReturn<TValue> = FormFieldState<TValue> & {
    name: string;
    id: string;
    errorId: string;
    describedBy: string | undefined;
    onBlur: Noop;
    ref: RefCallBack;
    isDirty: boolean;
    isTouched: boolean;
    disabled: boolean;
};

/** Reads one form field. Re-renders only when that field's value or error changes. */
export function useFormField<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
    name: TName,
    form?: UseFormReturn<TFieldValues>,
): UseFormFieldReturn<FieldPathValue<TFieldValues, TName>> {
    const { field, fieldState } = useController<TFieldValues, TName>({
        name,
        control: form?.control,
    });
    const id = useId();

    type TValue = FieldPathValue<TFieldValues, TName>;
    const error = toErrorMessage(fieldState.error);
    const errorId = `${id}-error`;

    const setValue = (next: SetStateAction<TValue>) => {
        const current = (form?.getValues(name) ?? field.value) as TValue;
        // Wrap in a synthetic event: field.onChange runs getEventValue, which
        // unwraps any object carrying a `target` key and would corrupt the value.
        field.onChange({
            target: { name, value: resolveNextValue(next, current) },
        });
    };

    return {
        value: field.value as TValue,
        setValue,
        error,
        isValid: error === null,
        name,
        id,
        errorId,
        describedBy: error ? errorId : undefined,
        onBlur: field.onBlur,
        ref: field.ref,
        isDirty: fieldState.isDirty,
        isTouched: fieldState.isTouched,
        disabled: field.disabled ?? false,
    };
}
