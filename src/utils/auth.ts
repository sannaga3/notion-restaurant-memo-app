import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

export const checkAuth = (ctx: GetServerSidePropsContext): boolean => {
  const cookie = parseCookies(ctx)?.restaurantMemoAppSession;

  if (cookie) return true;
  return false;
};
