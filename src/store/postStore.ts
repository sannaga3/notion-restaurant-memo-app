import { Post } from "./../types/index";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type PostState = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  resetPosts: () => void;
  getPostIds: () => number[];
  getPost: (id: number) => Post;
};

const postStore = create<PostState>()(
  persist(
    (set, get) => ({
      posts: [],
      setPosts: (posts: Post[]) =>
        set((state) => ({
          ...state,
          posts: posts,
        })),
      resetPosts: () => set({ posts: [] }),
      getPostIds: () => {
        const posts = get().posts;
        const ids = posts.map((post: Post) => post.id);
        return ids;
      },
      getPost: (id: number) => {
        const posts = get().posts;
        const selected = posts.find((post: Post) => post.id === id)!;
        return selected;
      },
    }),
    {
      name: "store-storage",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )
);

export default postStore;
