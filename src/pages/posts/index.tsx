import { useEffect } from "react";
import { GetStaticProps, NextPage } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { getAllPosts } from "@/lib/api/posts";
import postStore from "@/store/postStore";
import labelStore from "@/store/labelStore";
import filterStore from "@/store/filterStore";
import sortStore from "@/store/sortStore";
import FilterList from "@/components/filterList";
import PostItem from "@/components/postItem";
import SortIcon from "@/components/sortIcon";
import { Post } from "@/types";
import { addColorToLabelItem } from "@/utils";
import { filterPosts, sortPosts } from "@/lib/postsUtil";

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

  const { columnName, direction, setSort } = sortStore();

  const result = addColorToLabelItem(
    postList,
    categoryWithColors,
    prefectureWithColors,
    cityWithColors,
    starSiteWithColors
  );

  useEffect(() => {
    setPosts(result.postList);
    setCategoryWithColors(result.categoryWithColors);
    setPrefectureWithColors(result.prefectureWithColors);
    setCityWithColors(result.cityWithColors);
    setStarSiteWithColors(result.starSiteWithColors);
    postStore.persist.rehydrate();
    filterStore.persist.rehydrate();
    labelStore.persist.rehydrate();
    sortStore.persist.rehydrate();
  }, []);

  const changeSort = (selectedColumn: string) => {
    const changedDirection =
      selectedColumn === columnName && direction === "desc" ? "asc" : "desc";

    setSort(selectedColumn, changedDirection);
  };

  const filteredPosts = filterPosts(
    result.postList,
    categoryFilters,
    prefectureFilters,
    cityFilters,
    starSiteFilters
  );
  const sortedPosts = sortPosts(filteredPosts, columnName, direction);

  return (
    <div className="flex flex-col items-center">
      <FilterList />
      {sortedPosts.length > 0 && (
        <div className={`flex flex-col items-center mx-20 ${noto.className}`}>
          <div className="container grid grid-cols-12 space-x-2 border-b-2 border-slate-400 text-slate-700 font-bold px-4 pb-2 mt-10">
            <div
              className="hover:cursor-pointer"
              onClick={() => changeSort("id")}
            >
              ID <SortIcon selectedColumn={"id"} />
            </div>
            <div
              className="col-span-2 hover:cursor-pointer"
              onClick={() => changeSort("store_name")}
            >
              店名 <SortIcon selectedColumn={"store_name"} />
            </div>
            <div
              className="relative hover:cursor-pointer"
              onClick={() => changeSort("category")}
            >
              カテゴリ
              <div className="absolute -right-1 top-0">
                <SortIcon selectedColumn={"category"} />
              </div>
            </div>
            <div
              className="px-2 hover:cursor-pointer"
              onClick={() => changeSort("prefecture")}
            >
              県
              <SortIcon selectedColumn={"prefecture"} />
            </div>
            <div
              className="px-2 hover:cursor-pointer"
              onClick={() => changeSort("city")}
            >
              地域 <SortIcon selectedColumn={"city"} />
            </div>
            <div
              className="col-span-2 hover:cursor-pointer"
              onClick={() => changeSort("star_site")}
            >
              サイト名 <SortIcon selectedColumn={"star_site"} />
            </div>
            <div
              className="hover:cursor-pointer"
              onClick={() => changeSort("star")}
            >
              評価 <SortIcon selectedColumn={"star"} />
            </div>
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
