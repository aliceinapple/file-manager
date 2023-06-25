import fs from "fs";
import zlib from "zlib";

export function compressFile(filePath, destinationPath) {
  const input = fs.createReadStream(filePath);
  const output = fs.createWriteStream(
    destinationPath || filePath.split(".")[0] + ".br"
  );
  const compress = zlib.createBrotliCompress();

  input.pipe(compress).pipe(output);

  output.on("finish", () => {
    console.log(
      `File ${filePath} compressed successfully to ${
        destinationPath || filePath.split(".")[0]
      }.br`
    );
  });

  output.on("error", (err) => {
    console.log("Operation failed", err);
  });
}

export function decompressFile(sourceFilePath, destinationFilePath) {
  const decompressedFileStream = fs.createWriteStream(destinationFilePath);
  const fileStream = fs.createReadStream(sourceFilePath);

  fileStream
    .pipe(zlib.createBrotliDecompress())
    .pipe(decompressedFileStream)
    .on("finish", () => {
      console.log("File decompressed successfully");
    })
    .on("error", (err) => {
      console.error("Failed to decompress file");
    });
}
