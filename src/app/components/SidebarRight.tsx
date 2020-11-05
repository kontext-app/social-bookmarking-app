import React from 'react';
import { Link } from 'react-router-dom';

import user_icon from 'assets/icons/user_placeholder.svg';
import music from 'assets/icons/music.svg';
import hashtag from 'assets/icons/hashtag.svg';

export function SidebarRight() {
  return (
    <div className="md:flex flex-col md:flex-row md:min-h-screen">
      <div
        className="flex flex-col w-full md:w-64 text-gray-700 bg-gray-100 dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0"
        x-data="{ open: false }"
      >
        <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
          <div className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">
            Discover
          </div>
        </div>
        <nav className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
          <Link to="/popular">
            <p className="text-gray-500 block px-4 py-2 text-sm font-semibold">
              Popular
            </p>
          </Link>
          <div className="flex justify-between space-x-2 items-center px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <img
              src={hashtag}
              alt="Collection Folder"
              className="flex-shrink-0"
            />
            <span className="flex-1 font-semibold text-gray-900">Coding</span>
            <span className="flex-shrink-0 text-gray-500">+</span>
          </div>
          <div className="flex justify-between space-x-2 items-center px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <img src={hashtag} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">
              Crypto tools
            </span>
            <span className="flex-shrink-0 text-gray-500">51</span>
          </div>
          <div className="flex justify-between space-x-2 items-center px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <img src={music} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Music</span>
            <span className="flex-shrink-0 text-gray-500">3009</span>
          </div>
          <div className="flex justify-between space-x-2 items-center px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <img src={hashtag} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">
              Minimalist
            </span>
            <span className="flex-shrink-0 text-gray-500">+</span>
          </div>

          <Link to="/popular">
            <p className="text-gray-500 block px-4 py-2 text-sm font-semibold">
              Recent
            </p>
          </Link>
          <div className="flex justify-between space-x-2 items-center px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <img src={hashtag} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Filecoin</span>
            <span className="flex-shrink-0 text-gray-500">+</span>
          </div>
          <div className="flex justify-between space-x-2 items-center px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <img src={hashtag} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Ethereum</span>
            <span className="flex-shrink-0 text-gray-500">51</span>
          </div>
          <div className="flex justify-between space-x-2 items-center px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <img src={music} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Music</span>
            <span className="flex-shrink-0 text-gray-500">3009</span>
          </div>
          <div className="flex justify-between space-x-2 items-center px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <img src={hashtag} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">
              Javascript
            </span>
            <span className="flex-shrink-0 text-gray-500">2</span>
          </div>

          <p className="text-gray-500 block px-4 py-2 text-sm font-semibold">
            Related
          </p>
          <div className="flex justify-between space-x-2 items-center px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <img src={hashtag} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Coding</span>
            <span className="flex-shrink-0 text-gray-500">2</span>
          </div>
          <div className="flex justify-between space-x-2 items-center px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <img src={hashtag} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Design</span>
            <span className="flex-shrink-0 text-gray-500">2</span>
          </div>
          <div className="flex justify-between space-x-2 items-center px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <img src={hashtag} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Crypto</span>
            <span className="flex-shrink-0 text-gray-500">+</span>
          </div>
          <div className="flex justify-between space-x-2 items-center px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <img src={hashtag} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">Startups</span>
            <span className="flex-shrink-0 text-gray-500">+</span>
          </div>

          <p className="text-gray-500 block px-4 py-2 text-sm font-semibold">
            People who faved this tag
          </p>
          <div className="flex justify-between space-x-2 items-center px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <img src={user_icon} alt="user_icon" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">
              Feifei Seesquatch
            </span>
            <span className="flex-shrink-0 text-gray-500">+</span>
          </div>
          <div className="flex justify-between space-x-2 items-center px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <img src={user_icon} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">
              Mr. Dowittle
            </span>
            <span className="flex-shrink-0 text-gray-500">+</span>
          </div>
          <div className="flex justify-between space-x-2 items-center px-4 py-2 text-sm rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <img src={user_icon} alt="Favorites" className="flex-shrink-0" />
            <span className="flex-1 font-semibold text-gray-900">
              Vitalike Buterion
            </span>
            <span className="flex-shrink-0 text-gray-500">+</span>
          </div>
        </nav>

        <div className="mb-4">
          <div className="p-3">
            <div className="flex justify-between text-gray-500 no-underline text-xs font-medium">
              <div>
                <div className="block">About</div>
                <div className="block">Careers</div>
                <div className="block">Press</div>
              </div>
              <div>
                <div className="block">Blog</div>
                <div className="block">Discord</div>
                <div className="block">FAQ</div>
              </div>
              <div>
                <div className="block">The kontext App</div>
                <div className="block">kontext Premium</div>
              </div>
            </div>
            <div className="text-center mt-6 text-gray-500 no-underline text-xs font-medium">
              <p className="leading-tight">
                <span>Content Policy</span> | <span>Privacy Policy</span>
              </p>
              <p className="leading-tight">
                <span>User Agreement</span> | <span>Mod Policy</span>
              </p>
              <p className="leading-tight">© 2020 kontext.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
