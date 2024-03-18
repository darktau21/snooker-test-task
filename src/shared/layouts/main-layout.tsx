import type { PropsWithChildren } from "react";
import styles from "./main-layout.module.css";
import { createPortal } from "react-dom";

type MainLayoutProps = PropsWithChildren;

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className={styles.layout}>
      {children}
      {createPortal(
        <div className={styles.tip}>
          Шары перетаскиваются, если использовать просто onMouseMove - на них
          невозможно кликнуть
        </div>,
        document.getElementById("modal")!
      )}
    </main>
  );
}
