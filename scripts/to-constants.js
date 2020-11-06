const { writeFileSync } = require('fs');
const prettier = require('prettier');

const { publishedDefinitions, publishedSchemas } = require('../schemas');

const constantsFolderPath = `${process.cwd()}/src/app/constants`;

function main() {
  const definitionsConstantString = `
  export const PUBLISHED_DEFINITIONS = ${JSON.stringify(
    publishedDefinitions,
    null,
    2
  )};\n
  export const PUBLISHED_SCHEMAS = ${JSON.stringify(
    publishedSchemas,
    null,
    2
  )};\n
  `;
  writeFileSync(
    `${constantsFolderPath}/definitions.ts`,
    prettier.format(definitionsConstantString, {
      parser: 'babel',
      singleQuote: true,
    })
  );
}

main();
