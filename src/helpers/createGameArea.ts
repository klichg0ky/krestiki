export function createGameArea(count: number) {
  const list: string[][] = [];

  for (let i = 0; i < count; i++) {
    list.push(new Array(count).fill(""));
  }
  return list;
}
