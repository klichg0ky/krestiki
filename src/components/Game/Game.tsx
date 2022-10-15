import React from "react";

import { checkMove } from "../../helpers/checkMove";
import { createGameArea } from "../../helpers/createGameArea";
import { gameStatusText } from "../../helpers/gameStatusText";
import { GameStatus, MoveVariants } from "../../models/game";

import { GameArea } from "../GameArea";
import { GameControllers } from "../GameControllers";

import styles from "./Game.module.scss";

const AREA_SIZE = 10;

type CheckMoveStatusEvent = {
  area: string[][];
  rowIndex: number;
  colIndex: number;
};

export const Game: React.FC = () => {
  const [fields, setFields] = React.useState(createGameArea(AREA_SIZE));
  const [move, setMove] = React.useState<MoveVariants>(MoveVariants.X);
  const [winner, setWinner] = React.useState("");
  const [winCount, setWinCount] = React.useState(3);
  const [status, setStatus] = React.useState<GameStatus>(GameStatus.InProcess);
  const [moveCount, setMoveCount] = React.useState(0);
  const [error, setError] = React.useState<number[]>([]);
  const maximumMoveCount = Math.pow(fields.length, 2);

  const checkGameStatus = ({
    rowIndex,
    colIndex,
    area,
  }: CheckMoveStatusEvent) => {
    const gameIsEnded = checkMove({
      rowIndex,
      colIndex,
      area,
      winCount,
      move,
    });
    if (gameIsEnded) {
      alert(`Игра окончена, победил - ${move}`);
      setWinner(move);
      setStatus(GameStatus.End);
    }
  };
  const changeMoveState = () => {
    switch (move) {
      case "x": {
        setMove(MoveVariants.O);
        break;
      }
      case "o": {
        setMove(MoveVariants.X);
        break;
      }
    }
  };

  const makeMove = (rowIndex: number, colIndex: number) => {
    const area = fields.slice();
    if (!area[rowIndex][colIndex]) {
      area[rowIndex][colIndex] = move;
      changeMoveState();
      setFields(area);
      setMoveCount((prev) => prev + 1);
      setError([]);
      if (moveCount + 1 === maximumMoveCount) {
        setStatus(GameStatus.Draw);
        return;
      }
      checkGameStatus({
        area,
        rowIndex,
        colIndex,
      });
      return;
    }
    alert("Это поле уже занято");
    setError([rowIndex, colIndex]);
  };

  const onChangeWinCount = (count: number) => {
    setWinCount(count);
    resetGame();
  };
  const resetGame = () => {
    setFields(createGameArea(AREA_SIZE));
    setStatus(GameStatus.InProcess);
    setMoveCount(0);
    setError([]);
    setMove(MoveVariants.X);
    setWinner("");
  };

  const renderStatus = () => {
    let additionalText = "";
    if (status === GameStatus.End) {
      additionalText = ` - ${winner}`;
    }
    return gameStatusText(status) + additionalText;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Крестики и нолики</h1>
        <div className={styles.status}>{renderStatus()}</div>
        <div className={styles.currentMove}>
          {status === GameStatus.InProcess ? (
            <>
              Текущий ход: <strong> {move}</strong>
            </>
          ) : null}
        </div>
      </header>
      <main>
        <GameArea
          status={status}
          fields={fields}
          makeMove={makeMove}
          error={error}
        />
      </main>
      <GameControllers reset={resetGame} onChangeWinCount={onChangeWinCount} />
    </div>
  );
};
