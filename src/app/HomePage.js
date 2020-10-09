import React, { Component } from "react";
import LandingPage from './components/LandingPage.js';
import './../styles/landing.css';

import Box from "3box";
import Portis from '@portis/web3';
import Web3 from 'web3';

const portis = new Portis('364fc158-816b-441b-af42-1dbfbc4b1786', 'mainnet');
const web3 = new Web3(portis.provider);

const getThreeBox = async address => {
  const profile = await Box.getProfile(address);
  return profile;
};

export default class HomePage extends Component {

  state = {
    needsAWeb3Browser: false
  };

  async componentDidMount() {
    portis.onLogin(() => {
      console.log("Logged in!");
    });

    // check if the user is logged in
    portis.isLoggedIn().then(({ error, result }) => {
      // set the login state
      console.log(result);
      //document.getElementById("root").innerHTML = result;
    });

    // enable the provider - this will cause the portis popup to show if the  user is not logged in
    web3.currentProvider.enable().then(() => {
      // check if the user is logged in again
      portis.isLoggedIn().then(({ error, result }) => {
        // set the login state
        console.log(result);
        //document.getElementById("root").innerHTML = result;
      });

      // get the user accounts
      web3.eth.getAccounts().then(accounts => {
        console.log("portis is logged in in test yay. this is the account");
        console.log(accounts[0]);
      });
    });
    this.setState({ needsAWeb3Browser: true });
    const currentURL = window.location.href;
    const cleanCurrentURL = currentURL.replace(/\//g, "_");
    const cleanerCurrentURL = cleanCurrentURL.replace(/\./g, "_");
    console.log(cleanerCurrentURL);
    //const chris = "did:3:bafyreiefwktffgtt75edstz3kwcijfqsviv33okgciioreuzpari3lnqyu";
    const threadCommentsThisURL = await Box.getThread(cleanerCurrentURL, 'xanadu_now_sh_comments', "did:3:bafyreiefwktffgtt75edstz3kwcijfqsviv33okgciioreuzpari3lnqyu", false );
    const threadProductsThisURL = await Box.getThread(cleanerCurrentURL, 'productIdeas', "did:3:bafyreiefwktffgtt75edstz3kwcijfqsviv33okgciioreuzpari3lnqyu", false );
    const threadBountiesThisURL = await Box.getThread(cleanerCurrentURL, 'productIdeas', "did:3:bafyreiefwktffgtt75edstz3kwcijfqsviv33okgciioreuzpari3lnqyu", false );
    this.setState({ threadCommentsThisURL });
    this.setState({ threadProductsThisURL });
    this.setState({ threadBountiesThisURL });
    console.log(threadCommentsThisURL);
    console.log(threadProductsThisURL);
    console.log(threadBountiesThisURL);
    /*if (typeof window.ethereum == "object") {
      this.setState({ needsAWeb3Browser: false });
    } else {
      this.setState({ needsAWeb3Browser: true });
    }*/
    console.log(this.state.needsAWeb3Browser);
    }

    async askPortis() {

      // if Metamask detected, then set accounts

      this.setState({ needsAWeb3Browser: false });
      //  window.ethereum.autoRefreshOnNetworkChange = false; //silences warning about no autofresh on network change
      //const accounts1 = await window.ethereum.enable();

      const accounts = await web3.eth.getAccounts();
      //console.log(accounts1);
      console.log(accounts);
      this.setState({ accounts });

      const threeBoxProfile = await getThreeBox(this.state.accounts[0]);
      this.setState({ threeBoxProfile });

      //const chris = "0x336BF8be536c8C804dab7D6CA5E5076a7DE555EE";
      const chris = "did:3:bafyreiefwktffgtt75edstz3kwcijfqsviv33okgciioreuzpari3lnqyu";
      const box = await Box.openBox(this.state.accounts[0], web3.currentProvider);
      console.log(box);
      this.setState({ box });
      const currentURL = window.location.href;
      const cleanCurrentURL = currentURL.replace(/\//g, "_");
      console.log(cleanCurrentURL);
      const cleanerCurrentURL = cleanCurrentURL.replace(/\./g, "_");
      console.log(cleanerCurrentURL);
      const space = await this.state.box.openSpace(cleanerCurrentURL);
      this.setState({ space });
      console.log(space);

      const threadProducts = await space.joinThread("productIdeas", {
        firstModerator: chris,
        members: false
      });
      this.setState({ threadProducts }, ()=>(this.getProductsThread()));

      // add another thread
      const threadComments = await space.joinThread("xanadu_now_sh_comments", {
        firstModerator: chris,
        members: false
      });
      this.setState({ threadComments }, ()=>(this.getCommentsThread()));

      // add another thread
      const threadBounties = await space.joinThread("xanadu_bounties", {
        firstModerator: chris,
        members: false
      });
      this.setState({ threadBounties }, ()=>(this.getBountiesThread()));

    }

    async getProductsThread() {
      if (!this.state.threadProducts) {
        console.error("products thread not in react state");
        return;
      }
      const products = await this.state.threadProducts.getPosts();
      this.setState({products});
      await this.state.threadProducts.onUpdate(async()=> {
        const products = await this.state.threadProducts.getPosts();
        this.setState({products});
      })
    }

    async getCommentsThread() {
      if (!this.state.threadComments) {
        console.error("comments thread not in react state");
        return;
      }
      const comments = await this.state.threadComments.getPosts();
      this.setState({comments});
      await this.state.threadComments.onUpdate(async()=> {
        const comments = await this.state.threadComments.getPosts();
        this.setState({comments});
      })
    }

    async getBountiesThread() {
      if (!this.state.threadBounties) {
        console.error("bounties thread not in react state");
        return;
      }
      const bounties = await this.state.threadBounties.getPosts();
      this.setState({bounties});
      await this.state.threadBounties.onUpdate(async()=> {
        const bounties = await this.state.threadBounties.getPosts();
        this.setState({bounties});
      })
    }

    render() {

      let threadWithOrWithoutMetamask = 0;
      let postsWithOrWithoutMetamask = 0;
      let productThreadWithOrWithoutMetamask = 0;
      let productPostsWithOrWithoutMetamask = 0;
      let bountiesThreadWithOrWithoutMetamask = 0;
      let bountiesPostsWithOrWithoutMetamask = 0;

      if (this.state.needsAWeb3Browser) {
        threadWithOrWithoutMetamask = this.state.threadCommentsThisURL;
        postsWithOrWithoutMetamask = this.state.threadCommentsThisURL;
        productThreadWithOrWithoutMetamask = this.state.threadProductsThisURL;
        productPostsWithOrWithoutMetamask = this.state.threadProductsThisURL;
        bountiesThreadWithOrWithoutMetamask = this.state.threadBountiesThisURL;
        bountiesPostsWithOrWithoutMetamask = this.state.threadBountiesThisURL;
      } else {
        threadWithOrWithoutMetamask = this.state.threadComments;
        postsWithOrWithoutMetamask = this.state.comments;
        productThreadWithOrWithoutMetamask = this.state.threadProducts;
        productPostsWithOrWithoutMetamask = this.state.products;
        bountiesThreadWithOrWithoutMetamask = this.state.threadBounties;
        bountiesPostsWithOrWithoutMetamask = this.state.bounties;
      }

      return (
      <div className="bg-gray-200 h-full">
        <div className="container mx-auto h-screen">
          <div class="flex justify-center ">
            <div class="text-gray-700 text-center px-4 py-2 m-2">
              <LandingPage
                accounts={this.state.accounts}
                thread={productThreadWithOrWithoutMetamask}
                box={this.state.box}
                space={this.state.space}
                threadMembers={this.state.threadMembers}
                posts={productPostsWithOrWithoutMetamask}
                threeBoxProfile={this.state.threeBoxProfile}
                //getAppsThread={this.getAppsThread.bind(this)}
                getProductsThread={this.getProductsThread.bind(this)}
                askPortis={this.askPortis.bind(this)}
                usersAddress={
                  this.state.accounts ? this.state.accounts[0] : null
                }
                needsAWeb3Browser={this.state.needsAWeb3Browser}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
