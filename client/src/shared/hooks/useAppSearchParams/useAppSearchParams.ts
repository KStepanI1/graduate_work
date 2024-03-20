import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export interface UseAppSearchParamsOptions {
    removeAfterUnmount?: boolean;
    replace?: boolean;
}

export interface UseAppSearchParamsArgs {
    key: string;
    value: string;
    options?: UseAppSearchParamsOptions;
}

export type UseAppSearchParamsResult = string | null;

export const useAppSearchParam = ({
    key,
    value,
    options = {},
}: UseAppSearchParamsArgs): UseAppSearchParamsResult => {
    const [searchParams, setSearchParams] = useSearchParams();

    const { removeAfterUnmount = true, replace = true } = options;

    const searchParamValue = searchParams.get(key);

    useEffect(() => {
        const pathName = window.location.pathname;
        searchParams.set(key, value);
        setSearchParams(searchParams, { replace });

        return () => {
            if (removeAfterUnmount && pathName === window.location.pathname) {
                searchParams.delete(key);
                setSearchParams(searchParams, { replace });
            }
        };
    }, [
        key,
        removeAfterUnmount,
        replace,
        searchParams,
        setSearchParams,
        value,
    ]);

    return searchParamValue;
};
