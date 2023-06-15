import { Post } from "@/types";
import { FC } from "react";
import Link from "next/link";

type Props = {
  post: Post;
};

const PostItem: FC<Props> = ({ post }) => {
  const labelAreaStyle = "flex justify-start items-center px-2";
  const labelStyle =
    "rounded-lg text-center text-white text-xs font-light px-2 py-1";

  return (
    <div className="grid grid-cols-12 items-center space-x-2 border-b-2 border-slate-400 text-slate-700 text-sm px-4 pt-4 pb-2">
      <div>{post.id}</div>
      <div className="col-span-2">{post.store_name}</div>
      <div className={`${labelAreaStyle}`}>
        <div
          style={{ backgroundColor: post.category.color }}
          className={`${labelStyle}`}
        >
          {post.category.name}
        </div>
      </div>
      <div className={`${labelAreaStyle}`}>
        <div
          style={{ backgroundColor: post.prefecture.color }}
          className={`${labelStyle}`}
        >
          {post.prefecture.name}
        </div>
      </div>
      <div className={`${labelAreaStyle}`}>
        <div
          style={{ backgroundColor: post.city.color }}
          className={`${labelStyle}`}
        >
          {post.city.name}
        </div>
      </div>
      <div className={`${labelAreaStyle} col-span-2`}>
        <div
          style={{ backgroundColor: post.star_site.color }}
          className={`${labelStyle}`}
        >
          {post.star_site.name}
        </div>
      </div>
      <div>{post.star}</div>
      <div className="col-span-2 overflow-x-scroll">{post.url}</div>
      <div className="text-center text-2xl">
        <Link href={`posts/${post.id}`}>📄</Link>
      </div>
    </div>
  );
};

export default PostItem;
