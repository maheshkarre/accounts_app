
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log("📥 Received POST request to /api/make-payment");

  try {
    const body = await req.json();
    console.log("📝 Parsed request body:", body);

    const { hallTicket, amount, paymentType, branch, section, remarks } = body;

    // Validation
    if (!hallTicket || !amount || !paymentType || !branch || !section) {
      console.warn("⚠️ Validation failed: missing required fields");
      return NextResponse.json(
        { error: "All required fields must be filled." },
        { status: 400 }
      );
    }

    // Simulate saving to database (replace with actual DB logic)
    console.log("💾 Saving payment data...", {
      hallTicket,
      amount,
      paymentType,
      branch,
      section,
      remarks
    });

    // Simulated success response
    return NextResponse.json(
      { success: true, message: "Payment submitted successfully." },
      { status: 200 }
    );

  } catch (err) {
    console.error("❌ Payment API error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

