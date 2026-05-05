import { blogs } from "../../../lib/blog";
import { notFound } from "next/navigation";

export default async function Page({ params }: any) {
  const { slug } = await params; // 🔥 KRİTİK

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return notFound();

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

      <p className="text-gray-400 mb-6">{blog.description}</p>

      <div className="whitespace-pre-line text-gray-200">
        {blog.content}
      </div>
    </div>
  );
}