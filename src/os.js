import os from "os";
import { resetStyle, textColorGreen, textColorRed } from "./textStyles.js";

const getEndOfLine = () => {
  console.log(textColorGreen + "End of Line:" + resetStyle, os.EOL);
};

const getCPUsInfo = () => {
  const cpus = os.cpus();
  console.log(textColorGreen + "CPUs:" + resetStyle);
  cpus.forEach((cpu, index) => {
    console.log(
      `CPU ${index + 1}: Model - ${cpu.model}, Speed - ${cpu.speed} GHz`
    );
  });
};

const getHomeDirectory = () => {
  console.log(textColorGreen + "Home Directory:" + resetStyle, os.homedir());
};

const getUsername = () => {
  console.log(
    textColorGreen + "Username:" + resetStyle,
    os.userInfo().username
  );
};

const getCPUArchitecture = () => {
  console.log(textColorGreen + "CPU Architecture:" + resetStyle, process.arch);
};

export const handleOSCommand = (options) => {
  const osCommand = options[0];
  switch (osCommand) {
    case "--EOL":
      getEndOfLine();
      break;
    case "--cpus":
      getCPUsInfo();
      break;
    case "--homedir":
      getHomeDirectory();
      break;
    case "--username":
      getUsername();
      break;
    case "--architecture":
      getCPUArchitecture();
      break;
    default:
      console.log(textColorRed + "Invalid OS command" + resetStyle);
  }
};
