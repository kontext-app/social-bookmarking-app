import React, { Component } from "react"
//import { Feed } from './Feed.js';
import Post from './Post.js';

import cloud from './../../assets/icons/cloud.svg';
import sort from './../../assets/icons/arrow-down-circle.svg';

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
    		<div className="">
    			<div className="mb-3">
    				<div className="px-16 mx-auto">


            <div className="flex shadow-md bg-white items-center w-auto h-10 pl-8 pr-2 border border-grey-lightest hover:border-blue rounded relative space-x-2">
              <svg className="w-4 left-0 ml-2 fill-current text-grey-700" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg"><g><path d="M12.4743167,11.1299698 L14.6957506,13.2817166 C15.0924476,13.665969 15.1025359,14.2990536 14.7182834,14.6957506 C14.334031,15.0924476 13.7009464,15.1025359 13.3042494,14.7182834 L11.0486163,12.5334103 C10.0079655,13.2768564 8.73367013,13.7142857 7.35714286,13.7142857 C3.84600096,13.7142857 1,10.8682847 1,7.35714286 C1,3.84600096 3.84600096,1 7.35714286,1 C10.8682847,1 13.7142857,3.84600096 13.7142857,7.35714286 C13.7142857,8.76975383 13.2536226,10.0747029 12.4743167,11.1299698 Z M11.7142857,7.35714286 C11.7142857,4.95057046 9.76371525,3 7.35714286,3 C4.95057046,3 3,4.95057046 3,7.35714286 C3,9.76371525 4.95057046,11.7142857 7.35714286,11.7142857 C9.76371525,11.7142857 11.7142857,9.76371525 11.7142857,7.35714286 Z"></path></g></svg>
              <input className="text-sm w-full outline-none" type="text" name="search" placeholder="Search Bookmarks"></input>
            </div>

    					<div className="flex justify-between pt-4">
  							<div className="inline-flex items-center mr-6">
									<button className="inline-flex items-center outline-none">
										<img src={cloud} alt="all bookmarks" className="flex-shrink-0" />
                    <span className="text-xs font-semibold ml-1">Search in all Bookmarks</span>
										<svg className="h-4 fill-current text-blue" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g><path fill="inherit" d="M14.1711599,9.3535 L9.99925636,13.529 L5.82735283,9.3535 C5.51262415,9.0385 5.73543207,8.5 6.18054835,8.5 L13.8179644,8.5 C14.2630807,8.5 14.4858886,9.0385 14.1711599,9.3535"></path></g></svg>
									</button>
    						</div>
                <button className="inline-flex items-center outline-none">
                  <img src={sort} alt="all bookmarks" className="flex-shrink-0" />
                  <span className="text-xs font-semibold ml-1">Sort by Relevance</span>
                  <svg className="h-4 fill-current text-blue" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g><path fill="inherit" d="M14.1711599,9.3535 L9.99925636,13.529 L5.82735283,9.3535 C5.51262415,9.0385 5.73543207,8.5 6.18054835,8.5 L13.8179644,8.5 C14.2630807,8.5 14.4858886,9.0385 14.1711599,9.3535"></path></g></svg>
                </button>
    					</div>
    				</div>
    			</div>
    			<div className=" mx-auto">
    				<div className="flex w-960 mx-auto">

              <div className="w-full">
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

    				</div>
    			</div>
    		</div>
    	</div>
    );
  }
}
