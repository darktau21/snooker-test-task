import { useEffect, useLayoutEffect, useRef } from "react";
import { setBalls, setCtx, setSize } from "../model/actions";
import { useDeskStore } from "../model/use-desk-store";
import type { Ball } from "../types";
import styles from "./desk.module.css";
import { eventWrapper } from "../model/event-wrapper";

type DeskProps = {
  width: number;
  height: number;
  borderWidth: number;
  renderBall: (ball: Ball, ctx: CanvasRenderingContext2D) => void;
  calculateCollisions: (
    ball: Ball[],
    width: number,
    height: number,
    friction: number,
    restitutionCoefficient: number
  ) => Ball[];
  dragStart: (balls: Ball[], mouseX: number, mouseY: number) => Ball[];
  ballMove: (balls: Ball[], mouseX: number, mouseY: number) => Ball[];
  dragEnd: (balls: Ball[]) => Ball[];
  onClick: (ball: Ball) => void;
  clearClick: () => void;
};

export function Desk({
  width,
  height,
  borderWidth,
  renderBall,
  calculateCollisions,
  ballMove,
  dragEnd,
  dragStart,
  onClick,
  clearClick,
}: DeskProps) {
  const { dispatch, ctx, balls } = useDeskStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) {
      return;
    }
    dispatch(setCtx(ctx));
    dispatch(setSize([width, height]));
  }, [dispatch, width, height]);

  useLayoutEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      if (!ctx) return;
      dispatch(
        setBalls((balls) => {
          ctx.beginPath();
          ctx.clearRect(0, 0, width, height);
          balls.forEach((ball) => renderBall(ball, ctx));
          return calculateCollisions(balls, width, height, 0.001, 0.8);
        })
      );
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [ctx, dispatch, calculateCollisions, renderBall, width, height]);

  return (
    <canvas
      style={{
        border: `${borderWidth}px solid #a1662f`,
      }}
      width={width}
      height={height}
      ref={canvasRef}
      className={styles.desk}
      onMouseDown={
        ctx
          ? eventWrapper(ctx, (mouseX, mouseY) => {
              dispatch(setBalls((balls) => dragStart(balls, mouseX, mouseY)));
              const target = balls.find(
                (ball) =>
                  (mouseX - ball.x) ** 2 - (mouseY - ball.y) ** 2 <=
                  ball.radius ** 2
              );
              if (!target) return;
              onClick(target);
            })
          : undefined
      }
      onMouseMove={
        ctx
          ? eventWrapper(ctx, (mouseX, mouseY, event) => {
              if (event?.buttons === 1) {
                clearClick();
              }
              dispatch(setBalls((balls) => ballMove(balls, mouseX, mouseY)));
            })
          : undefined
      }
      onMouseUp={() => {
        dispatch(setBalls((balls) => dragEnd(balls)));
      }}
    />
  );
}
