"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, addDoc, query, where, deleteDoc, doc, } from "firebase/firestore";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../lib/firebase";

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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [user, setUser] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return () => unsubscribe();
}, []);

useEffect(() => {
  const fetchTools = async () => {
    const snapshot = await getDocs(collection(db, "tools"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Tool[];

    setTools(data);
  };

  fetchTools();
}, []);

useEffect(() => {
  if (!user) return;

  const fetchFavorites = async () => {
    const q = query(
      collection(db, "favorites"),
      where("userId", "==", user.uid)
    );

    const snapshot = await getDocs(q);

    const favs = snapshot.docs.map((doc) => doc.data().toolId);

    setFavorites(favs);
  };

  fetchFavorites();
}, [user]);

  const handleGoogleLogin = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error);
  }
};

const handleLogout = async () => {
  await signOut(auth);
};

const toggleFavorite = async (toolId: string) => {
  if (!user) {
    alert("Lütfen önce giriş yapın");
    return;
  }

  const q = query(
    collection(db, "favorites"),
    where("userId", "==", user.uid),
    where("toolId", "==", toolId)
  );

  const snapshot = await getDocs(q);

  // ❌ varsa sil
  if (!snapshot.empty) {
    await deleteDoc(doc(db, "favorites", snapshot.docs[0].id));

    setFavorites((prev) =>
      prev.filter((id) => id !== toolId)
    );
  } 
  // ✅ yoksa ekle
  else {
    await addDoc(collection(db, "favorites"), {
      userId: user.uid,
      toolId,
      createdAt: Date.now(),
    });

    setFavorites((prev) => [...prev, toolId]);
  }
};

  

  const stopWords = ["yapmak", "etmek", "istiyorum", "için"];

const words = search
  .toLowerCase()
  .split(" ")
  .map(w => w.trim())
  .filter(w => w && !stopWords.includes(w));

const filteredTools = tools.filter((tool) => {
  const text = `${tool.name} ${tool.description} ${(tool.tags || []).join(" ")}`.toLowerCase();

  const matchesSearch =
    words.length === 0
      ? true
      : words.some((word) => text.includes(word));

  const matchesCategory =
    selectedCategory === "All" || tool.category === selectedCategory;

  return matchesSearch && matchesCategory;
});

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col items-center pt-16 ">
      
      <div className="absolute top-5 right-40">
  {user ? (
    <div className="flex items-center gap-3">
      <img
        src={user.photoURL}
        alt="profile"
        className="w-10 h-10 rounded-full"
      />

      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded-xl"
      >
        Çıkış yap
      </button>
    </div>
  ) : (
    <button
      onClick={handleGoogleLogin}
      className="bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-2 rounded-xl hover:scale-105 transition"
    >
      Google ile giriş yapın
    </button>
  )}
</div>

      <div className="fixed top-5 right-6 z-50">
  <Link
    href="/blog"
    className="flex items-center gap-2 px-4 py-2 rounded-xl 
    bg-gradient-to-r from-purple-600 to-blue-600 
    hover:from-purple-500 hover:to-blue-500
    shadow-lg shadow-purple-500/30
    transition-all duration-300 hover:scale-105"
  >
    🧠 Blog
  </Link>
</div>
      {/* 🔥 NAVBAR */}
      
      <h1 className="text-4xl md:text-6xl font-bold leading-tight py-2 text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
  🚀 En İyi Yapay Zeka Araçları 2026
</h1>
    
    <p className="text-gray-400 mt-4 text-lg">
    Yazı, görsel, video, ses ve kod için en güçlü AI araçlarını keşfet.
  </p>  

      <input
  type="text"
  placeholder="AI aracı ara... (görsel, video, yazı...)"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="mt-6 w-full max-w-xl mx-auto block p-4 mb-10 rounded-xl bg-gray-800/60 backdrop-blur-md border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:scale-[1.01] shadow-lg focus:shadow-purple-500/50 transition-all duration-300"
/>
<div className="flex justify-center flex-wrap gap-2 mb-10">

  {["All", "Yazı", "Görsel", "Video", "Ses", "Kod"].map((cat) => (
    <button
      key={cat}
      onClick={() => setSelectedCategory(cat)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
        ${
          selectedCategory === cat
            ? "bg-purple-600 text-white shadow-md shadow-purple-500/30 scale-105"
            : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
        }`}
    >
      {cat}
    </button>
  ))}
</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {filteredTools.map((tool) => (
          <div
  key={tool.id}
  className="relative bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl p-5 
  transition-all duration-300 
hover:-translate-y-2 hover:scale-[1.02] 
hover:shadow-xl hover:shadow-purple-500/20"
>
<div className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 hover:scale-105 transition">
  {tool.category === "Video" && "🎥 Video"}
  {tool.category === "Görsel" && "🎨 Görsel"}
  {tool.category === "Yazı" && "✍️ Yazı"}
  {tool.category === "Kod" && "💻 Kod"}
  {tool.category === "Ses" && "🎤 Ses"}
</div>
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
  
  <button
  onClick={() => toggleFavorite(String(tool.id))}
  className="mt-4 text-2xl"
>
  {favorites.includes(String(tool.id)) ? "❤️" : "🤍"}
</button>

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