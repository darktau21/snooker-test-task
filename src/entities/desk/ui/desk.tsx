import { useEffect, useRef, type PropsWithChildren } from "react";
import styles from "./desk.module.css";

type DeskProps = PropsWithChildren;

export function Desk() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) {
      return;
    }
    const ctx = canvasRef.current.getContext("2d")!;
  }, []);

  return <canvas ref={canvasRef} className={styles.desk} />;
}
