import { useStrictContext } from "@/shared/lib";
import { ColorMenuContext } from "./color-menu-context";

export function useColorMenu() {
  return useStrictContext(ColorMenuContext);
}
