import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;
