import fs from "fs";
import crypto from "crypto";
import { resetStyle, textColorGreen, textColorRed } from "./textStyles.js";

export const calculateHash = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");
    const hash = crypto.createHash("sha256").update(data).digest("hex");
    console.log(textColorGreen + "Hash: " + resetStyle + hash);
  } catch (error) {
    console.error(textColorRed + "Failed to calculate hash" + resetStyle);
  }
};
