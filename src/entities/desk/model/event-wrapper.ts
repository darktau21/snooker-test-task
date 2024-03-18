import type { MouseEvent } from "react";

export function eventWrapper(
  ctx: CanvasRenderingContext2D,
  cb: (mouseX: number, mouseY: number, event?: MouseEvent) => void
) {
  return (event: MouseEvent) => {
    const mouseX = event.clientX - ctx.canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - ctx.canvas.getBoundingClientRect().top;
    cb(mouseX, mouseY, event);
  };
}
