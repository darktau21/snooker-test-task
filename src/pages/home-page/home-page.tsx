import { Desk } from "../../entities/desk/ui/desk";
import styles from "./home-page.module.css";

export function HomePage() {
  return (
    <div className={styles.page}>
      <Desk />
    </div>
  );
}
