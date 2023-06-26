import {
  resetStyle,
  textBold,
  textColorBlue,
  textColorMagenta,
} from "./textStyles.js";

const username = process.argv[2].replace("--username=", "");

export const startProgram = () => {
  console.log(
    textColorMagenta +
      textBold +
      `Welcome to the File Manager, ${username}!\n` +
      resetStyle
  );
};

export const exitProgram = () => {
  console.log(
    textColorBlue +
      textBold +
      `\nThank you for using File Manager, ${username}, goodbye!` +
      resetStyle
  );
  process.exit(0);
};
