import ToolClient from "./ToolClient";

export async function generateMetadata({ params }: any) {
  const res = await fetch(
    `https://ai-tools-site-red-two.vercel.app/api/tool/${params.id}`,
    { cache: "no-store" }
  );

  const tool = await res.json();

  if (!tool || tool.error) {
    return {
      title: "Tool bulunamadı | AI Tools",
      description: "Aradığınız yapay zeka aracı bulunamadı.",
    };
  }

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