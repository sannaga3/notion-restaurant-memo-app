import { useEffect } from "react";
import { GetStaticProps, NextPage } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { getAllPosts } from "@/lib/api/posts";
import { Post } from "@/types";
import PostItem from "@/components/postItem";
import postStore from "@/store/postStore";
import labelStore from "@/store/labelStore";
import { addColorToLabelItem } from "@/utils";

const noto = Noto_Sans_JP({ subsets: ["latin"] });

type Props = {
  postList: Post[];
};

export const getStaticProps: GetStaticProps = async () => {
  const postList = await getAllPosts();

  return {
    props: {
      postList,
      revalidate: 60,
    },
  };
};

const Home: NextPage<Props> = ({ postList }) => {
  const { setPosts, posts } = postStore();
  const {
    setCategoryWithColors,
    setPrefectureWithColors,
    setCityWithColors,
    setStarSiteWithColors,
    categoryWithColors,
  } = labelStore();

  useEffect(() => {
    if (categoryWithColors.length === 0) {
      const result = addColorToLabelItem(postList);
      setPosts(result.postList);
      setCategoryWithColors(result.categoryWithColors);
      setPrefectureWithColors(result.prefectureWithColors);
      setCityWithColors(result.cityWithColors);
      setStarSiteWithColors(result.starSiteWithColors);
      postStore.persist.rehydrate();
    }
  }, []);

  return (
    <>
      {posts.length > 0 && (
        <div className={`flex flex-col items-center mx-20 ${noto.className}`}>
          <div className="container grid grid-cols-12 space-x-2 border-b-2 border-slate-400 text-slate-700 font-bold px-4 pb-2 mt-10">
            <div>ID</div>
            <div className="col-span-2">店名</div>
            <div className="px-2">カテゴリ</div>
            <div className="px-2">県</div>
            <div className="px-2">地域</div>
            <div className="col-span-2">サイト名</div>
            <div>評価</div>
            <div className="col-span-2">URL</div>
            <div className="text-center">詳細</div>
          </div>
          <div className="container mb-10">
            {posts.map((post: Post) => (
              <div key={post.id}>
                <PostItem post={post} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
