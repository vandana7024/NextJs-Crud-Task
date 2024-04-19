"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home({ Component, pageProps }) {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-black">
      <h1>Hello</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          router.push("/user/create");
        }}
      >
        Create User
      </button>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border border-gray-200 p-4 rounded-md">
            <h2 className="font-bold text-lg">{post.title}</h2>
            <p className="mt-2">{post.body}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
