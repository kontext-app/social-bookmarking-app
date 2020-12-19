import { publishSchema } from '@ceramicstudio/idx-tools';
import DocID from '@ceramicnetwork/docid';
import utils from './utils';
import schemas from '../schemas';

const {
  Bookmark,
  Bookmarks,
  BookmarksIndex,
  BookmarksList,
  BookmarksLists,
} = schemas;

const schemasToPublish: {
  [schemaName: string]: any;
} = {
  Bookmark,
  Bookmarks,
  BookmarksIndex,
  BookmarksList,
  BookmarksLists,
};

async function main() {
  try {
    const seed = await utils.parseSeedFromEnv();
    await utils.createThreeIdFromSeed(seed);

    const docIDs = await publishSchemas();
    utils.createJSONFile(
      `${process.cwd()}/schemas/publishedSchemas.json`,
      docIDs
    );
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
}

async function publishSchemas() {
  console.log(
    `Publishing schemas to ceramic node at: ${process.env.REACT_APP_CERAMIC_API_HOST}`
  );
  const schemaNameToDocId: {
    [schemaName: string]: string;
  } = {};

  for (const schemaName of Object.keys(schemasToPublish)) {
    const schema = schemasToPublish[schemaName];

    try {
      const schemaDoc = await publishSchema(utils.getCeramic(), {
        name: schema.title,
        content: schema,
      });
      const schemaDocID = schemaDoc.id.toUrl();
      const withVersion = DocID.fromString(schemaDocID, '0').toUrl();
      schemaNameToDocId[schemaName] = withVersion;
      console.log(`✅ Schema ${schema.title} published. DocId: ${withVersion}`);
    } catch (error) {
      console.log(`❌ Schema ${schema.title} failed.`, error);
    }
  }

  return schemaNameToDocId;
}

main();
