const { createDefinition } = require('@ceramicstudio/idx-tools');

const utils = require('./utils');
const publishedSchemas = require('../schemas').publishedSchemas;

async function main() {
  const seed = await utils.parseSeedFromEnv();
  await utils.createIDW(seed);

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
  const definitionNameToDocId = {};

  for (const schemaName of Object.keys(publishedSchemas)) {
    const schemaDocID = publishedSchemas[schemaName];

    try {
      const docId = await createDefinition(utils.ceramicClient, {
        name: schemaName,
        schema: schemaDocID,
      });
      definitionNameToDocId[schemaName] = docId.toUrl('base36');
      console.log(`✅ Definition ${schemaName} published. DocId: ${docId}`);
    } catch (error) {
      console.log(`❌ Definition ${schemaName} failed.`, error);
    }
  }

  return definitionNameToDocId;
}

main();
