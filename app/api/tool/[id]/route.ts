import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const docRef = doc(db, "tools", params.id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return Response.json({ error: "not found" }, { status: 404 });
  }

  return Response.json(docSnap.data());
}