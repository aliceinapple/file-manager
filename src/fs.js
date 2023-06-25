import fs from "fs";
import path from "path";
import { getCurrentDirectory } from "./nwd.js";

export function readFile(filePath) {
  fs.createReadStream(filePath)
    .on("data", (chunk) => {
      console.log(chunk.toString());
    })
    .on("error", (err) => {
      console.error("Failed to read file");
    });
}

export function createFile(fileName) {
  const filePath = path.join(getCurrentDirectory(), fileName);

  fs.writeFile(filePath, "", (err) => {
    if (err) {
      console.error("Failed to create file");
    } else {
      console.log("File created successfully");
    }
  });
}

export function renameFile(oldFilePath, newFileName) {
  const newFilePath = path.join(getCurrentDirectory(), newFileName);

  fs.rename(oldFilePath, newFilePath, (err) => {
    if (err) {
      console.error("Failed to rename file");
    } else {
      console.log("File renamed successfully");
    }
  });
}

export function copyFile(sourceFilePath, destinationDirectory) {
  const destinationPath = path.join(
    getCurrentDirectory(),
    destinationDirectory
  );

  fs.copyFile(
    sourceFilePath,
    path.join(destinationPath, path.basename(sourceFilePath)),
    (err) => {
      if (err) {
        console.error("Failed to copy file");
      } else {
        console.log("File copied successfully");
      }
    }
  );
}

export function moveFile(sourceFilePath, destinationDirectory) {
  const destinationPath = path.join(
    getCurrentDirectory(),
    destinationDirectory
  );

  fs.rename(
    sourceFilePath,
    path.join(destinationPath, path.basename(sourceFilePath)),
    (err) => {
      if (err) {
        console.error("Failed to move file");
      } else {
        console.log("File moved successfully");
      }
    }
  );
}

export function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete file");
    } else {
      console.log("File deleted successfully");
    }
  });
}
