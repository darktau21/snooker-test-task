import { useStrictContext } from "@/shared/lib";
import { DeskContext } from "./desk-store-provider";

export function useDeskStore() {
  return useStrictContext(DeskContext);
}
