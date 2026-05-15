import { Metadata } from "next";

export const metadata: Metadata = {
  title: "En Sevdiğim Yapay Zeka Araçları | AIXplorerHub",
  description:
    "Yazma, kodlama, görseller, videolar ve daha fazlası için favori AI araçlarınızı kaydedin ve yönetin.",
};

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}