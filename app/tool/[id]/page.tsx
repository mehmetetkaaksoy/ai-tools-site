"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";

type Tool = {
  name: string;
  description: string;
  link: string;
  category: string;
};

export default function ToolPage() {
  const params = useParams();
  const id = params?.id as string;

  const [tool, setTool] = useState<Tool | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTool = async () => {
      const docRef = doc(db, "tools", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTool(docSnap.data() as Tool);
      }
    };

    fetchTool();
  }, [id]);

  if (!tool) {
    return <div className="text-white p-10">Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-4">
        {tool.name}
      </h1>

      <p className="text-gray-400 mb-6">
        {tool.description}
      </p>

      <a
        href={tool.link}
        target="_blank"
        className="bg-blue-500 px-4 py-2 rounded-lg"
      >
        Siteye Git
      </a>
    </div>
  );
}