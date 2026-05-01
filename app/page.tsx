"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

type Tool = {
  id: string;
  name: string;
  description: string;
  link: string;
  category: string;
  tags: string[];
};

export default function Home() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchTools = async () => {
      const snapshot = await getDocs(collection(db, "tools"));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Tool[];

      setTools(data);
    };

    fetchTools();
  }, []);
  const stopWords = ["yapmak", "etmek", "istiyorum", "için"];
  const filteredTools = tools.filter(tool => {
  const words = search
  .toLowerCase()
  .split(" ")
  .map(word => word.trim())
  .filter(word => word !== "" && !stopWords.includes(word));

const matchSearch =
  tool.name.toLowerCase().includes(search.toLowerCase()) ||
  tool.tags?.some(tag =>
    words.some(word => tag.toLowerCase().includes(word))
  );

  const matchCategory =
    selectedCategory === "all" ||
    tool.category === selectedCategory;

  return matchSearch && matchCategory;
});

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col items-center pt-16">
      
      {/* 🔥 NAVBAR */}
      
      <h1 className="text-5xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
  🚀 AI Araç Bulucu
</h1>
      

      <input
  type="text"
  placeholder="AI aracı ara... (logo, video, yazı...)"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full max-w-xl mx-auto block p-4 mb-10 rounded-xl bg-gray-800/60 backdrop-blur-md border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
/>
<div className="mb-8">
  <h2 className="text-xl mb-4 text-gray-300">
    Popüler kategoriler
  </h2>

  <div className="flex justify-center flex-wrap gap-3 mb-10">
    <button
      onClick={() => setSearch("logo")}
      className="px-4 py-2 rounded-lg transition hover:scale-105 bg-white/10 hover:bg-white/20"
    >
      🎨 Logo Yap
    </button>

    <button
      onClick={() => setSearch("video")}
      className="px-4 py-2 rounded-lg transition hover:scale-105 bg-white/10 hover:bg-white/20"
    >
      🎥 Video Üret
    </button>

    <button
      onClick={() => setSearch("writing")}
      className="px-4 py-2 rounded-lg transition hover:scale-105 bg-white/10 hover:bg-white/20"
    >
      ✍️ Yazı Yaz
    </button>
  </div>
</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {filteredTools.map(tool => (
          <div
  key={tool.id}
  className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl p-5 transition transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
>
  <h3 className="text-xl font-semibold mb-2">
    {tool.name}
  </h3>

  <p className="text-gray-400 text-sm">
    {tool.description}
  </p>

  <div className="mt-4 flex flex-wrap gap-2">
    {tool.tags?.map((tag, index) => (
      <span
        key={index}
        className="bg-purple-600/20 text-purple-300 text-xs px-2 py-1 rounded-md"
      >
        #{tag}
      </span>
    ))}
  </div>

  <Link
    href={`/tool/${tool.id}`}
    className="inline-block mt-4 text-blue-400 hover:underline"
  >
    Detay →
  </Link>
</div>
        ))}
      </div>
    </div>
  );
}