import React from "react";

import styles from "./GameControllers.module.scss";

interface Props {
  reset(): void;
  onChangeWinCount(count: number): void;
}

const variants = [3, 4, 5];
export const GameControllers: React.FC<Props> = ({
  reset,
  onChangeWinCount,
}) => {
  return (
    <footer className={styles.container}>
      <button onClick={reset} className={styles.button}>
        Заново
      </button>
      <select
        onChange={(event) => {
          onChangeWinCount(Number(event.currentTarget.value));
        }}
        className={styles.select}
      >
        {variants.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </footer>
  );
};
