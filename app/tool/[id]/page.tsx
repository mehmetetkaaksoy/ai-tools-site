import ToolClient from "./ToolClient";

export const metadata = {
  title: "AI Tools - En iyi yapay zeka araçları",
  description:
    "Yazı, video, görsel ve kod için en iyi yapay zeka araçlarını keşfet. Ücretsiz ve premium AI tool'ları tek yerde.",
};

export default function Page({ params }: any) {
  return <ToolClient />;
}