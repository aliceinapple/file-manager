import fs from "fs";
import crypto from "crypto";
import { resetStyle, textColorGreen, textColorRed } from "./textStyles.js";

export const calculateHash = (filePath) => {
  const hash = crypto.createHash("sha256");

  const fileStream = fs.createReadStream(filePath);
  fileStream.on("data", (data) => {
    hash.update(data);
  });
  fileStream.on("end", () => {
    console.log(textColorGreen + "Hash:" + resetStyle, hash.digest("hex"));
  });
  fileStream.on("error", (err) => {
    console.error(textColorRed + "Failed to calculate hash" + resetStyle);
  });
};
