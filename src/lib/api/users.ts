import { Client } from "@notionhq/client";
import { User } from "@/types";

const notion = new Client({
  auth: process.env.NOTION_TOKEN ?? "",
});

export const signupUser = async (user_name: string, email: string) => {
  const user = await notion.pages.create({
    parent: {
      type: "database_id",
      database_id: process.env.NOTION_DATABASE_USER_ID ?? "",
    },
    properties: {
      user_name: {
        title: [
          {
            text: {
              content: user_name,
            },
          },
        ],
      },
      email: {
        type: "email",
        email: email,
      },
      allow: {
        checkbox: false,
      },
    },
  });

  return getUserMetadata(user);
};

export const loginUser = async (user_name: string, email: string) => {
  const users = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_USER_ID ?? "",
    filter: {
      and: [
        {
          property: "user_name",
          rich_text: {
            equals: user_name,
          },
        },
        {
          property: "email",
          email: {
            equals: email,
          },
        },
      ],
    },
  });

  let result = users.results[0];
  if (!result) return null;

  return getUserMetadata(result);
};

export const getUser = async (email: string) => {
  const users = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_USER_ID ?? "",
    filter: {
      and: [
        {
          property: "email",
          email: {
            equals: email,
          },
        },
      ],
    },
  });

  const user = users.results[0];
  return user || null;
};

const getUserMetadata = (user: any): User => {
  return {
    user_name: user.properties.user_name.title[0].plain_text,
    email: user.properties.email.email,
    allow: user.properties.allow.checkbox,
  };
};
