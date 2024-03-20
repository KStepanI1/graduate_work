import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localStorage";

export type WithPagination<T> = T & {
  limit?: number;
  offset?: number;
};

export type ResponseWitchCount<T> = { count: number; rows: T };

export const $api = axios.create({
  baseURL: __API__,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem(USER_LOCALSTORAGE_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export type ApiClearFilterElementType = {
  operator: "Eq" | "Le" | "Ge" | "Lt" | "Gt" | "Has" | "Ne";
  key: string[] | string;
  value:
    | number[]
    | number
    | (string | number)[]
    | string
    | string[]
    | boolean
    | undefined;
};

export type ApiFilterElementType =
  | ApiClearFilterElementType
  | false
  | undefined
  | null;

export type ApiFilterType = ApiFilterElementType[];

type ApiQueryType = {
  [key: string]: any;
};

class Api {
  protected _api: typeof $api = $api;
  private _abortController = new AbortController();
  private _defaultConfig = {};

  protected getCustomConfig = <T>(config: ConfigType<T>) => {
    return Object.assign(
      {},
      { signal: this._abortController.signal },
      config,
      this._defaultConfig
    );
  };

  protected parseFilter(filter?: ApiFilterType): string {
    if (!filter) return "";

    const filterOptions: string[] = [];

    const clearFilter: ApiClearFilterElementType[] = filter.filter(
      Boolean
    ) as unknown as ApiClearFilterElementType[];

    clearFilter.forEach(({ key, value, operator }) => {
      const keyString = typeof key === "string" ? key : key.join("_");
      const valueString =
        typeof value === "object" ? value.join(",") : value?.toString();

      if (valueString)
        filterOptions.push(`${keyString} ${operator} ${valueString}`);
    });

    return filterOptions.join(";");
  }

  protected parseQuery(queryParams: ApiQueryType): string {
    const queryParamsEntries = Object.entries(queryParams);

    const someParam = !!queryParamsEntries.filter(([_, value]) => !!value)
      .length;

    if (someParam)
      return (
        "?" +
        queryParamsEntries
          .map(([key, value]) => (value ? `${key}=${value}` : null))
          .filter(Boolean)
          .join("&")
      );

    return "";
  }

  protected async _get<R>({ url, config }: DefaultController<R>) {
    return this._api.get<R>(url, this.getCustomConfig(config));
  }

  protected async _post<T, R>({
    url,
    body,
    config,
  }: DefaultControllerWithBody<T>) {
    return this._api.post<T, AxiosResponse<R>>(
      url,
      body,
      this.getCustomConfig(config)
    );
  }

  protected async _put<T, R>({
    url,
    body,
    config,
  }: DefaultControllerWithBody<T>) {
    return this._api.put<T, AxiosResponse<R>>(
      url,
      body,
      this.getCustomConfig(config)
    );
  }

  protected async _patch<T, R>({
    url,
    body,
    config,
  }: DefaultControllerWithBody<T>) {
    return this._api.patch<T, AxiosResponse<R>>(
      url,
      body,
      this.getCustomConfig(config)
    );
  }

  protected async _delete<R>({ url, config }: DefaultController<R>) {
    return this._api.delete<R>(url, this.getCustomConfig(config));
  }

  async cancelRequests() {
    if (this._abortController) this._abortController.abort();
    this._abortController = new AbortController();
  }
}

type ConfigType<T> = AxiosRequestConfig<T> | undefined;

interface DefaultController<T> {
  url: string;
  config?: ConfigType<T>;
  onError?: VoidFunction;
  errorMessage?: string;
  showErrorToast?: boolean;
}

interface DefaultControllerWithBody<T> extends DefaultController<T> {
  body?: T;
}

export { Api };
