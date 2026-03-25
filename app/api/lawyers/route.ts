import { NextResponse } from "next/server";
import { getLawyers } from "@/lib/lawyers-db";

export async function GET() {
  try {
    const lawyers = await getLawyers();
    const simplified = lawyers.map((l) => ({
      id: l.id,
      name: l.name,
      title: l.title,
      specialty: l.specialty,
    }));
    return NextResponse.json(simplified);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
