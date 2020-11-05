import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

const web3Modal = new Web3Modal({
  network: process.env.REACT_APP_WEB3_NETWORK,
  cacheProvider: true,
  disableInjectedProvider: false,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: process.env.REACT_APP_INFURA_PROJECT_ID,
      },
    },
  },
});

export async function connectWithWeb3() {
  const provider = await web3Modal.connect();
  const addresses = await provider.enable();

  return {
    provider,
    addresses,
  };
}
