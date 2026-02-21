import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { path } = await request.json();
    revalidatePath(path || "/");
    return NextResponse.json({ revalidated: true, path: path || "/" });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
