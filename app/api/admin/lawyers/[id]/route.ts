import { NextRequest, NextResponse } from "next/server";
import { getLawyerBySlug, updateLawyer, deleteLawyer } from "@/lib/lawyers-db";
import { isAuthorizedRequest } from "@/lib/admin-auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const lawyer = await getLawyerBySlug(params.id);
    if (!lawyer) {
      return NextResponse.json(
        { error: "Abogado no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(lawyer);
  } catch {
    return NextResponse.json(
      { error: "Error al leer los datos" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const lawyer = await updateLawyer(params.id, data);
    return NextResponse.json(lawyer);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al actualizar";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    await deleteLawyer(params.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al eliminar";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
