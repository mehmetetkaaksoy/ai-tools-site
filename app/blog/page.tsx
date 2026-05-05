import Link from "next/link";
import { blogs } from "../../lib/blog";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-10">

      <h1 className="text-4xl md:text-6xl font-bold mt-10 mb-6 text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
        🧠 AI Blog
      </h1>

      <p className="text-gray-400 text-center mb-12">
        Yapay zeka dünyasındaki en güncel rehberler ve içerikler
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blog/${blog.slug}`}
            className="group relative bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20"
          >
            {/* Glow efekti */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>

            <h2 className="text-xl font-semibold mb-2 relative z-10">
              {blog.title}
            </h2>

            <p className="text-gray-400 text-sm relative z-10">
              {blog.description}
            </p>

            <span className="inline-block mt-4 text-blue-400 text-sm group-hover:underline relative z-10">
              Devamını oku →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}