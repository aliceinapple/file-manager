import fs from "fs";
import path from "path";

export function getCurrentDirectory() {
  return path.resolve(process.cwd());
}

export function displayCurrentDirectory() {
  console.log(`You are currently in ${getCurrentDirectory()}`);
}

export function goUp() {
  const currentDirectory = getCurrentDirectory();
  const parentDirectory = path.dirname(currentDirectory);

  if (currentDirectory !== parentDirectory) {
    process.chdir(parentDirectory);
  }
}

export function changeDirectory(directoryPath) {
  const currentDirectory = getCurrentDirectory();
  const newDirectory = path.resolve(currentDirectory, directoryPath);

  fs.stat(newDirectory, (err, stats) => {
    if (err) {
      console.error("Invalid directory path");
    } else if (stats.isDirectory()) {
      process.chdir(newDirectory);
      displayCurrentDirectory();
    } else {
      console.error("Not a directory");
    }
  });
}

export function listDirectoryContents() {
  const currentDirectory = process.cwd();
  console.log("You are currently in", currentDirectory);

  fs.readdir(currentDirectory, (err, files) => {
    if (err) {
      console.log("Operation failed", err);
    }

    files.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    const formattedFiles = files.map((file, index) => {
      const filePath = path.join(currentDirectory, file);
      const fileType = fs.statSync(filePath).isDirectory() ? "Folder" : "File";
      return { index: index + 1, name: file, type: fileType };
    });

    const maxLength = formattedFiles.reduce(
      (max, file) => Math.max(max, file.name.length),
      0
    );

    console.log("Index\tName" + " ".repeat(maxLength - 3) + "\tType");

    formattedFiles.forEach((file) => {
      const padding = " ".repeat(maxLength - file.name.length + 2);
      console.log(`${file.index}\t${file.name}${padding}\t${file.type}`);
    });
  });
}
