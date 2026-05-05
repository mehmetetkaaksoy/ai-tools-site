import Link from "next/link";
import { blogs } from "../../lib/blog";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>

      <div className="grid gap-6">
        {blogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blog/${blog.slug}`}
            className="p-4 bg-gray-800 rounded-xl hover:bg-gray-700"
          >
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-400">{blog.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}