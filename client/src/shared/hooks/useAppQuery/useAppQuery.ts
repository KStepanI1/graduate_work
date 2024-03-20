import {
  QueryClient,
  QueryKey,
  UndefinedInitialDataOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export type UseAppQueryResult<TData, TError, TResponseData> = UseQueryResult<
  TData,
  TError
> & {
  responseData: TResponseData;
};

export const useAppQuery = <
  TResponseData = unknown,
  TQueryFnData = AxiosResponse,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
  queryClient?: QueryClient
): UseAppQueryResult<TData, TError, TResponseData> => {
  const query = useQuery(options, queryClient);
  const responseData = (query.data as AxiosResponse)?.data;

  return { ...query, responseData };
};
