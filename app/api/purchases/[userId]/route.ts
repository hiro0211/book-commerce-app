import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// 購入履歴検索API
export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const userId = (await params).userId;

  try {
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    const purchases = await prisma.purchase.findMany({
      where: {
        userId: userId,
      },
    });

    if (purchases.length === 0) {
      return NextResponse.json(
        { message: "No purchases found" },
        { status: 404 }
      );
    }
    return NextResponse.json(purchases);
  } catch (err) {
    return NextResponse.json(err);
  }
}
