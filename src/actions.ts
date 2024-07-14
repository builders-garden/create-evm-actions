import chalk from "chalk";
import { spawn } from "child_process";
import ora from "ora";

export type EVMAction = {
  description: string;
  value: string;
  name: string;
};

export const evmActions: EVMAction[] = [
  {
    description: "Starter Kit to start building EVM Actions with Next.js",
    value: "https://github.com/builders-garden/evm-actions-starter-nextjs",
    name: "NextJS (Starter Kit)",
  },
  {
    description: "Starter Kit to implement a simple Crowdfunding EVM Action",
    value: "https://github.com/builders-garden/evm-actions-crowdfunding",
    name: "Crowdfunding (NextJS)",
  },
  {
    description: "Starter Kit to implement an 1inch Trade EVM Action",
    value: "https://github.com/builders-garden/evm-actions-trade",
    name: "1inch Swap (NextJS)",
  },
  {
    description:
      "Starter Kit to implement a Safe Proposal Sign EVM Action with Next.js",
    value: "https://github.com/builders-garden/evm-actions-safe",
    name: "Safe Proposal (NextJS)",
  },
  {
    description:
      "Starter Kit to implement a simple Donation EVM Action with Next.js",
    value: "https://github.com/builders-garden/evm-actions-donate",
    name: "Donations (NextJS)",
  },
  {
    description:
      "Starter Kit to implement One-Click-Login with Dynamic and Next.js",
    value: "https://github.com/builders-garden/evm-actions-dynamic-login",
    name: "Dynamic One-Click-Login (NextJS)",
  },
  {
    description:
      "Starter Kit to implement One-Click-Login with Privy and Next.js",
    value: "https://github.com/builders-garden/evm-actions-privy-login",
    name: "Privy One-Click-Login (NextJS)",
  },
  {
    description:
      "Starter Kit to implement Zora NFT mint EVM Action with Next.js",
    value: "https://github.com/builders-garden/evm-actions-zora-mint",
    name: "Zora NFT Mint (NextJS)",
  },
];

export const handleActionCreation = (selectedFrame: string, path: string) => {
  const name = evmActions.find(
    (action) => action.value === selectedFrame
  )?.name;

  return createEVMAction(path, name!, selectedFrame);
};

const createEVMAction = (path: string, name: string, githubUrl: string) => {
  const spinner = ora(`Creating ${name} EVM Action..`).start();

  const execResult = spawn(`npx`, [
    "create-next-app",
    "--example",
    githubUrl,
    path,
  ]);

  execResult.on("exit", (code) => {
    spinner.stop();
    console.log(
      `${chalk.green(`${name} EVM Action created successfully! 🚀`)}`
    );
    process.exit(code);
  });
};
