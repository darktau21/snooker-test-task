import { addBall, removeBall, useDeskStore } from "@/entities/desk";
import { useEffect } from "react";
import type { Ball } from "../types";

type BallProps = Omit<Ball, "isDragging">;

export function Ball({ id, radius, x, y, dx, dy, color }: BallProps) {
  const { dispatch } = useDeskStore();

  useEffect(() => {
    dispatch(
      addBall({
        id,
        radius,
        x,
        y,
        dx,
        dy,
        isDragging: false,
        color,
      })
    );

    return () => {
      dispatch(removeBall(id));
    };
  }, [dispatch, id, radius, x, y, dx, dy, color]);

  return null;
}
