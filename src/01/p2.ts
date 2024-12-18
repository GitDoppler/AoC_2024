import { readFileSync } from "fs";

function getDataFromFile(filePath: string): string | Error {
  try {
    return readFileSync(filePath, "utf-8");
  } catch (err) {
    return err instanceof Error ? err : new Error(String(err));
  }
}

function getListsFromFile(data: string): number[][] {
  return data
    .split(/\s+/g)
    .filter((line) => line.length > 0)
    .reduce<number[][]>(
      (acc, number, indexNumber) =>
        acc.map((list, indexList) =>
          indexList === indexNumber % 2 ? [...list, Number(number)] : list,
        ),
      [[], []],
    );
}

function calculateSimilarityScore(lists: number[][]): number {
  return lists[0].reduce((score, number, indexNumber) => {
    return (
      score +
      number *
        lists[1].reduce(
          (acc, compared) => (compared === number ? acc + 1 : acc),
          0,
        )
    );
  }, 0);
}

function main(): void {
  const inputFile = "./input.txt";

  const data: string | Error = getDataFromFile(inputFile);
  if (data instanceof Error) {
    console.error(data);
    return;
  }

  const lists: number[][] = getListsFromFile(data);
  const score = calculateSimilarityScore(lists);
  console.log(score);
}

main();
