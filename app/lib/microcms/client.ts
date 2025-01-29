import { createClient } from "microcms-js-sdk";

export const client = createClient({
  // !は || ""と同じ意味で、型定義を無視している
  serviceDomain: process.env.NEXT_PUBLIC_SERVER_DOMAIN!,
  apiKey: process.env.NEXT_PUBLIC_API_KEY! ,
});

export const getAllbooks = async () => {
  const allBooks = await client.getList({
    endpoint: "bookcommerce",
  });

  return allBooks;
}