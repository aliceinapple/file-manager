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

const exitProgram = () => {
  console.log(
    textColorBlue +
      textBold +
      `\nThank you for using File Manager, ${username}, goodbye!` +
      resetStyle
  );
  process.exit(0);
};

const promptUser = () => {
  rl.prompt();
  displayCurrentDirectory();
  console.log(
    textUnderline + textColorMagenta + "Enter your code:" + resetStyle
  );
};

const handleCommand = async (command) => {
  const args = command.trim().split(" ");
  const operation = args[0];
  const options = args.slice(1);

  switch (operation) {
    case "up":
      goUp();
      break;
    case "cd":
      await changeDirectory(options[0]);
      break;
    case "ls":
      await listDirectoryContents();
      break;
    case ".exit":
      exitProgram();
      break;
    case "cat":
      await readFile(options[0]);
      break;
    case "add":
      await createFile(options[0]);
      break;
    case "rn":
      await renameFile(options[0], options[1]);
      break;
    case "cp":
      await copyFile(options[0], options[1]);
      break;
    case "mv":
      await moveFile(options[0], options[1]);
      break;
    case "rm":
      await deleteFile(options[0]);
      break;
    case "os":
      handleOSCommand(options);
      break;
    case "hash":
      calculateHash(options[0]);
      break;
    case "compress":
      await compressFile(options[0], options[1]);
      break;
    case "decompress":
      await decompressFile(options[0], options[1]);
      break;
    default:
      console.log(textColorRed + "Invalid input" + resetStyle);
  }

  promptUser();
};

rl.on("line", async (command) => {
  await handleCommand(command);
});

rl.on("SIGINT", () => {
  exitProgram();
});

promptUser();
