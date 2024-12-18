# Advent of Code 2024

This repository contains my solutions for [Advent of Code 2024](https://adventofcode.com/2024), implemented in TypeScript. My approach prioritizes functional programming principles, emphasizing immutability, composition, and type safety. This project is an experiment to explore how functional TypeScript would look and behave in practice.

## Features

- **Functional Programming**: Solutions leverage functional paradigms such as `Result` types for error handling and utility functions for composition.
- **Type Safety**: Strict TypeScript types are used throughout to catch errors early.
- **`neverthrow` Library**: The `Result` type from `neverthrow` is used to handle errors without exceptions.
- **TSX Runner**: Solutions are executed using [TSX](https://github.com/esbuild-kit/tsx) for fast and straightforward script execution.

## Prerequisites

To run the code, you'll need:

- [Node.js](https://nodejs.org/) (v22 or later, the latest LTS version)
- Dependencies installed via `npm install`:
  - [TSX](https://github.com/esbuild-kit/tsx)
  - [neverthrow](https://github.com/supermacro/neverthrow)
  - `@types/node`

## Project Structure

Each day's solution is organized into its own directory under `src/`, with separate files for each part of the puzzle and the corresponding input.

Example project structure:
```
.
├── src
│   ├── 01
│   │   ├── p1.ts
│   │   ├── p2.ts
│   │   └── input.txt
│   ├── 02
│   │   ├── p1.ts
│   │   ├── p2.ts
│   │   └── input.txt
│   └── util
│       └── util.ts
├── package.json
└── tsconfig.json
```

## Running a Solution

To run a specific solution, you can:

1. Navigate to the directory containing the file and execute:
   ```bash
   npm tsx p1.ts
   ```

   OR

2. From the root of the project, provide the relative path to the file:
   ```bash
   npm tsx src/01/p1.ts
   ```

## Performance Notes

While functional programming can introduce performance overhead compared to imperative approaches, this project does not intentionally trade performance for elegance or readability. Any inefficiencies in the code are likely due to my lack of experience with functional programming and are part of the learning process in this experiment.

## Contributing
Feel free to open an issue or submit a pull request if you find a bug or have suggestions for improvement.

## License
This repository is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgments
- [Advent of Code](https://adventofcode.com/) by Eric Wastl
- [neverthrow](https://github.com/supermacro/neverthrow) for providing a robust `Result` type
- [TSX](https://github.com/esbuild-kit/tsx) for seamless TypeScript execution
