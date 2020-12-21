import { createDefinition } from '@ceramicstudio/idx-tools';
import utils from './utils';
import schemas from '../schemas';

async function main() {
  const seed = await utils.parseSeedFromEnv();
  await utils.createThreeIdFromSeed(seed);

  const docIDs = await publishDefinitions();
  utils.createJSONFile(
    `${process.cwd()}/schemas/publishedDefinitions.json`,
    docIDs
  );
  process.exit();
}

async function publishDefinitions() {
  console.log(
    `Publishing definitions to ceramic node at: ${process.env.REACT_APP_CERAMIC_API_HOST}`
  );
  const definitionNameToDocId: {
    [definitionName: string]: string;
  } = {};

  for (const schemaName of Object.keys(schemas.publishedSchemas)) {
    const schemaDocID = schemas.publishedSchemas[schemaName];

    try {
      const definitionDoc = await createDefinition(utils.getCeramic(), {
        description: schemaName,
        name: schemaName,
        schema: schemaDocID,
      });
      const definitionDocID = definitionDoc.id.toUrl();
      definitionNameToDocId[schemaName] = definitionDocID;
      console.log(
        `✅ Definition ${schemaName} published. DocId: ${definitionDocID}`
      );
    } catch (error) {
      console.log(`❌ Definition ${schemaName} failed.`, error);
    }
  }

  return definitionNameToDocId;
}

main();
