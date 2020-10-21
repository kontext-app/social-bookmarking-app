import React from 'react';
import { Link } from 'react-router-dom';

export function NavBar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200 z-10">
      {/*<div className="container mx-auto justify-between flex items-center h-16">
        <div className="space-x-1">
          <Link to="/">Kontext</Link>
        </div>
        <div className="space-x-5">
          <Link to="/recent">Recent</Link>
          <Link to="/popular">Popular</Link>
          <Link to="/my">My Bookmarks</Link>
        </div>
        <div>
          <Link to="/profile">Profile</Link>
        </div>
      </div>*/}

      <div className="px-5 w-full fixed h-12 bg-white border-grey-lightest border-b flex items-center">
        <div className="container mx-auto flex">
          <div className="w-3/5 flex">
            <div className="">
              <Link to="/">
                <a className="w-auto inline-flex items-center h-full">
                  <img className="h-auto w-64" src="https://i.imgur.com/6zofGmm.png"/>
                </a>
              </Link>
            </div>
            <div className="ml-5">
              <Link to="/popular">
                <div className="w-68 h-full border border-white hover:border-grey-lightest flex items-center rounded px-10 relative space-x-2">
                  <svg className="w-5 left-0 ml-2 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g><polygon fill="none" points="0 20 20 20 20 0 0 0"></polygon><polygon fill="inherit" points="12.5 3.5 20 3.5 20 11 17.5 8.5 11.25 14.75 7.5 11 2.5 16 0 13.5 7.5 6 11.25 9.75 15 6"></polygon></g></svg>
                  <span className="font-medium text-sm">Popular</span>
                  <svg className="w-6 right-0 mr-2" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g><path fill="inherit" d="M14.1711599,9.3535 L9.99925636,13.529 L5.82735283,9.3535 C5.51262415,9.0385 5.73543207,8.5 6.18054835,8.5 L13.8179644,8.5 C14.2630807,8.5 14.4858886,9.0385 14.1711599,9.3535"></path></g></svg>
                </div>
              </Link>
            </div>
            <div className="w-full mx-5">
              <div className="flex items-center w-auto h-full pl-8 pr-2 border border-grey-lightest hover:border-blue rounded relative space-x-2">
                <svg className="w-4 left-0 ml-2 fill-current text-grey-700" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg"><g><path d="M12.4743167,11.1299698 L14.6957506,13.2817166 C15.0924476,13.665969 15.1025359,14.2990536 14.7182834,14.6957506 C14.334031,15.0924476 13.7009464,15.1025359 13.3042494,14.7182834 L11.0486163,12.5334103 C10.0079655,13.2768564 8.73367013,13.7142857 7.35714286,13.7142857 C3.84600096,13.7142857 1,10.8682847 1,7.35714286 C1,3.84600096 3.84600096,1 7.35714286,1 C10.8682847,1 13.7142857,3.84600096 13.7142857,7.35714286 C13.7142857,8.76975383 13.2536226,10.0747029 12.4743167,11.1299698 Z M11.7142857,7.35714286 C11.7142857,4.95057046 9.76371525,3 7.35714286,3 C4.95057046,3 3,4.95057046 3,7.35714286 C3,9.76371525 4.95057046,11.7142857 7.35714286,11.7142857 C9.76371525,11.7142857 11.7142857,9.76371525 11.7142857,7.35714286 Z"></path></g></svg>
                <input className="text-sm w-full" type="text" name="search" placeholder="Search Bookmarks"/>
              </div>
            </div>
          </div>
          <div className="w-2/5 flex justify-end items-center">
            <Link to="/popular">
              <a className="p-2 flex items-center rounded-sm mr-2 hover:bg-grey-lighter">
                <svg className="w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g><polygon fill="none" points="0 20 20 20 20 0 0 0"></polygon><polygon fill="inherit" points="12.5 3.5 20 3.5 20 11 17.5 8.5 11.25 14.75 7.5 11 2.5 16 0 13.5 7.5 6 11.25 9.75 15 6"></polygon></g></svg>
              </a>
            </Link>
            <Link to="/recent">
              <a className="p-2 flex items-center rounded-sm mr-2 hover:bg-grey-lighter">
                <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g fill-rule="evenodd"><polygon fill="none" points="0 20 20 20 20 .001 0 .001"></polygon><path fill="inherit" d="M1.25,17.5 L1.25,7.5 L6.25,7.5 L6.25,17.5 L1.25,17.5 Z M12.49995,17.5001 L7.49995,17.5001 L7.49995,5.0001 L4.99995,5.0001 L9.99995,0.0006 L14.99995,5.0001 L12.49995,5.0001 L12.49995,17.5001 Z M13.75,17.5 L13.75,12.5 L18.75,12.5 L18.75,17.5 L13.75,17.5 Z"></path></g></svg>
              </a>
            </Link>
            <Link to="/my">
              <a className="p-2 flex items-center rounded-sm mr-2 hover:bg-grey-lighter">
                <svg className="w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="inherit" d="M16.9998,2.9995 C18.1028,2.9995 18.9998,3.8975 18.9998,4.9995 L18.9998,14.9995 C18.9998,16.1025 18.1028,16.9995 16.9998,16.9995 L2.9998,16.9995 C1.8978,16.9995 0.9998,16.1025 0.9998,14.9995 L0.9998,4.9995 C0.9998,3.8975 1.8978,2.9995 2.9998,2.9995 L16.9998,2.9995 Z M13.9648,13.3525 C15.2718,13.3525 16.3188,12.6745 16.8278,11.5665 L15.1818,10.9775 C14.9318,11.4765 14.4528,11.8165 13.8338,11.8165 C13.0158,11.8165 12.3478,11.0575 12.3478,9.9995 C12.3478,8.9525 13.0058,8.1735 13.8438,8.1735 C14.4528,8.1735 14.9218,8.5025 15.1308,8.9615 L16.6968,8.2435 C16.1988,7.2755 15.2108,6.6365 13.9648,6.6365 C12.0588,6.6365 10.5118,8.1335 10.5118,9.9995 C10.5118,11.8755 12.0588,13.3525 13.9648,13.3525 Z M6.6248,13.3635 C8.5408,13.3635 10.0878,11.8755 10.0878,9.9995 C10.0878,8.1335 8.5408,6.6365 6.6248,6.6365 C4.7188,6.6365 3.1718,8.1335 3.1718,9.9995 C3.1718,11.8755 4.7188,13.3635 6.6248,13.3635 Z M6.625,8.1641 C7.562,8.1641 8.262,8.9421 8.262,10.0001 C8.262,11.0481 7.562,11.8361 6.625,11.8361 C5.697,11.8361 4.998,11.0481 4.998,10.0001 C4.998,8.9421 5.697,8.1641 6.625,8.1641 Z"></path></svg>
              </a>
            </Link>
            <a href="#" className="border border-blue-700 text-blue-700 px-8 py-2.2 font-semibold text-xs rounded ml-4 no-underline hover:border-blue hover:text-blue">LOG IN</a>
            <a href="#" className="border border-blue-700 bg-blue-700 text-white px-8 py-2.2 font-semibold text-xs rounded ml-4 no-underline hover:bg-blue">SIGN UP</a>
            <Link to="/profile">
              <button className="inline-flex items-center ml-3 mr-5">
                <div className="flex items-center pr-2">
                  <svg className="w-6 fill-current text-grey-700" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg"><g fill="inherit"><path d="M146.8 142.6h-37.6c-31.1 0-56.5 25.3-56.5 56.5 0 5.2 4.2 9.4 9.4 9.4h131.8c5.2 0 9.4-4.2 9.4-9.4 0-31.2-25.3-56.5-56.5-56.5zM128 130.7c20.1 0 36.4-16.3 36.4-36.4v-9.4c0-20.1-16.3-36.4-36.4-36.4S91.6 64.8 91.6 84.9v9.4c0 20.1 16.3 36.4 36.4 36.4z"></path></g></svg>
                </div>
                <svg className="w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g><path fill="inherit" d="M14.1711599,9.3535 L9.99925636,13.529 L5.82735283,9.3535 C5.51262415,9.0385 5.73543207,8.5 6.18054835,8.5 L13.8179644,8.5 C14.2630807,8.5 14.4858886,9.0385 14.1711599,9.3535"></path></g></svg>
              </button>
            </Link>
          </div>
        </div>
      </div>

    </nav>
  );
}
