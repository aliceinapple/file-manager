import os from "os";

function getEndOfLine() {
  console.log("End of Line:", os.EOL);
}

function getCPUsInfo() {
  const cpus = os.cpus();
  console.log("CPUs:");
  cpus.forEach((cpu, index) => {
    console.log(
      `CPU ${index + 1}: Model - ${cpu.model}, Speed - ${cpu.speed} GHz`
    );
  });
}

function getHomeDirectory() {
  console.log("Home Directory:", os.homedir());
}

function getUsername() {
  console.log("Username:", os.userInfo().username);
}

function getCPUArchitecture() {
  console.log("CPU Architecture:", process.arch);
}

export function handleOSCommand(options) {
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
      console.log("Invalid OS command");
  }
}
