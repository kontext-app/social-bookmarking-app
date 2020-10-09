import React, { Component } from "react"
//import { Feed } from './Feed.js';
import Post from './Post.js';

export default class LandingPage extends Component {
  state = {
    thread: null,
    showCommentOpen: false
  };

  savePost = async formData => {
      // add the loggedin account to the form data to be saved
      formData.account = this.props.accounts[0];
      await this.props.thread.post(formData);
      this.props.getProductsThread();
    };

  switchShowHide= () => {
          this.setState(prevState => {
              return {
                  showCommentOpen: !prevState.showCommentOpen
              }
          })
          this.props.askPortis();
      }

  render() {
    return (
      <div className="flex bg-blue-lightest flex flex-col font-sans">
    		<div className="mt-12">
    			<div className="bg-white mb-3">
    				<div className="container mx-auto">
    					<div className="flex w-960 mx-auto">
    						<div className="w-2/3 py-2">
    							<div className="inline-flex items-center mr-6">
    								<div className="text-xs text-grey font-semibold mr-4">VIEW</div>
    								<div>
    									<button>
    										<svg className="h-5 fill-current text-gray-800" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="inherit" d="M1.75,9.375 L1.75,1.75 L18.25,1.75 L18.25,9.375 L1.75,9.375 Z M1.75,18.25 L1.75,10.625 L18.25,10.625 L18.25,18.25 L1.75,18.25 Z"></path></svg>
    									</button>
    									<button>
    										<svg className="h-5 fill-current text-gray-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="inherit" d="M1.75,6.60294118 L1.75,1.75 L18.25,1.75 L18.25,6.60294118 L1.75,6.60294118 Z M1.75,12.4264706 L1.75,7.57352941 L18.25,7.57352941 L18.25,12.4264706 L1.75,12.4264706 Z M1.75,18.25 L1.75,13.3970588 L18.25,13.3970588 L18.25,18.25 L1.75,18.25 Z"></path></svg>
    									</button>
    									<button>
    										<svg className="h-5 fill-current text-gray-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="inherit" d="M1.75,4.95149254 L1.75,1.75 L18.25,1.75 L18.25,4.95149254 L1.75,4.95149254 Z M1.75,9.38432836 L1.75,6.18283582 L18.25,6.18283582 L18.25,9.38432836 L1.75,9.38432836 Z M1.75,18.25 L1.75,15.0485075 L18.25,15.0485075 L18.25,18.25 L1.75,18.25 Z M1.75,13.8171642 L1.75,10.6156716 L18.25,10.6156716 L18.25,13.8171642 L1.75,13.8171642 Z"></path></svg>
    									</button>
    								</div>
    							</div>
    							<div className="inline-flex items-center">
    								<div className="text-xs text-grey font-semibold mr-4">SORT</div>
    								<div className="inline-flex items-center">
    									<button className="inline-flex items-center">
    										<svg className="h-4 fill-current text-blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Hot</title><path d="M10.31.61a.5.5,0,0,0-.61,0C9.41.83,2.75,6.07,2.75,11.47a8.77,8.77,0,0,0,3.14,6.91.5.5,0,0,0,.75-.64,3.84,3.84,0,0,1-.55-2A7.2,7.2,0,0,1,10,9.56a7.2,7.2,0,0,1,3.91,6.23,3.84,3.84,0,0,1-.55,2,.5.5,0,0,0,.75.64,8.77,8.77,0,0,0,3.14-6.91C17.25,6.07,10.59.83,10.31.61Z"></path></svg>
    										<span className="text-blue text-xs font-semibold ml-1 mr-2">HOT</span>
    										<svg className="h-4 fill-current text-blue" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g><path fill="inherit" d="M14.1711599,9.3535 L9.99925636,13.529 L5.82735283,9.3535 C5.51262415,9.0385 5.73543207,8.5 6.18054835,8.5 L13.8179644,8.5 C14.2630807,8.5 14.4858886,9.0385 14.1711599,9.3535"></path></g></svg>
    									</button>
    									<button className="inline-flex items-center ml-3">
    										<span className="text-blue text-xs font-semibold ml-1 mr-2">EVERYWHERE</span>
    										<svg className="h-4 fill-current text-blue" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g><path fill="inherit" d="M14.1711599,9.3535 L9.99925636,13.529 L5.82735283,9.3535 C5.51262415,9.0385 5.73543207,8.5 6.18054835,8.5 L13.8179644,8.5 C14.2630807,8.5 14.4858886,9.0385 14.1711599,9.3535"></path></g></svg>
    									</button>
    								</div>
    							</div>
    						</div>
    						<div className="w-1/3">&nbsp;</div>
    					</div>
    				</div>
    			</div>
    			<div className="container mx-auto">
    				<div className="flex w-960 mx-auto">

              <div className="w-2/3">
                <div className="py-2">
                  {this.props.posts &&
                    this.props.posts.map((post, i) => {
                      return (
                          <Post
                            post={post}
                            key={i}
                            threeBox={this.props.threeBox}
                            space={this.props.space}
                            box={this.props.box}
                            usersAddress={this.props.usersAddress}
                            i={i} />
                      );
                    })}
          				</div>
          			</div>

              <div className="w-1/3 ml-5">
    						<div className="py-2">
    							<div className="rounded bg-white mb-4">
    								<div className="p-3">
    									<div className="h-8 -m-3 bg-no-repeat bg-100%" style={{backgroundImage: "url(" + "https://i.imgur.com/pgb1JTq.jpg" + ")"}}>
    									</div>
    									<div>
    										<div className="inline-flex items-center">
    											<img src="https://cdn.discordapp.com/icons/648923221759885319/1a34c9f320af937e8f9ee470c563357a.png?size=256" className="h-16"/>
    											<span className="text-lg ml-4 mt-6">#popular</span>
    										</div>
    										<p className="font-normal mb-3 text-sm leading-normal">The best posts on kontext for you, pulled from the most active communities on kontext. Check here to see the most shared, upvoted, and commented content on the internet.</p>
    										<button className="bg-blue-700 text-sm text-white font-semibold rounded px-4 py-2 w-full">CREATE POST</button>
    									</div>
    								</div>
    							</div>
    							<div className="rounded bg-white mb-4">
    								<div className="p-2">
    									<div className="flex items-center">
    										<svg className="h-6 w-6 mr-4 text-orange fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>kontext Premium</title><path d="M13.535 15.785c-1.678.244-2.883.742-3.535 1.071v-5.113a2 2 0 0 0-2-2H4.217c.044-.487.076-1.016.076-1.629 0-1.692-.489-2.968-.884-3.722L4.8 3.001H10v4.742a2 2 0 0 0 2 2h3.783c.06.67.144 1.248.22 1.742.097.632.182 1.177.182 1.745 0 1.045-.829 2.291-2.65 2.555m5.028-12.249l-2.242-2.242a1 1 0 0 0-.707-.293H4.386a1 1 0 0 0-.707.293L1.436 3.536a1 1 0 0 0-.069 1.337c.009.011.926 1.2.926 3.241 0 1.304-.145 2.24-.273 3.065-.106.684-.206 1.33-.206 2.051 0 1.939 1.499 4.119 4.364 4.534 2.086.304 3.254 1.062 3.261 1.065a1.016 1.016 0 0 0 1.117.004c.011-.007 1.18-.765 3.266-1.069 2.864-.415 4.363-2.595 4.363-4.534 0-.721-.099-1.367-.206-2.051-.128-.825-.272-1.761-.272-3.065 0-2.033.893-3.199.926-3.241a.999.999 0 0 0-.07-1.337"></path></svg>
    										<div className="flex flex-col">
    											<span className="text-xs font-medium text-black-alt mb-1">kontext Premium</span>
    											<span className="text-xs font-normal">Ads-free browsing</span>
    										</div>
    										<div className="flex ml-auto">
    											<button className="bg-orange text-xs text-white font-semibold rounded px-4 py-2 ml-auto">GET PREMIUM</button>
    										</div>
    									</div>
    								</div>
    							</div>
    							<div className="rounded bg-white mb-4">
    								<div className="p-3 text-xs font-semibold w-full">TRENDING COMMUNITIES</div>
    								<div className="pb-4">
    									<div className="px-3 py-2">
    										<div className="flex">
    											<img className="h-8 w-8 border rounded-full mr-2" src="https://avatars0.githubusercontent.com/u/30317862?s=200&v=4"/>
    											<div className="flex flex-col font-medium text-left">
    												<a href="#" className="text-xs text-black-alt no-underline leading-tight">#crypto</a>
    												<span className="text-xs">1.000 subscribers</span>
    											</div>
    											<div className="flex ml-auto">
    												<button className="bg-blue-700 text-xs text-white font-semibold rounded px-4 ml-auto">SUBSCRIBE</button>
    											</div>
    										</div>
    									</div>
    									<div className="px-3 py-2">
    										<div className="flex">
    											<img className="h-8 w-8 border rounded-full mr-2" src="https://avatars0.githubusercontent.com/u/30317862?s=200&v=4"/>
    											<div className="flex flex-col font-medium text-left">
    												<a href="#" className="text-xs text-black-alt no-underline leading-tight">#design</a>
    												<span className="text-xs">1.000 subscribers</span>
    											</div>
    											<div className="flex ml-auto">
    												<button className="bg-blue-700 text-xs text-white font-semibold rounded px-4 ml-auto">SUBSCRIBE</button>
    											</div>
    										</div>
    									</div>
    									<div className="px-3 py-2">
    										<div className="flex">
    											<img className="h-8 w-8 border rounded-full mr-2" src="https://avatars0.githubusercontent.com/u/30317862?s=200&v=4"/>
    											<div className="flex flex-col font-medium text-left">
    												<a href="#" className="text-xs text-black-alt no-underline leading-tight">#code</a>
    												<span className="text-xs">1.000 subscribers</span>
    											</div>
    											<div className="flex ml-auto">
    												<button className="bg-blue-700 text-xs text-white font-semibold rounded px-4 ml-auto">SUBSCRIBE</button>
    											</div>
    										</div>
    									</div>
    									<div className="px-3 py-2">
    										<div className="flex">
    											<img className="h-8 w-8 border rounded-full mr-2" src="https://avatars0.githubusercontent.com/u/30317862?s=200&v=4"/>
    											<div className="flex flex-col font-medium text-left">
    												<a href="#" className="text-xs text-black-alt no-underline leading-tight">#data</a>
    												<span className="text-xs">1.000 subscribers</span>
    											</div>
    											<div className="flex ml-auto">
    												<button className="bg-blue-700 text-xs text-white font-semibold rounded px-4 ml-auto">SUBSCRIBE</button>
    											</div>
    										</div>
    									</div>
    									<div className="px-3 py-2">
    										<div className="flex">
    											<img className="h-8 w-8 border rounded-full mr-2" src="https://avatars0.githubusercontent.com/u/30317862?s=200&v=4"/>
    											<div className="flex flex-col font-medium text-left">
    												<a href="#" className="text-xs text-black-alt no-underline leading-tight">#startups</a>
    												<span className="text-xs">1.000 subscribers</span>
    											</div>
    											<div className="flex ml-auto">
    												<button className="bg-blue-700 text-xs text-white font-semibold rounded px-4 ml-auto">SUBSCRIBE</button>
    											</div>
    										</div>
    									</div>
    								</div>
    							</div>
    							<div className="rounded bg-white mb-4">
    								<div className="p-3">
    									<div className="flex justify-between">
    										<div>
    											<a href="#" className="block text-black no-underline text-xs font-medium">About</a>
    											<a href="#" className="block text-black no-underline text-xs font-medium">Careers</a>
    											<a href="#" className="block text-black no-underline text-xs font-medium">Press</a>
    										</div>
    										<div>
    											<a href="#" className="block text-black no-underline text-xs font-medium">Blog</a>
    											<a href="#" className="block text-black no-underline text-xs font-medium">Discord</a>
    											<a href="#" className="block text-black no-underline text-xs font-medium">FAQ</a>
    										</div>
    										<div>
    											<a href="#" className="block text-black no-underline text-xs font-medium">The kontext App</a>
    											<a href="#" className="block text-black no-underline text-xs font-medium">kontext Premium</a>
    										</div>
    									</div>
    									<div className="text-center mt-6">
    										<p className="text-xs text-black leading-tight font-medium">
    											<a href="#" className="text-black no-underline">Content Policy</a> | <a href="#" className="text-black no-underline">Privacy Policy</a>
    										</p>
    										<p className="text-xs text-black leading-tight font-medium">
    											<a href="#" className="text-black no-underline">User Agreement</a> | <a href="#" className="text-black no-underline">Mod Policy</a>
    										</p>
    										<p className="text-xs text-black leading-tight font-medium">© 2020 kontext.</p>
    									</div>
    								</div>
    							</div>
    						</div>

    					</div>
    				</div>
    			</div>
    		</div>
    	</div>
    );
  }
}
