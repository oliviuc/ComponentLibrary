import z from "zod";
import { formatDateParam, parseDateParam } from "@/utils/date";

export type TQueryParams<TShape extends z.ZodRawShape> = {
    [TKey in keyof TShape]?: z.output<TShape[TKey]>;
};

export type TQueryParamsUpdate<TShape extends z.ZodRawShape> = {
    [TKey in keyof TShape]?: z.output<TShape[TKey]> | null;
};

export interface IQueryParamsResult<TShape extends z.ZodRawShape> {
    params: TQueryParams<TShape>;
    stringParams: string;
    setParams: (update: TQueryParamsUpdate<TShape>) => void;
    clearAllParams: () => void;
}

export type UseQueryParamsProps<TShape extends z.ZodRawShape> = {
    schema: z.ZodObject<TShape>;
    searchParams: string;
    setSearchParams: (searchParams: string) => void;
};

export const useQueryParams = <TShape extends z.ZodRawShape>({
    schema,
    searchParams,
    setSearchParams,
}: UseQueryParamsProps<TShape>): IQueryParamsResult<TShape> => {
    const parsedSearchParams = new URLSearchParams(searchParams);
    const params = Object.fromEntries(
        Object.entries(schema.shape).map(([key, field]) => [
            key,
            parseParam(field, parsedSearchParams.getAll(key)),
        ]),
    ) as TQueryParams<TShape>;
    const stringParams = toSearchString(params);
    const setParams = (update: TQueryParamsUpdate<TShape>) => {
        const nextParams = new URLSearchParams(searchParams);
        Object.entries(update).forEach(([key, value]) => {
            nextParams.delete(key);
            toSearchValues(value).forEach((searchValue) =>
                nextParams.append(key, searchValue),
            );
        });
        setSearchParams(nextParams.toString());
    };
    const clearAllParams = () => {
        const clearUpdate = Object.fromEntries(
            Object.keys(schema.shape).map((key) => [key, null]),
        ) as TQueryParamsUpdate<TShape>;
        setParams(clearUpdate);
    };
    return { params, stringParams, setParams, clearAllParams };
};

interface IParamDef {
    type: string;
    innerType?: z.core.$ZodType;
    in?: z.core.$ZodType;
}

const getParamType = (field: z.core.$ZodType): string => {
    const def = field._zod.def as IParamDef;
    const innerField = def.innerType ?? def.in;
    if (innerField) return getParamType(innerField);
    return def.type;
};

const parseParam = (field: z.core.$ZodType, values: string[]) => {
    const paramType = getParamType(field);
    if (values.length === 0) return z.safeParse(field, undefined).data;
    if (paramType === "array") return z.safeParse(field, values).data;
    if (paramType === "date")
        return z.safeParse(field, parseDateParam(values[0])).data;
    return z.safeParse(field, values[0]).data;
};

const toSearchValues = (value: unknown): string[] => {
    if (value == null || value === "") return [];
    if (Array.isArray(value)) return value.flatMap(toSearchValues);
    if (value instanceof Date) return [formatDateParam(value)];
    return [String(value)];
};

const toSearchString = (params: Record<string, unknown>): string => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        toSearchValues(value).forEach((searchValue) =>
            searchParams.append(key, searchValue),
        );
    });
    return searchParams.toString();
};
