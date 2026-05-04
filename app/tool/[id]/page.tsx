import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import ToolClient from "./ToolClient";

export async function generateMetadata({ params }: any) {
  const docRef = doc(db, "tools", params.id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return {
      title: "Tool bulunamadı | AI Tools",
      description: "Aradığınız yapay zeka aracı bulunamadı.",
    };
  }

  const tool = docSnap.data();

  return {
    title: `${tool.name} – ${tool.category || "AI Tool"} | AI Tools`,
    description: tool.description,

    openGraph: {
      title: tool.name,
      description: tool.description,
      url: `https://ai-tools-site-red-two.vercel.app/tool/${params.id}`,
      siteName: "AI Tools",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: tool.name,
      description: tool.description,
    },
  };
}

export default function Page({ params }: any) {
  return <ToolClient />;
}