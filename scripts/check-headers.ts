import { Glob } from "bun";

const filePaths = new Glob("src/**/*.ts").scan();

let filesWithoutCopyrightHeader: string[] = [];
for await (const filePath of filePaths) {
  const fileContents = await Bun.file(filePath).text();
  if (!fileContents.startsWith("/*\nCopyright")) {
    filesWithoutCopyrightHeader.push(filePath);
  }
}

if (filesWithoutCopyrightHeader.length) {
  console.error(
    `\nThe following files are missing a valid copyright header:${filesWithoutCopyrightHeader.map((file) => `\n   • ${file}`).join()}`,
  );
  process.exit(1);
}
