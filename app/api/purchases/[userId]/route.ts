import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// 購入履歴検索API
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  console.log("userIdは" + params.userId);
  const userId = params.userId;

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
    return NextResponse.json(purchases);
  } catch (err) {
    return NextResponse.json(err);
  }
}
