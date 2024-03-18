import type { TBall } from "@/entities/desk";
import { MAX_THROWING_SPEED } from "./constants";

export function dragStart(balls: TBall[], mouseX: number, mouseY: number) {
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    const distance = Math.sqrt((mouseX - ball.x) ** 2 + (mouseY - ball.y) ** 2);
    if (distance <= ball.radius) {
      ball.isDragging = true;
      break;
    }
  }
  return balls;
}

export function ballMove(balls: TBall[], mouseX: number, mouseY: number) {
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    if (ball.isDragging) {
      const dx = mouseX - ball.x;
      const dy = mouseY - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = Math.min(distance * 0.1, MAX_THROWING_SPEED);

      ball.dx = (dx / distance) * speed;
      ball.dy = (dy / distance) * speed;
    }
  }

  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    if (ball.isDragging) {
      for (let j = 0; j < balls.length; j++) {
        if (i !== j) {
          const otherBall = balls[j];
          const distanceX = otherBall.x - ball.x;
          const distanceY = otherBall.y - ball.y;
          const distance = Math.sqrt(
            distanceX * distanceX + distanceY * distanceY
          );
          if (distance < ball.radius + otherBall.radius) {
            const overlap =
              0.5 * (ball.radius + otherBall.radius - distance + 1);
            ball.x -= overlap * (distanceX / distance);
            ball.y -= overlap * (distanceY / distance);
          }
        }
      }
    }
  }
  return balls;
}

export function dragEnd(balls: TBall[]) {
  balls.forEach((ball) => (ball.isDragging = false));
  return balls;
}
