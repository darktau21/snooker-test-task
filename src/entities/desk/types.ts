export type Ball = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  id: number;
  isDragging: boolean;
  color: Color;
};

export enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue",
}
