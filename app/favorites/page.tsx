"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";

type Tool = {
  id: string;
  name: string;
  description: string;
};

export default function FavoritesPage() {
  const [user, setUser] = useState<any>(null);
  const [tools, setTools] = useState<Tool[]>([]);

  // 🔐 USER CHECK
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => unsub();
  }, []);

  // ❤️ FAVORITES FETCH
  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      const q = query(
        collection(db, "favorites"),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(q);

      const toolIds = snapshot.docs.map((d) => d.data().toolId);

      // tools collection çekiyoruz
      const toolsSnap = await getDocs(collection(db, "tools"));

      const allTools = toolsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Tool[];

      const filtered = allTools.filter((t) =>
        toolIds.includes(t.id)
      );

      setTools(filtered);
    };

    fetchFavorites();
  }, [user]);

  if (!user) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white text-center px-6">
      
      <div className="text-7xl mb-6">🔐</div>

      <h1 className="text-3xl font-bold mb-3">
        Giriş Yapmanız Gerekiyor
      </h1>

      <p className="text-gray-400 max-w-md">
        Favorilerinizi görmek için Google hesabınızla giriş yapın.
      </p>

      <Link
        href="/"
        className="mt-8 px-6 py-3 rounded-xl 
        bg-gradient-to-r from-purple-600 to-blue-600 
        hover:scale-105 transition"
      >
        🚀 Ana sayfaya git
      </Link>

    </div>
  );
}

  const removeFavorite = async (toolId: string) => {
  if (!user) return;

  const q = query(
    collection(db, "favorites"),
    where("userId", "==", user.uid),
    where("toolId", "==", toolId)
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    await deleteDoc(doc(db, "favorites", snapshot.docs[0].id));

    setTools((prev) =>
      prev.filter((tool) => tool.id !== toolId)
    );
  }
};

  return (
  <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-10">
    
    <h1
      className="text-5xl md:text-6xl font-bold leading-tight py-4 text-center 
      bg-gradient-to-r from-pink-400 to-red-500 text-transparent bg-clip-text mb-12"
    >
      ❤️ En Sevdiğiniz Yapay Zeka Araçları
    </h1>

    {tools.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        
        <div className="text-7xl mb-6">
          💔
        </div>

        <h2 className="text-3xl font-bold mb-3">
          Henüz favori aracınız yok
        </h2>

        <p className="text-gray-400 max-w-md">
          Yapay zeka araçlarını keşfetmeye başlayın ve
          favorilerinizi kaydedin.
        </p>

        <Link
          href="/"
          className="mt-8 px-6 py-3 rounded-xl 
          bg-gradient-to-r from-purple-600 to-blue-600
          hover:scale-105 transition"
        >
          🚀 AI Araçlarını Keşfet
        </Link>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="relative bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl p-5 
            transition-all duration-300 
            hover:-translate-y-2 hover:scale-[1.02] 
            hover:shadow-xl hover:shadow-pink-500/20"
          >
            
            <div className="absolute top-3 right-3 text-xl">
              ❤️
            </div>

            <h3 className="text-xl font-semibold mb-2">
              {tool.name}
            </h3>

            <p className="text-gray-400 text-sm">
              {tool.description}
            </p>

            <div className="flex gap-3 mt-6">
              
              <Link
                href={`/tool/${tool.id}`}
                className="inline-block text-blue-400 hover:underline"
              >
                Detay →
              </Link>

              <button
                onClick={() => removeFavorite(tool.id)}
                className="text-red-400 hover:text-red-300 transition"
              >
                ❌ Favorilerden kaldır
              </button>

            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
}