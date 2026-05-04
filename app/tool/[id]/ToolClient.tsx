"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";

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
  const [tools, setTools] = useState<any[]>([]);

  useEffect(() => {
  const getData = async () => {

    // 🔥 1. SEÇİLİ TOOL
    const docRef = doc(db, "tools", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTool(docSnap.data() as Tool);
    }

    // 🔥 2. TÜM TOOL'LAR (BUNU EKLEDİK)
    const querySnapshot = await getDocs(collection(db, "tools"));
    const allTools = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setTools(allTools);
  };

  if (id) getData();
}, [id]);


  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Yükleniyor...
      </div>
    );
  }
  
  const relatedTools = tools
  .filter((t) => t.id !== id)
  .filter((t) => {
    const sameCategory = t.category === tool?.category;

    const sharedTags =
      t.tags?.some((tag: string) => tool?.tags?.includes(tag));

    return sameCategory || sharedTags;
  })
  .slice(0, 4);

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
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
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

        {relatedTools.length > 0 && (
  <div className="mt-12">

    <h2 className="text-xl font-semibold mb-4 text-white">
      Benzer Araçlar
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {relatedTools.map((t) => (
        <a
          key={t.id}
          href={`/tool/${t.id}`}
          className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
        >
          <h3 className="font-semibold text-white mb-1">
            {t.name}
          </h3>

          <p className="text-sm text-gray-400">
            {t.description}
          </p>
        </a>
      ))}

    </div>
  </div>
)}

      </div>
    </div>
  );
}