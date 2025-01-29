type BookType = {
  id: number;
  title: string;
  content: string;
  price: number;
  thumbnail: {
    url: string;
  };
  created_at: string;
  updated_at: string;
};

export type { BookType };