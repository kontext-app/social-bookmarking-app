import React, { Component } from "react";
import user_icon from './../assets/icons/user_placeholder.svg';
import cloud from './../assets/icons/cloud.svg';
import inbox from './../assets/icons/inbox.svg';
import folder from './../assets/icons/folder.svg';
import heart from './../assets/icons/heart.svg';
import text from './../assets/icons/text.svg';
import music from './../assets/icons/music.svg';
import hashtag from './../assets/icons/hashtag.svg';

export function SidebarRight() {
  return (
    <div className="md:flex flex-col md:flex-row md:min-h-screen">
      <div /*@click.away="open = false"*/ className="flex flex-col w-full md:w-64 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0" x-data="{ open: false }">
        <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
          <a href="#" className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">Flowtrail UI</a>
          <button className="rounded-lg md:hidden rounded-lg focus:outline-none focus:shadow-outline" /*@click="open = !open"*/>
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              <path x-show="!open" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd"></path>
              <path x-show="open" fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>

          </button>
        </div>
        <nav /*:className="{'block': open, 'hidden': !open}"*/ className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
          <div /*@click.away="open = false"*/ className="dropdown relative" x-data="{ open: false }">
            <button /*@click="open = !open"*/ className="flex space-x-2 w-full items-center block px-4 py-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
              <img src={user_icon} alt="user_icon" className=""/>
              <span>Chris</span>
              <svg fill="currentColor" viewBox="0 0 20 20" /*:className="{'rotate-180': open, 'rotate-0': !open}"*/ className="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
            <div className="dropdown-menu hidden absolute right-0 w-full origin-top-right rounded-md shadow-lg">
              <div className="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800">
                <a className="flex space-x-2 items-center block px-4 py-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
                  <svg width="18" height="18" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M480 1280q-66 0-113-47t-47-113v-704q0-66 47-113t113-47h1088q66 0 113 47t47 113v704q0 66-47 113t-113 47h-1088zm-32-864v704q0 13 9.5 22.5t22.5 9.5h1088q13 0 22.5-9.5t9.5-22.5v-704q0-13-9.5-22.5t-22.5-9.5h-1088q-13 0-22.5 9.5t-9.5 22.5zm1376 928h160v96q0 40-47 68t-113 28h-1600q-66 0-113-28t-47-68v-96h1760zm-720 96q16 0 16-16t-16-16h-160q-16 0-16 16t16 16h160z"
                      />
                  </svg>
                  <span>Profile</span>
                </a>
                <a className="flex space-x-2 items-center block px-4 py-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
                  <svg width="18" height="18" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M480 1280q-66 0-113-47t-47-113v-704q0-66 47-113t113-47h1088q66 0 113 47t47 113v704q0 66-47 113t-113 47h-1088zm-32-864v704q0 13 9.5 22.5t22.5 9.5h1088q13 0 22.5-9.5t9.5-22.5v-704q0-13-9.5-22.5t-22.5-9.5h-1088q-13 0-22.5 9.5t-9.5 22.5zm1376 928h160v96q0 40-47 68t-113 28h-1600q-66 0-113-28t-47-68v-96h1760zm-720 96q16 0 16-16t-16-16h-160q-16 0-16 16t16 16h160z"
                      />
                  </svg>
                  <span>Settings</span>
                </a>
                <a className="flex space-x-2 items-center block px-4 py-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
                  <svg width="18" height="18" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M480 1280q-66 0-113-47t-47-113v-704q0-66 47-113t113-47h1088q66 0 113 47t47 113v704q0 66-47 113t-113 47h-1088zm-32-864v704q0 13 9.5 22.5t22.5 9.5h1088q13 0 22.5-9.5t9.5-22.5v-704q0-13-9.5-22.5t-22.5-9.5h-1088q-13 0-22.5 9.5t-9.5 22.5zm1376 928h160v96q0 40-47 68t-113 28h-1600q-66 0-113-28t-47-68v-96h1760zm-720 96q16 0 16-16t-16-16h-160q-16 0-16 16t16 16h160z"
                      />
                  </svg>
                  <span>Log out</span>
                </a>
              </div>
              {/*
                Dropdown panel, show/hide based on dropdown state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
                  */}
            </div>
          </div>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={cloud} alt="all bookmarks" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">All bookmarks</span>
            <span className="flex-shrink-0 text-gray-500">99</span>
          </a>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={inbox} alt="unsorted bookmarks" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Unsorted</span>
            <span className="flex-shrink-0 text-gray-500">12</span>
          </a>

          <p className="text-gray-500 block px-4 py-2 text-sm font-semibold">
            My Collections
          </p>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={folder} alt="Collection Folder" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">First Collection</span>
            <span className="flex-shrink-0 text-gray-500">222</span>
          </a>

          <p className="text-gray-500 block px-4 py-2 text-sm font-semibold">
            Filters
          </p>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={heart} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Favorites</span>
            <span className="flex-shrink-0 text-gray-500">35</span>
          </a>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={text} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Articles</span>
            <span className="flex-shrink-0 text-gray-500">51</span>
          </a>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={music} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Music</span>
            <span className="flex-shrink-0 text-gray-500">420</span>
          </a>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={hashtag} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">No Tags</span>
            <span className="flex-shrink-0 text-gray-500">2</span>
          </a>

          <p className="text-gray-500 block px-4 py-2 text-sm font-semibold">
            Favorite Tags
          </p>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={hashtag} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Coding</span>
            <span className="flex-shrink-0 text-gray-500">2</span>
          </a>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={hashtag} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Design</span>
            <span className="flex-shrink-0 text-gray-500">2</span>
          </a>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={hashtag} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Crypto</span>
            <span className="flex-shrink-0 text-gray-500">2</span>
          </a>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={hashtag} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Startups</span>
            <span className="flex-shrink-0 text-gray-500">2</span>
          </a>

          <p className="text-gray-500 block px-4 py-2 text-sm font-semibold">
            Other Tags
          </p>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={hashtag} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Longreads</span>
            <span className="flex-shrink-0 text-gray-500">2</span>
          </a>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={hashtag} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Cooking</span>
            <span className="flex-shrink-0 text-gray-500">2</span>
          </a>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={hashtag} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">中国</span>
            <span className="flex-shrink-0 text-gray-500">2</span>
          </a>
        </nav>

        <div className="mb-4">
          <div className="p-3">
            <div className="flex justify-between text-gray-500 no-underline text-xs font-medium">
              <div>
                <a href="#" className="block">About</a>
                <a href="#" className="block">Careers</a>
                <a href="#" className="block">Press</a>
              </div>
              <div>
                <a href="#" className="block">Blog</a>
                <a href="#" className="block">Discord</a>
                <a href="#" className="block">FAQ</a>
              </div>
              <div>
                <a href="#" className="block">The kontext App</a>
                <a href="#" className="block">kontext Premium</a>
              </div>
            </div>
            <div className="text-center mt-6 text-gray-500 no-underline text-xs font-medium">
              <p className="leading-tight">
                <a href="#">Content Policy</a> | <a href="#">Privacy Policy</a>
              </p>
              <p className="leading-tight">
                <a href="#">User Agreement</a> | <a href="#">Mod Policy</a>
              </p>
              <p className="leading-tight">© 2020 kontext.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
