import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { isAuthorizedRequest } from "@/lib/admin-auth";
import { updateLawyer } from "@/lib/lawyers-db";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPE = "application/pdf";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const lawyerId = params.id;
  if (!lawyerId || lawyerId === "new") {
    return NextResponse.json({ error: "ID de abogado inválido" }, { status: 400 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No se envió ningún archivo" },
        { status: 400 }
      );
    }

    if (file.type !== ALLOWED_TYPE && !file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Solo se permiten archivos PDF" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "El archivo no puede superar 10 MB" },
        { status: 400 }
      );
    }

    const pdfDir = path.join(process.cwd(), "public", "assets", "Pdf");
    await mkdir(pdfDir, { recursive: true });

    const safeFilename = `${lawyerId.replace(/[^a-z0-9-]/gi, "-")}.pdf`;
    const filePath = path.join(pdfDir, safeFilename);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    const pdfUrl = `/assets/Pdf/${safeFilename}`;

    await updateLawyer(lawyerId, { pdfUrl });

    return NextResponse.json({ pdfUrl });
  } catch (err) {
    console.error("Upload CV error:", err);
    return NextResponse.json(
      { error: "Error al guardar el archivo" },
      { status: 500 }
    );
  }
}
