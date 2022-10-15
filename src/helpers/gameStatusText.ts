import { GameStatus } from "../models/game";

export function gameStatusText(status: GameStatus) {
  switch (status) {
    case GameStatus.Draw: {
      return "Ньчья";
    }
    case GameStatus.End: {
      return "Есть победитель";
    }
    case GameStatus.InProcess: {
      return "Игра идет";
    }
  }
}
