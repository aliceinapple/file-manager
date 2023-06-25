import readline from "readline";
import {
  changeDirectory,
  displayCurrentDirectory,
  goUp,
  listDirectoryContents,
} from "./nwd.js";
import {
  copyFile,
  createFile,
  deleteFile,
  moveFile,
  readFile,
  renameFile,
} from "./fs.js";
import { handleOSCommand } from "./os.js";
import { calculateHash } from "./hash.js";
import { compressFile, decompressFile } from "./zip.js";
import {
  resetStyle,
  textBold,
  textColorBlue,
  textColorMagenta,
  textColorRed,
  textUnderline,
} from "./textStyles.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const username = process.argv[2].replace("--username=", "");

console.log(
  textColorMagenta +
    textBold +
    `Welcome to the File Manager, ${username}!\n` +
    resetStyle
);

function exitProgram() {
  console.log(
    textColorBlue +
      textBold +
      `\nThank you for using File Manager, ${username}, goodbye!` +
      resetStyle
  );
  process.exit(0);
}

function promptUser() {
  displayCurrentDirectory();
  rl.question(
    textColorMagenta + textUnderline + "\nEnter a command:\n" + resetStyle,
    (command) => {
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
        case "cat":
          readFile(options[0]);
          break;
        case "add":
          createFile(options[0]);
          break;
        case "rn":
          renameFile(options[0], options[1]);
          break;
        case "cp":
          copyFile(options[0], options[1]);
          break;
        case "mv":
          moveFile(options[0], options[1]);
          break;
        case "rm":
          deleteFile(options[0]);
          break;
        case "os":
          handleOSCommand(options);
          break;
        case "hash":
          calculateHash(options[0]);
          break;
        case "compress":
          compressFile(options[0], options[1]);
          break;
        case "decompress":
          decompressFile(options[0], options[1]);
          break;
        default:
          console.log(textColorRed + "Invalid input" + resetStyle);
      }

      promptUser();
    }
  );
}

promptUser();
