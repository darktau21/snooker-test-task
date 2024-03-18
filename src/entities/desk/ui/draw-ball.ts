import type { Color } from "../types";

export function drawBall(
  ctx: CanvasRenderingContext2D | null,
  x: number,
  y: number,
  radius: number,
  color: Color
) {
  if (!ctx) {
    return;
  }
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}
