import path from "path";
import readline from "readline";
import {
  changeDirectory,
  displayCurrentDirectory,
  goUp,
  listDirectoryContents,
} from "./nwd.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const username = process.argv[2].replace("--username=", "");

console.log(`Welcome to the File Manager, ${username}!\n`);

function exitProgram() {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
}

function promptUser() {
  displayCurrentDirectory();
  rl.question("\nEnter a command:\n", (command) => {
    const args = command.split(" ");
    const operation = args[0];
    const options = args.slice(1);

    switch (operation) {
      case "up":
        goUp();
        break;
      case "cd":
        changeDirectory(options[0]);
        break;
      case "ls":
        listDirectoryContents();
        break;
      case ".exit":
        exitProgram();
        break;
      default:
        console.log("Invalid input");
    }

    promptUser();
  });
}

promptUser();

export default promptUser;
