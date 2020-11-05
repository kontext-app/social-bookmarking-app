import { IDXWeb } from '@ceramicstudio/idx-web';
import { definitions } from '@ceramicstudio/idx-constants';

import { PUBLISHED_DEFINITIONS } from 'app/constants/definitions';

const idx = new IDXWeb({
  ceramic: process.env.REACT_APP_CERAMIC_API_HOST,
  connect: process.env.REACT_APP_THREE_ID_CONNECT_HOST,
  definitions: {
    ...definitions,
    ...PUBLISHED_DEFINITIONS,
  },
});

export async function authenticateWithEthereum(ethereumProvider, address) {
  await idx.authenticate({
    ethereum: {
      provider: ethereumProvider,
      address,
    },
  });
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
