import { ThreeIdConnect, EthereumAuthProvider } from '3id-connect';
import CeramicClient from '@ceramicnetwork/ceramic-http-client';
import { IDX } from '@ceramicstudio/idx';
import { definitions } from '@ceramicstudio/idx-constants';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import KeyDidResolver from '@ceramicnetwork/key-did-resolver';

// NOTE: Set new instances from alpha versions of `3id-connect` and `ceramic-http-client` here
// because the packaged versions in `idx-web` not working ATM.
const threeIdConnect = new ThreeIdConnect();
const ceramicClient = new CeramicClient();

const idx = new IDX({
  ceramic: ceramicClient,
  definitions,
  resolver: {
    registry: {
      ...KeyDidResolver.getResolver(),
      ...ThreeIdResolver.getResolver(ceramicClient),
    },
  },
});

export async function authenticateWithEthereum(ethereumProvider, address) {
  const authProvider = new EthereumAuthProvider(ethereumProvider, address);
  await threeIdConnect.connect(authProvider);

  const didProvider = await threeIdConnect.getDidProvider();
  await idx.authenticate({ provider: didProvider });
}

export function isIDXAuthenticated() {
  return idx.authenticated;
}

export function getDID() {
  return idx.id;
}

export function getDIDInstance() {
  return idx.did;
}

export async function getProfileByDID(did) {
  return idx.get('basicProfile', did);
}

export async function getIDXDocID() {
  return idx.getIDXDocID();
}
