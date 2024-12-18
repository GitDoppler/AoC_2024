import * as fs from "fs";

const WORD = "XMAS";
const WORD_SIZE = 4;
const SEARCH_DIRECTIONS = [
  { rowStep: 0, colStep: -1 }, // left
  { rowStep: 0, colStep: 1 }, // right
  { rowStep: -1, colStep: 0 }, // up
  { rowStep: 1, colStep: 0 }, // down
  { rowStep: -1, colStep: -1 }, // left up diagonal
  { rowStep: -1, colStep: 1 }, // right up diagonal
  { rowStep: 1, colStep: -1 }, // left down diagonal
  { rowStep: 1, colStep: 1 }, // right up diagonal
];

function isWordMatch(
  matrix: string[],
  startRow: number,
  startCol: number,
  rowStep: number,
  colStep: number,
): boolean {
  for (let i = 0; i < WORD_SIZE; i++) {
    if (matrix[startRow + i * rowStep][startCol + i * colStep] != WORD[i])
      return false;
  }
  return true;
}

function countWordMatches(
  matrix: string[],
  startRow: number,
  startCol: number,
): number {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  let cntMatches = 0;

  SEARCH_DIRECTIONS.forEach((direction) => {
    const endRow = startRow + (WORD_SIZE - 1) * direction.rowStep;
    const endCol = startCol + (WORD_SIZE - 1) * direction.colStep;

    if (endCol >= 0 && endCol < numCols && endRow >= 0 && endRow < numRows) {
      if (
        isWordMatch(
          matrix,
          startRow,
          startCol,
          direction.rowStep,
          direction.colStep,
        )
      ) {
        cntMatches++;
      }
    }
  });

  return cntMatches;
}

try {
  const data = fs.readFileSync("./input.txt", "utf8");
  const matrix = data.split("\n").filter((line) => line.length > 0);

  let totalMatches = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === "X") {
        totalMatches += countWordMatches(matrix, i, j);
      }
    }
  }

  console.log(totalMatches);
} catch (err) {
  console.error(err);
}
