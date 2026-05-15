"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
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
      <div className="p-10 text-white">
        <h1 className="text-2xl">Please login first</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        ❤️ En Sevdiğiniz Yapay Zeka Araçları
      </h1>

      {tools.length === 0 ? (
        <p className="text-gray-400">
          Henüz favorilere eklenmemiş
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tool/${tool.id}`}
              className="p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition"
            >
              <h3 className="text-lg font-semibold">
                {tool.name}
              </h3>
              <p className="text-sm text-gray-400">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}