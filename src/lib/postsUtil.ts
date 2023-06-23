import { Post, Label } from "@/types";

export const filterPosts = (
  posts: Post[],
  categoryFilters: Label[],
  prefectureFilters: Label[],
  cityFilters: Label[],
  starSiteFilters: Label[]
): Post[] => {
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

  const filteredPosts =
    isCategory || isPrefecture || isCity || isStarSite ? filtered : posts;

  return filtered.length > 0 ? filteredPosts : [];
};

export const sortPosts = (
  posts: Post[],
  columnName: string,
  direction: string
): Post[] => {
  posts.sort((a: Post, b: Post): number => {
    if (["id", "store_name", "star"].includes(columnName)) {
      if (direction === "desc") {
        if (a[columnName] > b[columnName]) {
          return -1;
        } else if (a[columnName] < b[columnName]) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (a[columnName] < b[columnName]) {
          return -1;
        } else if (a[columnName] > b[columnName]) {
          return 1;
        } else {
          return 0;
        }
      }
    } else {
      const labelA = a[columnName] as Label;
      const labelB = b[columnName] as Label;

      if (direction === "desc") {
        if (labelA.name > labelB.name) {
          return -1;
        } else if (labelA.name < labelB.name) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (labelA.name < labelB.name) {
          return -1;
        } else if (labelA.name > labelB.name) {
          return 1;
        } else {
          return 0;
        }
      }
    }
  });

  return posts;
};
