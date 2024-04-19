import Card from "../components/Card";

async function fetchData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      next: {
        revalidate: 30,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default async function page() {
  const posts = await fetchData();

  console.log({ posts });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24  text-black bg-white">
      <div className="w-full">
        <Card posts={posts} />
      </div>
    </main>
  );
}
