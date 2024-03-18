import { createStrictContext } from "@/shared/lib";
import type { Dispatch, SetStateAction } from "react";

type ColorMenuStore = {
  x: number;
  y: number;
  id: number | null;
  setX: Dispatch<SetStateAction<number>>;
  setY: Dispatch<SetStateAction<number>>;
  setId: Dispatch<SetStateAction<number | null>>;
};

export const ColorMenuContext = createStrictContext<ColorMenuStore>();
