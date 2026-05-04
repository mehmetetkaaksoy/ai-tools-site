import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const docRef = doc(db, "tools", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return Response.json({ error: "not found" }, { status: 404 });
  }

  return Response.json(docSnap.data());
}