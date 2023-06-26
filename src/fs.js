import fs from "fs/promises";
import path from "path";
import { getCurrentDirectory } from "./nwd.js";
import { resetStyle, textColorGreen, textColorRed } from "./textStyles.js";

export const readFile = async (filePath) => {
  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    console.log(fileContent);
  } catch (err) {
    console.error(textColorRed + "Failed to read file" + resetStyle);
  }
};

export const createFile = async (fileName) => {
  const filePath = path.join(getCurrentDirectory(), fileName);

  try {
    await fs.writeFile(filePath, "");
    console.log(textColorGreen + "File created successfully" + resetStyle);
  } catch (err) {
    console.error(textColorRed + "Failed to create file" + resetStyle);
  }
};

export const renameFile = async (oldFilePath, newFileName) => {
  const newFilePath = path.join(getCurrentDirectory(), newFileName);

  try {
    await fs.rename(oldFilePath, newFilePath);
    console.log(textColorGreen + "File renamed successfully" + resetStyle);
  } catch (err) {
    console.error(textColorRed + "Failed to rename file" + resetStyle);
  }
};

export const copyFile = async (sourceFilePath, destinationDirectory) => {
  const destinationPath = path.join(
    getCurrentDirectory(),
    destinationDirectory
  );

  try {
    await fs.copyFile(
      sourceFilePath,
      path.join(destinationPath, path.basename(sourceFilePath))
    );
    console.log(textColorGreen + "File copied successfully" + resetStyle);
  } catch (err) {
    console.error(textColorRed + "Failed to copy file" + resetStyle);
  }
};

export const moveFile = async (sourceFilePath, destinationDirectory) => {
  const destinationPath = path.join(
    getCurrentDirectory(),
    destinationDirectory
  );

  try {
    await fs.rename(
      sourceFilePath,
      path.join(destinationPath, path.basename(sourceFilePath))
    );
    console.log(textColorGreen + "File moved successfully" + resetStyle);
  } catch (err) {
    console.error(textColorRed + "Failed to move file" + resetStyle);
  }
};

export const deleteFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
    console.log(textColorGreen + "File deleted successfully" + resetStyle);
  } catch (err) {
    console.error(textColorRed + "Failed to delete file" + resetStyle);
  }
};
