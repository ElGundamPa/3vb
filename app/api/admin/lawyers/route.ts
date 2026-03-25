import { NextRequest, NextResponse } from "next/server";
import { getLawyers, addLawyer } from "@/lib/lawyers-db";
import { isAuthorizedRequest } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const lawyers = await getLawyers();
    return NextResponse.json(lawyers);
  } catch {
    return NextResponse.json(
      { error: "Error al leer los datos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const lawyer = await addLawyer(data);
    return NextResponse.json(lawyer, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al crear";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
