import { readFileSync } from "fs";

function isWordMatch(
  matrix: string[][],
  startCol: number,
  startRow: number,
  numRows: number,
  numCols: number,
): boolean {
  const topRow: number = startRow - 1;
  const bottomRow: number = startRow + 1;
  const leftCol: number = startCol - 1;
  const rightCol: number = startCol + 1;

  if (
    topRow < 0 ||
    bottomRow >= numRows ||
    leftCol < 0 ||
    rightCol >= numCols
  ) {
    return false;
  }

  const mainDiagonal: boolean =
    (matrix[topRow][leftCol] === "M" && matrix[bottomRow][rightCol] === "S") ||
    (matrix[topRow][leftCol] === "S" && matrix[bottomRow][rightCol] === "M");

  const secondaryDiagonal: boolean =
    (matrix[bottomRow][leftCol] === "M" && matrix[topRow][rightCol] === "S") ||
    (matrix[bottomRow][leftCol] === "S" && matrix[topRow][rightCol] === "M");

  return mainDiagonal && secondaryDiagonal;
}

function countWordMatches(matrix: string[][]): number {
  const numRows: number = matrix.length;
  if (numRows === 0) return -1;
  const numCols: number = matrix[0].length;

  return matrix.reduce((count, row, indexRow) => {
    return (
      count +
      row.reduce((rowCount, letter, indexLetter) => {
        return (
          rowCount +
          (letter === "A" &&
          isWordMatch(matrix, indexLetter, indexRow, numRows, numCols)
            ? 1
            : 0)
        );
      }, 0)
    );
  }, 0);
}

function readMatrixFromFile(filePath: string): string[][] {
  const data: string = readFileSync(filePath, "utf-8");
  return data
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((row) => row.split(""));
}

function main(): void {
  const inputFile = "./input.txt";

  try {
    const matrix = readMatrixFromFile(inputFile);
    const totalMatches = countWordMatches(matrix);
    console.log(totalMatches);
  } catch (err) {
    console.error(err);
  }
}

main();
