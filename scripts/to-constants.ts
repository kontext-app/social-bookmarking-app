import { writeFileSync } from 'fs';
import prettier from 'prettier';
import schemas from '../schemas';

const constantsFolderPath = `${process.cwd()}/src/app/constants`;

function main() {
  const definitionsConstantString = `
  export const PUBLISHED_DEFINITIONS = ${JSON.stringify(
    schemas.publishedDefinitions,
    null,
    2
  )};\n
  export const PUBLISHED_SCHEMAS = ${JSON.stringify(
    schemas.publishedSchemas,
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
