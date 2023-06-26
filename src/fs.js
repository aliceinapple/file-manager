import fs, { constants } from "fs/promises";
import { createReadStream, createWriteStream } from "fs";
import path from "path";
import { getCurrentDirectory } from "./nwd.js";
import { resetStyle, textColorGreen, textColorRed } from "./textStyles.js";
import { pipeline } from "stream/promises";

export const readFile = async (filePath) => {
  try {
    const fileStream = createReadStream(filePath, "utf8");

    fileStream.on("data", (chunk) => {
      console.log(chunk);
    });

    fileStream.on("error", (error) => {
      console.error(
        textColorRed + "Failed to read file: " + error.message + resetStyle
      );
    });
  } catch (error) {
    console.error(textColorRed + "Failed to read file" + resetStyle);
  }
};

export const createFile = async (fileName) => {
  try {
    const filePath = path.join(getCurrentDirectory(), fileName);
    const isExists = await fs
      .access(filePath, constants.F_OK)
      .then(() => true)
      .catch(() => false);
    if (isExists) throw new Error("File already exists");

    await fs.writeFile(filePath, "");
    console.log(textColorGreen + "File created successfully" + resetStyle);
  } catch (error) {
    console.error(
      textColorRed + "Failed to create file: " + error.message + resetStyle
    );
  }
};

export const renameFile = async (oldFilePath, newFileName) => {
  try {
    const isExists = await fs
      .access(newFileName, constants.F_OK)
      .then(() => true)
      .catch(() => false);
    if (isExists) throw new Error("File already exists");

    const newFilePath = path.join(getCurrentDirectory(), newFileName);
    await fs.rename(oldFilePath, newFilePath);
    console.log(textColorGreen + "File renamed successfully" + resetStyle);
  } catch (error) {
    console.error(
      textColorRed + "Failed to rename file: " + error.message + resetStyle
    );
  }
};

export const copyFile = async (sourceFilePath, destinationDirectory) => {
  try {
    const destinationPath = path.join(
      getCurrentDirectory(),
      destinationDirectory
    );
    const newFilePath = path.join(
      destinationPath,
      path.basename(sourceFilePath)
    );
    const isExists = await fs
      .access(newFilePath, constants.F_OK)
      .then(() => true)
      .catch(() => false);
    if (isExists) throw new Error("File already exists");

    const sourceStream = createReadStream(sourceFilePath);
    const destinationStream = createWriteStream(newFilePath);

    await pipeline(sourceStream, destinationStream);

    console.log(textColorGreen + "File copied successfully" + resetStyle);
  } catch (error) {
    console.error(
      textColorRed + "Failed to copy file: " + error.message + resetStyle
    );
  }
};

export const moveFile = async (sourceFilePath, destinationDirectory) => {
  try {
    const destinationPath = path.join(
      getCurrentDirectory(),
      destinationDirectory
    );
    const newFilePath = path.join(
      destinationPath,
      path.basename(sourceFilePath)
    );
    const isExists = await fs
      .access(newFilePath, constants.F_OK)
      .then(() => true)
      .catch(() => false);
    if (isExists) throw new Error("File already exists");

    const sourceStream = createReadStream(sourceFilePath);
    const destinationStream = createWriteStream(newFilePath);

    await pipeline(sourceStream, destinationStream);

    await fs.unlink(sourceFilePath);

    console.log(textColorGreen + "File moved successfully" + resetStyle);
  } catch (error) {
    console.error(
      textColorRed + "Failed to move file: " + error.message + resetStyle
    );
  }
};

export const deleteFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
    console.log(textColorGreen + "File deleted successfully" + resetStyle);
  } catch (error) {
    console.error(textColorRed + "Failed to delete file" + resetStyle);
  }
};
