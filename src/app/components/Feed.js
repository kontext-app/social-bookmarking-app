import React, { Component } from "react"
import { Post } from './Post.js';

export function Feed() {
  return (
    <div className="w-2/3">
      <div className="py-2">
        <Post />
      </div>
    </div>
  );
}
