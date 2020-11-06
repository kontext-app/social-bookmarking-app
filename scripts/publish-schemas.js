const { publishSchema } = require('@ceramicstudio/idx-tools');

const utils = require('./utils');
const { Bookmarks, BookmarksIndex, BookmarksLists } = require('../schemas');

const schemasToPublish = {
  Bookmarks,
  BookmarksIndex,
  BookmarksLists,
};

async function main() {
  const seed = await utils.parseSeedFromEnv();
  await utils.createIDW(seed);

  const docIDs = await publishSchemas();
  utils.createJSONFile(
    `${process.cwd()}/schemas/publishedSchemas.json`,
    docIDs
  );
  process.exit();
}

async function publishSchemas() {
  console.log(
    `Publishing schemas to ceramic node at: ${process.env.REACT_APP_CERAMIC_API_HOST}`
  );
  const schemaNameToDocId = {};

  for (const schemaName of Object.keys(schemasToPublish)) {
    const schema = schemasToPublish[schemaName];

    try {
      const docId = await publishSchema(utils.ceramicClient, {
        name: schema.title,
        content: schema,
      });
      schemaNameToDocId[schemaName] = `ceramic://${String(docId)}`;
      console.log(`✅ Schema ${schema.title} published. DocId: ${docId}`);
    } catch (error) {
      console.log(`❌ Schema ${schema.title} failed.`, error);
    }
  }

  return schemaNameToDocId;
}

main();