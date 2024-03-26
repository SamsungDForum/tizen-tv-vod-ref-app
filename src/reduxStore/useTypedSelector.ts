import { useSelector, IRootState, TypedUseSelectorHook } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<IRootState> = useSelector;