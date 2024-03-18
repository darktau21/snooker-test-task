import { createPortal } from "react-dom";
import styles from "./change-color-menu.module.css";
import { useColorMenu } from "../model/use-color-menu";
import { Color, setColor, useDeskStore } from "@/entities/desk";

export function ChangeColorMenu() {
  const { id } = useColorMenu();
  const { dispatch } = useDeskStore();
  if (!id) return null;
  return createPortal(
    <div className={styles.wrapper}>
      <ul
        className={styles.menu}
        style={{
          top: 10,
          left: 10,
        }}
      >
        <li
          onClick={() => {
            dispatch(setColor({ id, color: Color.Blue }));
          }}
          className={styles["menu-item"]}
          style={{ backgroundColor: Color.Blue }}
        />
        <li
          className={styles["menu-item"]}
          style={{ backgroundColor: Color.Green }}
          onClick={() => {
            dispatch(setColor({ id, color: Color.Green }));
          }}
        />
        <li
          className={styles["menu-item"]}
          style={{ backgroundColor: Color.Red }}
          onClick={() => {
            dispatch(setColor({ id, color: Color.Red }));
          }}
        />
      </ul>
    </div>,
    document.getElementById("modal")!
  );
}
