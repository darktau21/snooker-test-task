import {
  BORDER_WIDTH,
  Ball,
  Color,
  Desk,
  calculateCollisions,
  drawBall,
} from "@/entities/desk";
import { ChangeColorMenu, useColorMenu } from "@/features/change-ball-color";
import { ballMove, dragEnd, dragStart } from "@/features/move-balls";
import { useResizeObserver } from "@/shared/lib";
import { useRef, useState } from "react";
import styles from "./home-page.module.css";

export function HomePage() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);
  const { setId } = useColorMenu();

  useResizeObserver(pageRef, (target) => {
    const { height, width } = target.contentRect;
    setHeight(height - BORDER_WIDTH * 2);
    setWidth(width - BORDER_WIDTH * 2);
  });

  return (
    <div ref={pageRef} className={styles.page}>
      <Desk
        borderWidth={BORDER_WIDTH}
        height={height}
        width={width}
        renderBall={({ x, y, radius, color }, ctx) =>
          drawBall(ctx, x, y, radius, color)
        }
        calculateCollisions={calculateCollisions}
        ballMove={ballMove}
        dragEnd={dragEnd}
        dragStart={dragStart}
        onClick={(ball) => {
          setId(ball.id);
        }}
        clearClick={() => {
          setId(null);
        }}
      />
      <Ball
        id={1}
        radius={30}
        x={150}
        y={100}
        dx={1}
        dy={-1.5}
        color={Color.Blue}
      />
      <Ball
        id={2}
        radius={50}
        x={200}
        y={400}
        dx={-1.5}
        dy={1}
        color={Color.Red}
      />
      <Ball
        id={3}
        radius={80}
        x={100}
        y={400}
        dx={1}
        dy={0.5}
        color={Color.Green}
      />
      <ChangeColorMenu />
    </div>
  );
}
