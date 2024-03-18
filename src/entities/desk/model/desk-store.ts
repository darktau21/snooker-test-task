import type { Ball } from "../types";
export type DeskStore = {
  balls: Ball[];
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D | null;
};

export const deskStore: DeskStore = {
  balls: [],
  width: 0,
  height: 0,
  ctx: null,
};
