import { $api } from "shared/api/api";
import {
    ReducersMapObject,
    ThunkMiddleware,
    Tuple,
    UnknownAction,
    configureStore,
} from "@reduxjs/toolkit";
import { StateSchema, ThunkExtraArg } from "./StateSchema";
import { userReducer } from "entities/User";
import { createReducerManager } from "./reducerManager";
import logger from "redux-logger";
import { cartReducer } from "entities/Cart";

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        cart: cartReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: $api,
        // navigate,
    };

    const store = configureStore<StateSchema>({
        // @ts-ignore
        reducer: reducerManager.reduce as ReducersMapObject<StateSchema>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
            }).concat(logger) as unknown as Tuple<
                [ThunkMiddleware<StateSchema, UnknownAction, ThunkExtraArg>]
            >,
    });

    return { ...store, reducerManager };
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
