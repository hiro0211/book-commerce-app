import { nextAuthOptions } from "@/app/lib/next-auth/options";
import NextAuth from "next-auth/next";

// 環境変数から NEXTAUTH_SECRET を設定（存在しない場合エラーをスロー）
if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("Missing NEXTAUTH_SECRET environment variable. Please set it in your environment.");
}
console.log("GITHUBの詳細は:", process.env.GITHUB_ID);
console.log("GITHUB_SECRETの詳細は", process.env.GITHUB_SECRET);

// NextAuth ハンドラーを生成
const handler = NextAuth({
  ...nextAuthOptions,
  secret: process.env.NEXTAUTH_SECRET, // secret を追加
});

export { handler as GET, handler as POST };
