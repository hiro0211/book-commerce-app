import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// 購入履歴の保存
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: NextRequest) {
  const { sessionId } = await request.json();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-01-27.acacia",
  });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId: session.client_reference_id!,
        bookId: session.metadata?.bookId!,
      },
    });

    if (!existingPurchase) {
      const purchase = await prisma.purchase.create({
        data: {
          userId: session.client_reference_id!,
          bookId: session.metadata?.bookId!,
        },
      });
      return NextResponse.json({ purchase });
    } else {
      return NextResponse.json({ message: "既に購入済みです。" });
    }
  } catch (err) {
    return NextResponse.json(err);
  }
}
