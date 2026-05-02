"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import Link from "next/link";

type Tool = {
  name: string;
  description: string;
  url: string;
  tags?: string[];
};

export default function ToolPage() {
  const params = useParams();
  const id = params?.id as string;

  const [tool, setTool] = useState<Tool | null>(null);

  useEffect(() => {
    const getTool = async () => {
      const docRef = doc(db, "tools", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTool(docSnap.data() as Tool);
      }
    };

    if (id) getTool();
  }, [id]);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6 py-16 flex justify-center">
      
      <div className="max-w-3xl w-full">

        {/* BACK BUTTON */}
        <Link href="/" className="text-gray-400 hover:text-white mb-6 inline-block">
          ← Geri dön
        </Link>

        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-3">
          {tool.name}
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-400 mb-6">
          {tool.description}
        </p>

        {/* TAGS */}
        <div className="flex gap-2 flex-wrap mb-8">
          {tool.tags?.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm bg-purple-500/20 text-purple-300 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* FEATURE BOX */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3">
            Özellikler
          </h2>

          <ul className="text-gray-300 space-y-2">
            <li>• Yapay zeka destekli güçlü sonuçlar</li>
            <li>• Kullanımı kolay ve hızlı arayüz</li>
            <li>• Farklı kullanım senaryoları için uygun</li>
          </ul>
        </div>

        {/* CTA BUTTON */}
        <a
          href={tool.url}
          target="_blank"
          className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition text-white"
        >
          Aracı Kullan →
        </a>

      </div>
    </div>
  );
}