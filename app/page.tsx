import Book from "./components/Book";
import { getAllbooks } from "./lib/microcms/client";
import { nextAuthOptions } from "./lib/next-auth/options";
import { BookType, Purchase, User } from "./types/types";
import { getServerSession } from "next-auth";

export default async function Home() {
  const { contents = [] } = await getAllbooks(); // null/undefined を防ぐ
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;

  let purchaseBookIds: string[] = [];

  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`
    );
    const purchasesData = (await response.json()) || []; // null/undefined の防止

    console.log("purchaseDataは", purchasesData);

    purchaseBookIds = Array.isArray(purchasesData)
      ? purchasesData.map((purchase: Purchase) => purchase.bookId)
      : []; // 安全に .map() を使う
  }

  return (
    <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
      <h2 className="text-center w-full font-bold text-3xl mb-2">
        Book Commerce
      </h2>
      {contents.length > 0 ? (
        contents.map((book: BookType) => (
          <Book
            key={book.id}
            book={book}
            isPurchased={purchaseBookIds.includes(book.id)}
          />
        ))
      ) : (
        <p className="text-center w-full text-gray-500">記事が見つかりません</p>
      )}
    </main>
  );
}
