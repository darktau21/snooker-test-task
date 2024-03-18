import { createStrictContext } from "@/shared/lib";
import { useReducer, type Dispatch, type PropsWithChildren } from "react";
import { reducer } from "./desk-reducer";
import { deskStore, type DeskStore } from "./desk-store";
import type { Action } from "./actions";

export const DeskContext = createStrictContext<
  DeskStore & { dispatch: Dispatch<Action> }
>();

export function DeskStoreProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, deskStore);

  return (
    <DeskContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DeskContext.Provider>
  );
}
