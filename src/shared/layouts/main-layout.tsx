import type { PropsWithChildren } from "react";
import styles from "./main-layout.module.css";

type MainLayoutProps = PropsWithChildren;

export function MainLayout({ children }: MainLayoutProps) {
  return <main className={styles.layout}>{children}</main>;
}
