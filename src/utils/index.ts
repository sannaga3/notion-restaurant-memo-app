import { Label, Post } from "@/types";

export const choseColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export const generateColor = () => {
  const r = ("0" + Math.floor(Math.random() * 255).toString(16)).slice(-2);
  const g = ("0" + Math.floor(Math.random() * 255).toString(16)).slice(-2);
  const b = ("0" + Math.floor(Math.random() * 255).toString(16)).slice(-2);
  return `#${r}${g}${b}`;
};

export const colors = [
  "#c68eff",
  "#E25B45",
  "#EABEBF",
  "#75CCE8",
  "#A5DEE5",
  "#80BEAF",
  "#6F89A2",
  "#F5B994",
  "#EDB5D2",
  "#BBD5A6",
  "#879E46",
  "#F9CC88",
  "#6AC7E6",
  "#FF5685",
  "#FFC4C8",
  "#E57B87",
  "#FED154",
  "#FF8357",
];

const getColor = (labelWithColors: Label[]) => {
  return labelWithColors.length !== colors.length
    ? choseColor()
    : generateColor();
};

export function addColorToLabelItem(
  posts: Post[],
  categoryWithColors: Label[] = [],
  prefectureWithColors: Label[] = [],
  cityWithColors: Label[] = [],
  starSiteWithColors: Label[] = []
) {
  const postsWithLabelColor = posts.map((post: Post) => {
    const category = categoryWithColors.find(
      (category) => category.name === post.category.name
    );
    if (category) post.category.color = category!.color;
    else {
      while (true) {
        const color = getColor(categoryWithColors);
        const isIncluded = categoryWithColors.find(
          (category) => category.color === color
        );
        if (!isIncluded) {
          post.category.color = color;
          categoryWithColors.push(post.category);
          break;
        }
      }
    }

    const prefecture = prefectureWithColors.find(
      (prefecture) => prefecture.name === post.prefecture.name
    );
    if (prefecture) post.prefecture.color = prefecture!.color;
    else {
      while (true) {
        const color = getColor(prefectureWithColors);
        const isIncluded = prefectureWithColors.find(
          (prefecture) => prefecture.color === color
        );
        if (!isIncluded) {
          post.prefecture.color = color;
          prefectureWithColors.push(post.prefecture);
          break;
        }
      }
    }

    const city = cityWithColors.find((city) => city.name === post.city.name);
    if (city) post.city.color = city!.color;
    else {
      while (true) {
        const color = getColor(cityWithColors);
        const isIncluded = cityWithColors.find((city) => city.color === color);
        if (!isIncluded) {
          post.city.color = color;
          cityWithColors.push(post.city);
          break;
        }
      }
    }
    const starSite = starSiteWithColors.find(
      (starSite) => starSite.name === post.star_site.name
    );
    if (starSite) post.star_site.color = starSite!.color;
    else {
      while (true) {
        const color = getColor(starSiteWithColors);
        const isIncluded = starSiteWithColors.find(
          (star_site) => star_site.color === color
        );
        if (!isIncluded) {
          post.star_site.color = color;
          starSiteWithColors.push(post.star_site);
          break;
        }
      }
    }

    return post;
  });

  return {
    postList: postsWithLabelColor,
    categoryWithColors: categoryWithColors,
    prefectureWithColors: prefectureWithColors,
    cityWithColors: cityWithColors,
    starSiteWithColors: starSiteWithColors,
  };
}
