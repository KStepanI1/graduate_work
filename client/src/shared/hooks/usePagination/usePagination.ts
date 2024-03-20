import { useState, useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export interface AppPaginationState {
    pageIndex: number;
    pageSize: number;
}

const PAGE_PARAMS_KEY = "page";
const LIMIT_PARAMS_KEY = "limit";

export const usePagination = (options?: {
    initialLimit: number;
    defaultPage?: number;
    changeLimitHandler?: (newLimit: number) => void;
    changePageHandler?: (newPage: number) => void;
}): {
    pagination: AppPaginationState;
    onPaginationChange: (newPagination: AppPaginationState) => void;
    offset: number;
    limit: number;
    setPagination: React.Dispatch<React.SetStateAction<AppPaginationState>>;
    resetPagination: () => void;
} => {
    const {
        initialLimit = 10,
        defaultPage = 1,
        changeLimitHandler,
        changePageHandler,
    } = options || {};
    const [searchParams, setSearchParams] = useSearchParams();

    const paramsPage = Number(searchParams.get(PAGE_PARAMS_KEY));
    const paramsLimit = Number(searchParams.get(LIMIT_PARAMS_KEY));

    const defaultPagination = useMemo(() => {
        return {
            pageIndex: paramsPage ? paramsPage - 1 : defaultPage - 1,
            pageSize: paramsLimit || initialLimit,
        };
    }, [defaultPage, initialLimit, paramsLimit, paramsPage]);

    const [pagination, setPagination] =
        useState<AppPaginationState>(defaultPagination);

    const onPaginationChange = useCallback(
        (newPagination: AppPaginationState) => {
            setPagination(newPagination);
        },
        []
    );

    useEffect(() => {
        searchParams.set(LIMIT_PARAMS_KEY, pagination.pageSize.toString());
        changeLimitHandler?.(pagination.pageSize);
        setSearchParams(searchParams, { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination.pageSize]);

    useEffect(() => {
        searchParams.set(
            PAGE_PARAMS_KEY,
            (pagination.pageIndex + 1).toString()
        );
        changePageHandler?.(pagination.pageIndex);
        setSearchParams(searchParams, { replace: true });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination.pageIndex]);

    const resetPagination = useCallback(() => {
        setPagination(defaultPagination);
    }, [defaultPagination]);

    const offset = pagination.pageSize * pagination.pageIndex;

    return {
        pagination,
        onPaginationChange,
        offset,
        limit: pagination.pageSize,
        setPagination,
        resetPagination,
    };
};
