import fs from "fs";
import { constants } from "fs";
import zlib from "zlib";
import { pipeline } from "stream/promises";
import path from "path";
import { resetStyle, textColorRed } from "./textStyles.js";

export const compressFile = async (filePath, destinationPath) => {
  try {
    await fs.promises
      .access(filePath, constants.F_OK)
      .then()
      .catch(() => {
        throw new Error("No such file or directory");
      });

    const input = fs.createReadStream(filePath);
    const output = fs.createWriteStream(
      destinationPath || filePath.split(".")[0] + ".br"
    );
    const compress = zlib.createBrotliCompress();

    await pipeline(input, compress, output);
  } catch (error) {
    console.log(
      textColorRed + "Operation failed:" + error.message + resetStyle
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

    if (!destinationFilePath) throw new Error("Specify path to destination");

    const input = fs.createReadStream(sourceFilePath);
    const output = fs.createWriteStream(destinationFilePath);
    const decompress = zlib.createBrotliDecompress();

    await pipeline(input, decompress, output);
  } catch (error) {
    console.error(
      textColorRed + "Operation failed:" + error.message + resetStyle
    );
  }
};
