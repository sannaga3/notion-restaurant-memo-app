import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { getAllPosts, getSinglePost } from "@/lib/api/posts";
import { Post } from "@/types";
import labelStore from "@/store/labelStore";
import { addColorToLabelItem } from "@/utils";

type Props = {
  singlePost: Post;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postList = await getAllPosts();

  const postIds = postList.map((post: Post) => {
    return {
      params: { id: `${post.id}` },
    };
  });

  return {
    paths: postIds,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postId = params?.id?.toString()!;
  const singlePost = await getSinglePost(parseInt(postId));

  return {
    props: {
      singlePost,
      revalidate: 60,
    },
  };
};

const PostDetail: NextPage<Props> = ({ singlePost }) => {
  const rowStyle =
    "col-start-3 col-span-8 grid grid-cols-12 space-x-2 border-b-2 border-slate-400 text-slate-700 text-sm px-4 pt-4 pb-2";
  const labelStyle =
    "flex justify-center items-center rounded-lg text-white text-xs font-light py-1";

  const {
    categoryWithColors,
    prefectureWithColors,
    cityWithColors,
    starSiteWithColors,
  } = labelStore();

  const result = addColorToLabelItem(
    [singlePost],
    categoryWithColors,
    prefectureWithColors,
    cityWithColors,
    starSiteWithColors
  );
  const post = result.postList[0];

  return (
    <>
      {result?.postList?.length > 0 && (
        <div className="grid grid-cols-12 items-center mt-5">
          <div className={`${rowStyle}`}>
            <div className="col-span-4">ID</div>
            <div className="col-span-8">{post.id}</div>
          </div>
          <div className={`${rowStyle}`}>
            <div className="col-span-4">店名</div>
            <div className="col-span-8">{post.store_name}</div>
          </div>
          <div className={`${rowStyle}`}>
            <div className="col-span-4">URL</div>
            <div className="col-span-8 overflow-x-scroll">{post.url}</div>
          </div>
          <div className={`${rowStyle}`}>
            <div className="col-span-1 mt-0.5">サイト名</div>
            <div className={"col-span-2 mb-1"}>
              <div
                style={{ backgroundColor: post.star_site.color }}
                className={`${labelStyle}`}
              >
                {post.star_site.name}
              </div>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-1 mt-0.5">評価</div>
            <div className="col-span-1 mt-0.5">{post.star}</div>
          </div>
          <div className={`${rowStyle}`}>
            <div className="col-span-1 mt-0.5">カテゴリ</div>
            <div className={"col-span-2 mb-1"}>
              <div
                className={`${labelStyle}`}
                style={{ backgroundColor: post.category.color }}
              >
                {post.category.name}
              </div>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-1 mt-0.5">県</div>
            <div className={"col-span-2 mb-1"}>
              <div
                className={`${labelStyle}`}
                style={{ backgroundColor: post.prefecture.color }}
              >
                {post.prefecture.name}
              </div>
            </div>
            <div className="col-span-1 mt-0.5"></div>
            <div className="col-span-1">地域</div>
            <div className={"col-span-2 mb-1"}>
              <div
                className={`${labelStyle}`}
                style={{ backgroundColor: post.city.color }}
              >
                {post.city.name}
              </div>
            </div>
          </div>
          <div className={`${rowStyle}`}>
            <div className="col-span-4">行ったことがある</div>
            <div className="col-span-8">{post.done ? <>✅</> : <>□</>}</div>
          </div>
          <div className={`${rowStyle}`}>
            <div className="col-span-4">作成日</div>
            <div className="col-span-8">{post.created_at}</div>
          </div>
          <div className={`${rowStyle}`}>
            <div className="col-span-4">備考</div>
            <div className="col-span-8 h-[300px] break-words px-2">
              {post.description}
            </div>
          </div>
          <div className="mt-3 col-start-3 col-span-8 flex justify-center">
            <div className="w-20 h-8 flex justify-center items-center bg-indigo-500 rounded-lg text-white">
              <Link href={"/posts"} className="block pt-0.5">
                ⬅︎ 戻る
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetail;
