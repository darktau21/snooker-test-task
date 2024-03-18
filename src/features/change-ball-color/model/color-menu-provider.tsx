import { useState, type PropsWithChildren } from "react";
import { ColorMenuContext } from "./color-menu-context";

type ColorMenuProviderProps = PropsWithChildren;

export function ColorMenuProvider({ children }: ColorMenuProviderProps) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [id, setId] = useState<null | number>(null);

  return (
    <ColorMenuContext.Provider value={{ x, y, id, setId, setX, setY }}>
      {children}
    </ColorMenuContext.Provider>
  );
}
