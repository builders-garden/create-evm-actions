#!/usr/bin/env node
import art from "ascii-art";
import chalk from "chalk";
import { input, select } from "@inquirer/prompts";
import { evmActions, handleActionCreation } from "./actions.js";

const handleSigTerm = () => {
  console.log(`${chalk.red("EVM Action creation aborted.")}`);
  process.exit(0);
};

process.on("SIGINT", handleSigTerm);
process.on("SIGTERM", handleSigTerm);

const main = async () => {
  try {
    const evmActionsArt = await art.font("EVM Actions", "doom").toPromise();
    console.log(evmActionsArt);
    console.log(
      `[ETHCC Brussels] by 🌳 ${chalk.green("https://builders.garden")}`
    );

    const selectedEVMAction = await select({
      message: "Select an EVM Action template:",
      choices: evmActions,
    });

    const name = await input({
      message: "Enter your desired folder name:",
      default: "evm-action",
    });

    const directory = await input({
      message: "Enter the director where you want to create your EVM Action:",
      default: "./",
    });

    const parsedDirectory =
      directory.charAt(directory.length - 1) === "/"
        ? directory.slice(0, -1)
        : directory;

    const path = `${parsedDirectory}/${name}`;

    handleActionCreation(selectedEVMAction, path);
  } catch (error) {
    console.log(`${chalk.red("EVM Action creation aborted.")}`);
  }
};

main();
