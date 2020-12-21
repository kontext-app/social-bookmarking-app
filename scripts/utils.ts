import CeramicClient from '@ceramicnetwork/http-client';
import ThreeIdDidProvider from '3id-did-provider';
import { ethers } from 'ethers';
import dotenv from 'dotenv';
import { writeFileSync } from 'fs';
import { publishIDXConfig } from '@ceramicstudio/idx-tools';

import type { CeramicApi } from '@ceramicnetwork/common';

let ceramicClient: CeramicApi;

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

function createCeramic() {
  const { REACT_APP_CERAMIC_API_HOST } = parseDotenv();
  (ceramicClient as any) = new CeramicClient(
    REACT_APP_CERAMIC_API_HOST || 'https://ceramic-dev.3boxlabs.com',
    { docSyncEnabled: false }
  );
}

export function getCeramic() {
  return ceramicClient;
}

export async function parseSeedFromEnv() {
  const { PUBLISHER_IDW_SEED } = parseDotenv();
  const seed = ethers.utils.arrayify(PUBLISHER_IDW_SEED);
  return seed;
}

export async function createThreeIdFromSeed(seed: Uint8Array) {
  createCeramic();
  await publishIDXConfig(ceramicClient);
  const threeIdProvider = await ThreeIdDidProvider.create({
    ceramic: ceramicClient,
    getPermission: async () => [],
    seed,
  });
  await ceramicClient.setDIDProvider(threeIdProvider.getDidProvider());
}

export function createJSONFile(path: string, fileContent: unknown) {
  writeFileSync(path, JSON.stringify(fileContent, null, 2));
}

export default {
  getCeramic,
  parseSeedFromEnv,
  createThreeIdFromSeed,
  createJSONFile,
};
