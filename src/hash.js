import fs from "fs";
import crypto from "crypto";

export function calculateHash(filePath) {
  const hash = crypto.createHash("sha256");

  const fileStream = fs.createReadStream(filePath);
  fileStream.on("data", (data) => {
    hash.update(data);
  });
  fileStream.on("end", () => {
    console.log("Hash:", hash.digest("hex"));
  });
  fileStream.on("error", (err) => {
    console.error("Failed to calculate hash");
  });
}
