import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// 購入履歴検索API
export async function GET(
  request: NextRequest,
  context: { params: { userId: string } }
) {
  const { params } = context; // `params` を context 経由で取得
  const userId = params?.userId; // `?.` で安全にアクセス

  console.log("userIdは" + userId);

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
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
