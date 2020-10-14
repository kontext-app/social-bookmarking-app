import React, { Component } from "react";
import { Link } from 'react-router-dom';
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
      <div /*@click.away="open = false"*/ className="flex flex-col w-full md:w-64 text-gray-700 bg-gray-100 dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0" x-data="{ open: false }">
        <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
          <a href="#" className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">Social</a>
        </div>
        <nav className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
          <div className="flex flex-row relative" x-data="{ open: false }">
            <button className="flex space-x-2 w-full items-center block px-4 py-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
              <img src={user_icon} alt="user_icon" className=""/>
              <span>Followers</span>
            </button>
            <button className="flex space-x-2 w-full items-center block px-4 py-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
              <img src={user_icon} alt="user_icon" className=""/>
              <span>Following</span>
            </button>
          </div>

          <Link to="/popular">
            <p className="text-gray-500 block px-4 py-2 text-sm font-semibold">
              Popular
            </p>
          </Link>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={hashtag} alt="Collection Folder" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Coding</span>
            <span className="flex-shrink-0 text-gray-500">+</span>
          </a>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={hashtag} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Crypto tools</span>
            <span className="flex-shrink-0 text-gray-500">51</span>
          </a>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={music} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Music</span>
            <span className="flex-shrink-0 text-gray-500">3009</span>
          </a>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={hashtag} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Minimalist</span>
            <span className="flex-shrink-0 text-gray-500">+</span>
          </a>

          <Link to="/popular">
            <p className="text-gray-500 block px-4 py-2 text-sm font-semibold">
              Recent
            </p>
          </Link>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={hashtag} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Filecoin</span>
            <span className="flex-shrink-0 text-gray-500">+</span>
          </a>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={hashtag} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Ethereum</span>
            <span className="flex-shrink-0 text-gray-500">51</span>
          </a>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={music} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Music</span>
            <span className="flex-shrink-0 text-gray-500">3009</span>
          </a>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={hashtag} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Javascript</span>
            <span className="flex-shrink-0 text-gray-500">2</span>
          </a>

          <p className="text-gray-500 block px-4 py-2 text-sm font-semibold">
            Related
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
            <span className="flex-shrink-0 text-gray-500">+</span>
          </a>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={hashtag} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Startups</span>
            <span className="flex-shrink-0 text-gray-500">+</span>
          </a>

          <p className="text-gray-500 block px-4 py-2 text-sm font-semibold">
            People who faved this tag
          </p>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={user_icon} alt="user_icon" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Feifei Seesquatch</span>
            <span className="flex-shrink-0 text-gray-500">+</span>
          </a>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={user_icon} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Mr. Dowittle</span>
            <span className="flex-shrink-0 text-gray-500">+</span>
          </a>
          <a className="flex justify-between space-x-2 items-center block px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
            <img src={user_icon} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Vitalike Buterion</span>
            <span className="flex-shrink-0 text-gray-500">+</span>
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
