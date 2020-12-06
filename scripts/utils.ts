import CeramicClient from '@ceramicnetwork/http-client';
import ThreeIdDidProvider from '3id-did-provider';
import { ethers } from 'ethers';
import dotenv from 'dotenv';
import { writeFileSync } from 'fs';

function parseDotenv(): {
  PUBLISHER_IDW_SEED: string;
  REACT_APP_CERAMIC_API_HOST: string;
} {
  const result = dotenv.config({
    path: `${process.cwd()}/.env.local`,
  });

  if (result.error) {
    throw result.error;
  }

  if (!result.parsed) {
    throw new Error('Please provide a valid .env.local file');
  }

  return result.parsed as any;
}

export const ceramicClient = new CeramicClient(
  process.env.REACT_APP_CERAMIC_API_HOST,
  { docSyncEnabled: false }
);

export async function parseSeedFromEnv() {
  const { PUBLISHER_IDW_SEED } = parseDotenv();
  const seed = ethers.utils.arrayify(PUBLISHER_IDW_SEED);
  return seed;
}

export async function createIDW(seed: Uint8Array) {
  const idw = await ThreeIdDidProvider.create({
    ceramic: ceramicClient,
    getPermission: async () => [],
    seed,
  });
  await ceramicClient.setDIDProvider(idw.getDidProvider());
}

export function createJSONFile(path: string, fileContent: unknown) {
  writeFileSync(path, JSON.stringify(fileContent, null, 2));
}

export default {
  ceramicClient,
  parseSeedFromEnv,
  createIDW,
  createJSONFile,
};
