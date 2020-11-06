const CeramicClient = require('@ceramicnetwork/ceramic-http-client').default;
const IdentityWallet = require('identity-wallet').default;
const { ethers } = require('ethers');
const dotenv = require('dotenv');
const { writeFileSync } = require('fs');

const dotenvResult = dotenv.config({
  path: `${process.cwd()}/.env.local`,
});

const ceramicClient = new CeramicClient(process.env.REACT_APP_CERAMIC_API_HOST);

async function parseSeedFromEnv() {
  if (!dotenvResult.parsed.PUBLISHER_IDW_SEED) {
    throw new Error(
      'Please provide a valid PUBLISHER_IDW_SEED in you .env.local file.'
    );
  }

  const seed = ethers.utils.arrayify(process.env.PUBLISHER_IDW_SEED);
  return seed;
}

async function createIDW(seed) {
  const idw = await IdentityWallet.create({
    ceramic: ceramicClient,
    getPermission: async () => [],
    seed,
  });
  await ceramicClient.setDIDProvider(idw.getDidProvider());
}

function createJSONFile(path, fileContent) {
  writeFileSync(path, JSON.stringify(fileContent, null, 2));
}

module.exports = {
  dotenvResult,
  ceramicClient,
  parseSeedFromEnv,
  createIDW,
  createJSONFile,
};
