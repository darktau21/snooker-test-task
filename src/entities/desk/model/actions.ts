import type { Ball, Color } from "../types";

type Sizes = [width: number, height: number];

type SetBallsPayload = Ball[] | ((balls: Ball[]) => Ball[]);

type SetColorPayload = { id: number; color: Color };

export type Action =
  | {
      type: "SET_BALLS";
      payload: SetBallsPayload;
    }
  | {
      type: "SET_CTX";
      payload: CanvasRenderingContext2D;
    }
  | {
      type: "SET_SIZE";
      payload: Sizes;
    }
  | {
      type: "ADD_BALL";
      payload: Ball;
    }
  | {
      type: "REMOVE_BALL";
      payload: number;
    }
  | {
      type: "SET_COLOR";
      payload: SetColorPayload;
    };

type ActionCreator<TPayload> = (payload: TPayload) => Action;

export const setBalls: ActionCreator<SetBallsPayload> = (balls) => ({
  payload: balls,
  type: "SET_BALLS",
});

export const setCtx: ActionCreator<CanvasRenderingContext2D> = (payload) => ({
  type: "SET_CTX",
  payload,
});

export const setSize: ActionCreator<Sizes> = (payload) => ({
  type: "SET_SIZE",
  payload,
});

export const addBall: ActionCreator<Ball> = (payload) => ({
  type: "ADD_BALL",
  payload,
});

export const removeBall: ActionCreator<number> = (payload) => ({
  type: "REMOVE_BALL",
  payload,
});

export const setColor: ActionCreator<SetColorPayload> = (payload) => ({
  type: "SET_COLOR",
  payload,
});
