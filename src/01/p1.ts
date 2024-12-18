import * as fs from "fs";
import { Result, ok, err } from "neverthrow";
import { traverse } from "../util/util";

function fileContent(filePath: string): Result<string, Error> {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return ok(data);
  } catch (error) {
    if (error instanceof Error) return err(error);

    return err(new Error("Unknown error occurred while reading the file."));
  }
}

function numberFromString(str: string): Result<number, Error> {
  const num = Number(str);
  return isNaN(num) ? err(new Error(`Invalid number: "${str}"`)) : ok(num);
}

function nonEmptyTokens(data: string): Result<string[], Error> {
  const tokens = data.split(/\s+/g).filter((token) => token.length > 0);
  if (tokens.length === 0) return err(new Error("Input file is empty."));
  return ok(tokens);
}

function groupedAndSortedNumbers(tokens: string[]): Result<number[][], Error> {
  const parsedNumbers = traverse(tokens, numberFromString);

  const splitLists = parsedNumbers.map((numbers) =>
    numbers.reduce(
      (acc, num, index) => {
        acc[index % 2].push(num);
        return acc;
      },
      [[], []] as number[][],
    ),
  );

  const sortedLists = splitLists.map((lists) =>
    lists.map((list) => list.toSorted((a, b) => a - b)),
  );

  return sortedLists;
}

function distanceBetweenLists([list1, list2]: number[][]): Result<
  number,
  Error
> {
  if (list1.length !== list2.length)
    return err(new Error("The lengths of the lists are not equal"));

  return ok(
    list1.reduce((acc, num, idx) => acc + Math.abs(num - list2[idx]), 0),
  );
}

function main(): void {
  const inputFile: string = "input.txt";

  fileContent(inputFile)
    .andThen(nonEmptyTokens)
    .andThen(groupedAndSortedNumbers)
    .andThen(distanceBetweenLists)
    .match(
      (distance) => {
        console.log(`Calculated Distance: ${distance}`);
      },
      (error) => {
        console.error(`Error: ${error.message}`);
      },
    );
}

main();
