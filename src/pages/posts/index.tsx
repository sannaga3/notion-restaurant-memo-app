import { useEffect } from "react";
import { GetStaticProps, NextPage } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { getAllPosts } from "@/lib/api/posts";
import postStore from "@/store/postStore";
import labelStore from "@/store/labelStore";
import filterStore from "@/store/filterStore";
import FilterList from "@/components/filterList";
import PostItem from "@/components/postItem";
import { Label, Post } from "@/types";
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
  const { setPosts } = postStore();
  const {
    categoryWithColors,
    prefectureWithColors,
    cityWithColors,
    starSiteWithColors,
    setCategoryWithColors,
    setPrefectureWithColors,
    setCityWithColors,
    setStarSiteWithColors,
  } = labelStore();

  const { categoryFilters, prefectureFilters, cityFilters, starSiteFilters } =
    filterStore();

  useEffect(() => {
    const result = addColorToLabelItem(
      postList,
      categoryWithColors,
      prefectureWithColors,
      cityWithColors,
      starSiteWithColors
    );
    setPosts(result.postList);
    setCategoryWithColors(result.categoryWithColors);
    setPrefectureWithColors(result.prefectureWithColors);
    setCityWithColors(result.cityWithColors);
    setStarSiteWithColors(result.starSiteWithColors);
    postStore.persist.rehydrate();
    filterStore.persist.rehydrate();
    labelStore.persist.rehydrate();
  }, []);

  const filterPosts = (posts: Post[]): Post[] => {
    let filtered: Post[] = [];
    const categoryNames = Array.from(
      new Set(categoryFilters.flatMap((category: Label) => category.name))
    );
    const prefectureNames = Array.from(
      new Set(prefectureFilters.flatMap((prefecture: Label) => prefecture.name))
    );
    const cityNames = Array.from(
      new Set(cityFilters.flatMap((city: Label) => city.name))
    );
    const starSiteNames = Array.from(
      new Set(starSiteFilters.flatMap((starSite: Label) => starSite.name))
    );
    const isCategory = categoryNames.length > 0;
    const isPrefecture = prefectureNames.length > 0;
    const isCity = cityNames.length > 0;
    const isStarSite = starSiteNames.length > 0;

    posts.forEach((post) => {
      if (isCategory && categoryNames.indexOf(post.category.name) < 0) return;

      if (isPrefecture && prefectureNames.indexOf(post.prefecture.name) < 0)
        return;
      if (isCity && cityNames.indexOf(post.city.name) < 0) return;
      if (isStarSite && starSiteNames.indexOf(post.star_site.name) < 0) return;

      return filtered.push(post);
    });

    return isCategory || isPrefecture || isCity || isStarSite
      ? filtered
      : posts;
  };

  const filteredPosts = filterPosts(postList);

  return (
    <div className="flex flex-col items-center">
      <FilterList />
      {filteredPosts.length > 0 && (
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
            {filteredPosts.map((post: Post) => (
              <div key={post.id}>
                <PostItem post={post} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
