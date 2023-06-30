import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/atoms/input";
import Button from "@/components/atoms/button";
import FormError from "@/components/atoms/formError";
import { loginUser } from "@/lib/api/users";
import { setCookie, destroyCookie } from "nookies";

import { User } from "@/types";
import userStore from "@/store/userStore";
import { useEffect } from "react";
import FlashMessage from "@/components/atoms/fleshMessages";

type Props = {
  user: User;
  error: string | null;
  isLogout: string | null;
};

type Inputs = {
  user_name: string;
  email: string;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let isLogout = ctx.query?.logout || null;

  if (isLogout) {
    destroyCookie(ctx, "restaurantMemoAppSession", { path: "/" });
  }

  const user_name = ctx.query.user_name as string;
  const email = ctx.query.email as string;
  let user = null;
  let error = null;

  if (email) {
    user = await loginUser(user_name, email);

    if (!user) error = "ユーザーを取得できませんでした";

    setCookie(ctx, "restaurantMemoAppSession", user_name, {
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      path: "/",
    });
  }

  return {
    props: {
      user,
      error,
      isLogout,
    },
  };
};

const Login: NextPage<Props> = ({ user, error, isLogout }) => {
  const router = useRouter();
  const { loginUser, setLoginUser } = userStore();

  if (user && user.allow) {
    !loginUser && setLoginUser(user);
    router.push({
      pathname: "/posts",
      query: { isLogin: "true" },
    });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      user_name: "",
      email: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const [user_name, email] = getValues(["user_name", "email"]);
  const errorProp = errors?.email ? errors : error;

  useEffect(() => {
    if (user_name.length > 0) document.getElementById("submit_button")!.click();
  }, [user_name]);

  const onSubmit: SubmitHandler<Inputs> = () => {};

  return (
    <div className="flex flex-col items-center">
      <div className="relative border-2 border-indigo-500 rounded-lg mt-16">
        <div
          className="relative w-24 h-8 bg-indigo-500 text-white text-center border-b-2 border-indigo-500 rounded-t-lg -top-8 left-3 hover:cursor-pointer"
          onClick={() => router.push("/signup")}
        >
          <div className="pt-1">signup</div>
        </div>
        <div className="px-8 mx-8 mb-10">
          <div className="flex flex-col justify-center items-center space-y-5">
            <div className="text-2xl font-bold mb-4">ログイン</div>
            {errorProp && <FormError errorProp={errorProp} />}
            <FlashMessage
              flashMessage={
                isLogout
                  ? {
                      message: "ログインしました",
                      type: "success",
                    }
                  : null
              }
            />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center space-y-5"
            >
              <Input
                label="ユーザ名"
                name="user_name"
                type="text"
                minLen={6}
                register={register}
                required={true}
              />
              <Input
                label="メールアドレス"
                name="email"
                type="email"
                minLen={10}
                register={register}
                required={true}
              />
              <div className="pt-10">
                <Button
                  text="送信"
                  type="submit"
                  color="#6366f1"
                  width="100px"
                  height="34px"
                />
              </div>
              <Link
                href={{
                  pathname: "/login",
                  query: { user_name: user_name, email: email },
                }}
                as="/login"
                className="text-white w-0 h-0"
                id="submit_button"
              ></Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
