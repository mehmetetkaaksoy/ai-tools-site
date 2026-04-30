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
    <div className="min-h-screen bg-black text-white p-10">
      
      {/* 🔥 NAVBAR */}
      <div className="flex gap-4 mb-8">
        {["all", "text", "image", "video"].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === cat
                ? "bg-blue-500"
                : "bg-gray-800"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <h1 className="text-4xl font-bold mb-6">
        🚀 AI Araç Bulucu
      </h1>
      
      <div className="mb-8">
  <h2 className="text-xl mb-4 text-gray-300">
    Popüler kategoriler
  </h2>

  <div className="flex gap-3 flex-wrap">
    <button
      onClick={() => setSearch("logo")}
      className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
    >
      🎨 Logo Yap
    </button>

    <button
      onClick={() => setSearch("video")}
      className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
    >
      🎥 Video Üret
    </button>

    <button
      onClick={() => setSearch("writing")}
      className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
    >
      ✍️ Yazı Yaz
    </button>
  </div>
</div>

      <input
        type="text"
        placeholder="Örn: logo yapmak, video üretmek..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md p-3 mb-8 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredTools.map(tool => (
          <div
            key={tool.id}
            className="bg-gray-900 p-5 rounded-xl shadow-lg hover:scale-105 transition"
          >
            <h2 className="text-xl font-semibold">{tool.name}</h2>
            <p className="text-gray-400">{tool.description}</p>

 <Link
  href={`/tool/${tool.id}`}
  className="inline-block mt-4 text-blue-400"
>
  Detay →
</Link>
          </div>
        ))}
      </div>
    </div>
  );
}