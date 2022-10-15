import clsx from "clsx";
import React from "react";
import { GameStatus } from "../../models/game";

import styles from "./GameArea.module.scss";

interface Props {
  fields: string[][];
  error: number[];
  status: GameStatus;
  makeMove(rowIndex: number, colIndex: number): void;
}
export const GameArea: React.FC<Props> = ({
  fields,
  status,
  error,
  makeMove,
}) => {
  return (
    <div className={styles.game}>
      {fields.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className={styles.row}>
            {row.map((col, colIndex) => {
              const hasError = error.length
                ? error[0] === rowIndex && error[1] === colIndex
                : false;
              return (
                <button
                  onClick={() => makeMove(rowIndex, colIndex)}
                  disabled={status !== GameStatus.InProcess}
                  key={colIndex}
                  style={{
                    color: col === "x" ? "green" : "red",
                  }}
                  className={clsx(
                    styles.field,
                    hasError ? styles.fieldError : null
                  )}
                >
                  {col}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
