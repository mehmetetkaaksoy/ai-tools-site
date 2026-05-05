import { blogs } from "../../../lib/blog";
import { notFound } from "next/navigation";

export default async function Page({ params }: any) {
  const { slug } = await params; // 🔥 KRİTİK

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return notFound();

  return (
    <div className="max-w-3xl mx-auto">
  <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
    {blog.title}
  </h1>

  <p className="text-gray-400 mb-8 text-lg">
    {blog.description}
  </p>

  <div className="space-y-4">
  {blog.content.split("\n").map((line, i) => (
    <p key={i}>{line}</p>
  ))}
</div>
</div>
  );
}