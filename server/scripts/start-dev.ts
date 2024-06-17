import { convertFromDirectory } from "joi-to-typescript";
import { spawn } from "child_process";

async function generateTypesAndStartServer() {
  // Generate types from Joi schemas
  const result = await convertFromDirectory({
    schemaDirectory: "schema",
    typeOutputDirectory: "types",
  });

  if (result) {
    console.log("Types generated successfully");
  } else {
    console.log("Failed to generate types");
  }

  // Start your server
  const serverProcess = spawn("ts-node", ["server.ts"], {
    stdio: "inherit",
    shell: true,
  });

  // Handle process exit
  serverProcess.on("exit", (code) => {
    console.log(`Server process exited with code ${code}`);
    process.exit(code);
  });
}

generateTypesAndStartServer();
