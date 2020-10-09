import React, { Component } from "react"
//import { Post } from './Post.js';
import ProfileHover from "profile-hover";

export default class Post extends Component {
  render(){
    return (
      <div className="flex border border-grey-light-alt hover:border-grey rounded bg-white cursor-pointer">
        <div className="w-1/12 flex flex-col text-center m-auto items-center">
          <button className="text-xs">
            <svg className="w-5 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10v8h6v-8h5l-8-8-8 8h5z"/></svg>
          </button>
          <span className="text-xs font-semibold my-1">20k</span>
          <button className="text-xs">
            <svg className="w-5 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10V2h6v8h5l-8 8-8-8h5z"/></svg>
          </button>
        </div>
        <div className="w-11/12 pt-2 text-left">
          <div className="flex items-center text-xs mb-2">
            <a href="#" className="font-semibold no-underline hover:underline text-black flex items-center">
              <img className="rounded-full border h-5 w-5" src="https://avatars0.githubusercontent.com/u/30317862?s=200&v=4"/>
              <span className="ml-2">#crypto</span>
            </a>
            <span className="text-grey-light mx-1 text-xs">•</span>
            <span className="text-grey">Posted by</span>
            <a href="#" className="text-grey mx-1 no-underline hover:underline">
              {this.props.post.message.account && (
                <div>
                  <ProfileHover
                    address={this.props.post.message.account}
                    showName={true}
                  />
                </div>
              )}
            </a>
            <span className="text-grey">2 hours ago</span>
          </div>
          <div>
            <h2 className="text-lg font-medium mb-1">{this.props.post.message.commentHeader ? this.props.post.message.commentHeader : "unknown"}</h2>
          </div>
          <div>
            <p className="font-normal mb-3 text-sm">{this.props.post.message.comment ? this.props.post.message.comment : "unknown"}</p>
          </div>
          <div className="inline-flex items-center my-1">
            <div className="flex hover:bg-grey-lighter p-1">
              <svg className="w-4 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-4 4v-4H2a2 2 0 0 1-2-2V3c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8zM5 7v2h2V7H5zm4 0v2h2V7H9zm4 0v2h2V7h-2z"/></svg>
              <span className="ml-2 text-xs font-semibold text-grey">3k Comments</span>
            </div>
            <div className="flex hover:bg-grey-lighter p-1 ml-2">
              <svg className="w-4 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.08 12.16A2.99 2.99 0 0 1 0 10a3 3 0 0 1 5.08-2.16l8.94-4.47a3 3 0 1 1 .9 1.79L5.98 9.63a3.03 3.03 0 0 1 0 .74l8.94 4.47A2.99 2.99 0 0 1 20 17a3 3 0 1 1-5.98-.37l-8.94-4.47z"/></svg>
              <span className="ml-2 text-xs font-semibold text-grey">Share</span>
            </div>
            <div className="flex hover:bg-grey-lighter p-1 ml-2">
              <svg className="w-4 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 2C0 .9.9 0 2 0h14l4 4v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5 0v6h10V2H5zm6 1h3v4h-3V3z"/></svg>
              <span className="ml-2 text-xs font-semibold text-grey">Save</span>
            </div>
            <div className="flex hover:bg-grey-lighter p-1 ml-2 rotate-90">
              <svg className="w-4 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
