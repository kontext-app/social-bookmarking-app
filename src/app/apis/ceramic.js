import { ThreeIdConnect, EthereumAuthProvider } from '3id-connect';
import CeramicClient from '@ceramicnetwork/ceramic-http-client';
import { IDXWeb } from '@ceramicstudio/idx-web';
import { definitions } from '@ceramicstudio/idx-constants';

// NOTE: Set new instances from alpha versions of `3id-connect` and `ceramic-http-client` here
// because the packaged versions in `idx-web` not working ATM.
const threeIdConnect = new ThreeIdConnect();
const ceramicClient = new CeramicClient('http://localhost:7007');

const idx = new IDXWeb({
  ceramic: ceramicClient,
  connect: threeIdConnect,
  definitions,
});

export async function authenticateWithEthereum(ethereumProvider, address) {
  const authProvider = new EthereumAuthProvider(ethereumProvider, address);
  await idx.authenticate({ authProvider });
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

export async function getProfile(did) {
  return idx.get('basicProfile', did);
}
