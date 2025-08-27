#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0")
  .arguments("<filepath1> <filepath2>")
  .option("-f, --format [type]", "output format")
  .action((filepath1, filepath2, options) => {
    // пока просто выводим полученные данные
    console.log("File 1:", filepath1);
    console.log("File 2:", filepath2);
    console.log("Format:", options.format);
  });

program.parse(process.argv);
