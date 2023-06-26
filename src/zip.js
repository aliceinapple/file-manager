import fs from "fs";
import { constants } from "fs";
import zlib from "zlib";
import { pipeline } from "stream/promises";
import path from "path";
import { resetStyle, textColorGreen, textColorRed } from "./textStyles.js";
import { getCurrentDirectory } from "./nwd.js";

export const compressFile = async (filePath, destinationPath) => {
  try {
    const isFileExists = await fs.promises
      .access(filePath, constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (!isFileExists) throw new Error("No such file or directory");

    const compressPath = destinationPath
      ? path.join(
          destinationPath,
          `${path.basename(filePath, path.extname(filePath))}.br`
        )
      : `${path.basename(filePath, path.extname(filePath))}.br`;

    const isArchiveExists = await fs.promises
      .access(compressPath, constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (isArchiveExists) throw new Error("Archive already exists");

    const input = fs.createReadStream(filePath);
    const output = fs.createWriteStream(compressPath);
    const compress = zlib.createBrotliCompress();

    await pipeline(input, compress, output);

    console.log(
      textColorGreen + "Archive created at:" + resetStyle,
      path.join(getCurrentDirectory(), compressPath)
    );
  } catch (error) {
    console.log(
      textColorRed + "Operation failed: " + error.message + resetStyle
    );
  }
};

export const decompressFile = async (sourceFilePath, destinationFilePath) => {
  try {
    await fs.promises
      .access(sourceFilePath, constants.F_OK)
      .then()
      .catch(() => {
        throw new Error("No such file or directory");
      });

    if (path.extname(sourceFilePath) !== ".br") {
      throw new Error("This is not an archive!");
    }

    const decompressPath = destinationFilePath
      ? path.join(
          destinationFilePath,
          path.basename(sourceFilePath, path.extname(sourceFilePath))
        )
      : path.basename(sourceFilePath, path.extname(sourceFilePath));

    const isFileExists = await fs.promises
      .access(decompressPath, constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (isFileExists) throw new Error("File already exists");

    const input = fs.createReadStream(sourceFilePath);
    const output = fs.createWriteStream(decompressPath);
    const decompress = zlib.createBrotliDecompress();

    await pipeline(input, decompress, output);
    console.log(
      textColorGreen + "File is unpacked in:" + resetStyle,
      path.join(getCurrentDirectory(), decompressPath)
    );
  } catch (error) {
    console.error(
      textColorRed + "Operation failed: " + error.message + resetStyle
    );
  }
};
