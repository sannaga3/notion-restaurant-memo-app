import { Client } from "@notionhq/client";
import { Post } from "@/types";

const notion = new Client({
  auth: process.env.NOTION_TOKEN ?? "",
});

export const getAllPosts = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID ?? "",
  });
  const allPosts = posts.results;

  const metaData = allPosts.map((post) => {
    return getPageMetadata(post);
  });

  return metaData;
};

const getPageMetadata = (post: any): Post => {
  const date = new Date(post.properties.created_at.created_time);

  return {
    id: post.properties.id.number,
    store_name: post.properties.store_name.title[0].plain_text,
    category: {
      name: post.properties.category.multi_select[0].name,
      color: "#6495ed",
    },
    prefecture: {
      name: post.properties.prefecture.select.name,
      color: "#6495ed",
    },
    city: {
      name: post.properties.city.select.name,
      color: "#6495ed",
    },
    star_site: {
      name: post.properties.star_site.select.name,
      color: "#6495ed",
    },
    star: post.properties.star.number,
    url: post.properties.url.url,
    description: post.properties.description?.rich_text[0]?.plain_text || "",
    done: post.properties.done.checkbox,
    created_at: date.toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
  };
};

export const getSinglePost = async (id: number) => {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID ?? "",
    filter: {
      property: "id",
      formula: {
        number: {
          equals: id,
        },
      },
    },
  });
  const allPosts = posts.results;

  const metaData = allPosts.map((post) => {
    return getPageMetadata(post);
  });

  return metaData[0];
};
