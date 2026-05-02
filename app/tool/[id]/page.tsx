"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import Link from "next/link";

type Tool = {
  name: string;
  description: string;
  longDescription?: string;
  link: string; // 🔥 BURASI DEĞİŞTİ
  tags?: string[];
  category?: string;
  pricing?: string;
  usage?: string;
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

        {/* BACK */}
        <Link href="/" className="text-gray-400 hover:text-white mb-6 inline-block">
          ← Geri dön
        </Link>

        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-3">
          {tool.name}
        </h1>

        {/* CATEGORY + PRICE */}
        <div className="flex gap-3 mb-4">
          {tool.category && (
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
              {tool.category}
            </span>
          )}

          {tool.pricing && (
            <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
              {tool.pricing}
            </span>
          )}
        </div>

        {/* SHORT DESC */}
        <p className="text-gray-400 mb-6">
          {tool.description}
        </p>

        {/* 🔥 LONG DESC */}
        {tool.longDescription && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Detaylı Açıklama</h2>
            <p className="text-gray-300 leading-relaxed">
              {tool.longDescription}
            </p>
          </div>
        )}

        {/* USAGE */}
        {tool.usage && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Kullanım Alanları</h2>
            <p className="text-gray-300">
              {tool.usage}
            </p>
          </div>
        )}

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

        {/* 🔥 LINK FIX */}
        {tool.link ? (
          <a
            href={tool.link.startsWith("http") ? tool.link : `https://${tool.link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
          >
            Siteye Git →
          </a>
        ) : (
          <p className="text-red-400">Link bulunamadı</p>
        )}

      </div>
    </div>
  );
}