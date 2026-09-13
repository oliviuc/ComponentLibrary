import {
    get,
    useFieldArray,
    useFormState,
    type FieldArrayPath,
    type FieldArrayWithId,
    type FieldPath,
    type FieldValues,
    type UseFieldArrayAppend,
    type UseFieldArrayInsert,
    type UseFieldArrayMove,
    type UseFieldArrayRemove,
    type UseFormReturn,
} from "react-hook-form";

import { toErrorMessage } from "@/utils/form";

export type FormFieldArrayState<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
> = {
    items: FieldArrayWithId<TFieldValues, TName>[];
    append: UseFieldArrayAppend<TFieldValues, TName>;
    remove: UseFieldArrayRemove;
    move: UseFieldArrayMove;
    insert: UseFieldArrayInsert<TFieldValues, TName>;
    error: string | null;
    isValid: boolean;
    name: TName;
};

/** Manages an array of object rows. Primitive arrays can use `useFormField` instead. */
export function useFormFieldArray<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
>(
    name: TName,
    form?: UseFormReturn<TFieldValues>,
): FormFieldArrayState<TFieldValues, TName> {
    const { fields, append, remove, move, insert } = useFieldArray<
        TFieldValues,
        TName
    >({
        name,
        control: form?.control,
    });
    const { errors } = useFormState<TFieldValues>({
        name: name as FieldPath<TFieldValues>,
        exact: true,
        control: form?.control,
    });
    const fieldError = get(errors, name);
    const error = toErrorMessage(
        fieldError && typeof fieldError === "object"
            ? {
                  message: (fieldError as { message?: unknown }).message,
                  root: (fieldError as { root?: unknown }).root,
              }
            : fieldError,
    );

    return {
        items: fields,
        append,
        remove,
        move,
        insert,
        error,
        isValid: error === null,
        name,
    };
}
