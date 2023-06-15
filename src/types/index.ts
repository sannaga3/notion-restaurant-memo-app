export type Post = {
  id: number;
  store_name: string;
  category: Label;
  prefecture: Label;
  city: Label;
  star_site: Label;
  star: number;
  url: string;
  description: string;
  done: boolean;
  created_at: string;
};

export type Label = {
  name: string;
  color: string;
};
