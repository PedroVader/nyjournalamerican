import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    // In production, integrate with email service (SendGrid, Resend, etc.)
    // For now, log the contact submission
    console.log("Contact form submission:", {
      name,
      email,
      subject: data.subject,
      company: data.company,
      selectedPackage: data.selectedPackage,
      type: data.type,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ message: "Message received" });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
