import ToolClient from "./ToolClient";

export async function generateMetadata({ params }: any) {
  return {
    title: `AI Tool Detayı`,
    description: "Bu AI aracı hakkında detaylı bilgi, kullanım alanları ve özellikler.",
  };
}

export default function Page({ params }: any) {
  return <ToolClient />;
}