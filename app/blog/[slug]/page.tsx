import { blogs } from "../../../lib/blog";
import { notFound } from "next/navigation";

export default async function Page({ params }: any) {
  const { slug } = await params; // 🔥 KRİTİK

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return notFound();

  return (
    <div className="max-w-3xl mx-auto mt-10">
  <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-4 leading-[1.2] bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
    {blog.title}
  </h1>

  <p className="text-gray-400 mb-8 text-lg">
    {blog.description}
  </p>

  <div className="bg-gray-900/60 backdrop-blur-md border border-gray-700 rounded-2xl p-6 leading-8 text-gray-200 whitespace-pre-line space-y-4">
  {blog.content.split("\n").map((line, i) => (
    <p key={i}>{line}</p>
  ))}
</div>
</div>
  );
}