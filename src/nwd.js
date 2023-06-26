import fs from "fs/promises";
import path from "path";
import {
  resetStyle,
  textColorGreen,
  textColorRed,
  textColorYellow,
  textItalic,
  textUnderline,
} from "./textStyles.js";

export const getCurrentDirectory = () => {
  return path.resolve(process.cwd());
};

export const displayCurrentDirectory = () => {
  console.log(
    textColorYellow +
      textItalic +
      `You are currently in ${getCurrentDirectory()}` +
      resetStyle
  );
};

export const goUp = () => {
  const currentDirectory = getCurrentDirectory();
  const parentDirectory = path.dirname(currentDirectory);

  if (currentDirectory !== parentDirectory) {
    process.chdir(parentDirectory);
  }
};

export const changeDirectory = async (directoryPath) => {
  try {
    const currentDirectory = getCurrentDirectory();
    const newDirectory = path.resolve(currentDirectory, directoryPath);
    const stats = await fs.stat(newDirectory);
    if (stats.isDirectory()) {
      process.chdir(newDirectory);
    } else {
      console.error(textColorRed + "Not a directory" + resetStyle);
    }
  } catch (error) {
    console.error(textColorRed + "Invalid directory path" + resetStyle);
  }
};

export const listDirectoryContents = async () => {
  try {
    const currentDirectory = getCurrentDirectory();
    const files = await fs.readdir(currentDirectory);
    files.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    const formattedFiles = await Promise.all(
      files.map(async (file, index) => {
        const filePath = path.join(currentDirectory, file);
        const stats = await fs.stat(filePath);
        const fileType = stats.isDirectory() ? "directory" : "file";
        return { index: index, name: file, type: fileType };
      })
    );

    const maxLength = formattedFiles.reduce(
      (max, file) => Math.max(max, file.name.length),
      0
    );

    console.log(
      textColorGreen +
        textUnderline +
        "Index\tName" +
        " ".repeat(maxLength - 3) +
        "\tType" +
        resetStyle
    );

    formattedFiles.forEach((file) => {
      const padding = " ".repeat(maxLength - file.name.length + 2);
      console.log(`${file.index}\t${file.name}${padding}\t${file.type}`);
    });
  } catch (error) {
    console.error(
      textColorRed + "Failed to read directory contents" + resetStyle
    );
  }
};
