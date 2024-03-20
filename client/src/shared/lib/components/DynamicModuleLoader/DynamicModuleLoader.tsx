import { Reducer } from "@reduxjs/toolkit";
import {
  ReduxStoreWithManager,
  StateSchemaKey,
} from "app/providers/StoreProvider/config/StateSchema";
import { ReactNode, useEffect } from "react";
import { useStore } from "react-redux";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
};

type ReducersListEntry = [StateSchemaKey, Reducer];

export interface DynamicModuleLoaderProps {
  children: ReactNode;
  reducers: ReducersList;
  removeAfterUmount?: boolean;
}

const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
  const { children, reducers, removeAfterUmount = true } = props;

  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const entries = Object.entries(reducers);
    entries.forEach(([key, reducer]: ReducersListEntry) => {
      store.reducerManager.add(key, reducer);
      dispatch({ type: `@INIT ${key} reducer` });
    });

    return () => {
      if (removeAfterUmount) {
        entries.forEach(([key]: ReducersListEntry) => {
          store.reducerManager.remove(key);
          dispatch({ type: `@DESTROY ${key} reducer` });
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default DynamicModuleLoader;
