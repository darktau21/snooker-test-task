import type { Action } from "./actions";
import type { DeskStore } from "./desk-store";

export function reducer(state: DeskStore, action: Action): DeskStore {
  switch (action.type) {
    case "SET_BALLS":
      if (Array.isArray(action.payload)) {
        return { ...state, balls: action.payload };
      }
      return {
        ...state,
        balls: action.payload(state.balls.map((b) => ({ ...b }))),
      };
    case "SET_CTX":
      return { ...state, ctx: action.payload };
    case "SET_SIZE":
      return { ...state, width: action.payload[0], height: action.payload[1] };
    case "ADD_BALL":
      return { ...state, balls: [...state.balls, action.payload] };
    case "REMOVE_BALL":
      return {
        ...state,
        balls: state.balls.filter((b) => b.id !== action.payload),
      };
    case "SET_COLOR": {
      const target = state.balls.find((b) => b.id === action.payload.id);
      if (!target) {
        return state;
      }
      return {
        ...state,
        balls: [
          ...state.balls.filter((b) => b.id !== action.payload.id),
          { ...target, color: action.payload.color },
        ],
      };
    }
  }
}
