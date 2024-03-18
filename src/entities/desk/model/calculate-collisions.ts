import { FRICTION, RESTITUTION_COEFFICIENT } from "../constants";
import type { Ball } from "../types";

export function calculateCollisions(
  balls: Ball[],
  width: number,
  height: number
) {
  balls.forEach((ball) => {
    ball.x += ball.dx;
    ball.y += ball.dy;

    ball.dx *= 1 - FRICTION;
    ball.dy *= 1 - FRICTION;

    if (
      ball.x + ball.dx > width - ball.radius ||
      ball.x + ball.dx < ball.radius
    ) {
      ball.dx = -ball.dx;
    }
    if (
      ball.y + ball.dy > height - ball.radius ||
      ball.y + ball.dy < ball.radius
    ) {
      ball.dy = -ball.dy;
    }
  });

  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      const ball1 = balls[i];
      const ball2 = balls[j];
      const distanceX = ball2.x - ball1.x;
      const distanceY = ball2.y - ball1.y;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < ball1.radius + ball2.radius) {
        const collisionAngle = Math.atan2(distanceY, distanceX);
        const speed1 = Math.sqrt(ball1.dx * ball1.dx + ball1.dy * ball1.dy);
        const speed2 = Math.sqrt(ball2.dx * ball2.dx + ball2.dy * ball2.dy);
        const direction1 = Math.atan2(ball1.dy, ball1.dx);
        const direction2 = Math.atan2(ball2.dy, ball2.dx);

        const newSpeed1X = speed1 * Math.cos(direction1 - collisionAngle);
        const newSpeed1Y = speed1 * Math.sin(direction1 - collisionAngle);
        const newSpeed2X = speed2 * Math.cos(direction2 - collisionAngle);
        const newSpeed2Y = speed2 * Math.sin(direction2 - collisionAngle);

        const finalSpeed1X =
          ((ball1.radius - ball2.radius) * newSpeed1X +
            (ball2.radius + ball2.radius) * newSpeed2X) /
          (ball1.radius + ball2.radius);
        const finalSpeed2X =
          ((ball1.radius + ball1.radius) * newSpeed1X +
            (ball2.radius - ball1.radius) * newSpeed2X) /
          (ball1.radius + ball2.radius);

        ball1.dx =
          Math.cos(collisionAngle) * finalSpeed1X +
          Math.cos(collisionAngle + Math.PI / 2) * newSpeed1Y;
        ball1.dy =
          Math.sin(collisionAngle) * finalSpeed1X +
          Math.sin(collisionAngle + Math.PI / 2) * newSpeed1Y;
        ball2.dx =
          Math.cos(collisionAngle) * finalSpeed2X +
          Math.cos(collisionAngle + Math.PI / 2) * newSpeed2Y;
        ball2.dy =
          Math.sin(collisionAngle) * finalSpeed2X +
          Math.sin(collisionAngle + Math.PI / 2) * newSpeed2Y;

        ball1.dx *= RESTITUTION_COEFFICIENT;
        ball1.dy *= RESTITUTION_COEFFICIENT;
        ball2.dx *= RESTITUTION_COEFFICIENT;
        ball2.dy *= RESTITUTION_COEFFICIENT;

        const overlap = 0.5 * (ball1.radius + ball2.radius - distance + 1);
        ball1.x -= overlap * Math.cos(collisionAngle);
        ball1.y -= overlap * Math.sin(collisionAngle);
        ball2.x += overlap * Math.cos(collisionAngle);
        ball2.y += overlap * Math.sin(collisionAngle);
      }
    }
  }
  return balls;
}
