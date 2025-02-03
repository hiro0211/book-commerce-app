import { BookType } from "@/app/types/types";
import { createClient } from "microcms-js-sdk";

export const client = createClient({
  // !は || ""と同じ意味で、型定義を無視している
  serviceDomain: process.env.NEXT_PUBLIC_SERVER_DOMAIN!,
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
});

export const getAllbooks = async () => {
  const allBooks = await client.getList<BookType>({
    endpoint: "bookcommerce",
    customRequestInit: {
      // ISRの再生成を60秒後に設定
      next: {
        revalidate: 60, 
      }
    },
  });

  return allBooks;
};

export const getDetailBook = async (contentId: string) => {
  const detailBook = await client.getListDetail<BookType>({
    endpoint: "bookcommerce",
    contentId,
    customRequestInit: {
      cache: "no-store",
    },
  });

  return detailBook;
};
