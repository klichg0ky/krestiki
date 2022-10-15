import { MoveVariants } from "../models/game";

export type ChangeMoveEvent = {
  area: string[][];
  winCount: number;
  rowIndex: number;
  colIndex: number;
  move: MoveVariants;
};

function checkMoveRow({
  area,
  winCount,
  colIndex,
  rowIndex,
  move,
}: ChangeMoveEvent) {
  let currentSameCount = 1;
  const currentRow = area[rowIndex];
  if (colIndex > 0) {
    for (let i = colIndex - 1; i !== 0; i--) {
      if (move !== currentRow[i]) {
        break;
      }
      currentSameCount++;
      if (currentSameCount === winCount) {
        return true;
      }
    }
  }
  for (let i = colIndex + 1; i < currentRow.length; i++) {
    if (move !== currentRow[i]) {
      break;
    }
    currentSameCount++;
    if (currentSameCount === winCount) {
      return true;
    }
  }
  return false;
}

function checkMoveHeight({
  area,
  winCount,
  colIndex,
  rowIndex,
  move,
}: ChangeMoveEvent) {
  let currentSameCount = 1;
  if (rowIndex > 0) {
    for (let i = rowIndex - 1; i >= 0; i--) {
      if (move !== area[i][colIndex]) {
        break;
      }
      currentSameCount++;
      if (currentSameCount === winCount) {
        return true;
      }
    }
  }

  for (let i = rowIndex + 1; i < area.length; i++) {
    if (move !== area[i][colIndex]) {
      break;
    }
    currentSameCount++;
    if (currentSameCount === winCount) {
      return true;
    }
  }
  return false;
}

function checkMoveDiagonalLeft({
  area,
  winCount,
  colIndex,
  rowIndex,
  move,
}: ChangeMoveEvent) {
  let currentSameCount = 1;

  if (rowIndex > 0) {
    let [col, row] = [colIndex - 1, rowIndex - 1];
    while (col >= 0 && row >= 0) {
      if (move !== area[row][col]) {
        break;
      }
      currentSameCount++;
      if (currentSameCount === winCount) {
        return true;
      }
      row--;
      col--;
    }
  }
  let [col, row] = [colIndex + 1, rowIndex + 1];
  while (col < area.length && row < area.length) {
    if (move !== area[row][col]) {
      break;
    }
    currentSameCount++;
    if (currentSameCount === winCount) {
      return true;
    }
    row++;
    col++;
  }
  return false;
}

function checkMoveDiagonalRight({
  area,
  winCount,
  colIndex,
  rowIndex,
  move,
}: ChangeMoveEvent) {
  let currentSameCount = 1;

  if (rowIndex > 0) {
    let [col, row] = [colIndex + 1, rowIndex - 1];
    while (col >= 0 && row >= 0) {
      if (move !== area[row][col]) {
        break;
      }
      currentSameCount++;
      if (currentSameCount === winCount) {
        return true;
      }
      row--;
      col++;
    }
  }

  let [col, row] = [colIndex - 1, rowIndex + 1];
  while (col >= 0 && row < area.length) {
    if (move !== area[row][col]) {
      break;
    }
    currentSameCount++;
    if (currentSameCount === winCount) {
      return true;
    }
    row++;
    col--;
  }

  return false;
}
/* @TODO: В будущем хотелось бы возвращать какая комбинация дала нам 
выигрыш для возможности выделения, example: [[rowIndex, colIndex]...]
*/
export function checkMove(event: ChangeMoveEvent) {
  checkMoveDiagonalRight(event);
  return (
    checkMoveRow(event) ||
    checkMoveHeight(event) ||
    checkMoveDiagonalLeft(event) ||
    checkMoveDiagonalRight(event)
  );
}
