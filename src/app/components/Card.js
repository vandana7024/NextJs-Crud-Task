"use client";
import React from "react";

function Card({ posts }) {
  return (
    <div className="grid md:grid-cols-3 gap-4  grid-cols-1 w-full mt-8">
      {posts.map((post) => (
        <div
          key={post.id}
          className="border border-gray-200 p-4 rounded-md w-full"
        >
          <h2 className="font-bold text-lg">{post.title}</h2>
          <p className="mt-2">{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default Card;
