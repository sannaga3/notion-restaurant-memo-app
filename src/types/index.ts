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
  [key: string]: number | string | boolean | Label;
};

export type Label = {
  name: string;
  color: string;
};

export type User = {
  user_name: string;
  email: string;
  allow: boolean;
};

export type Inputs = {
  userName?: string;
  email: string;
  password: string;
};
