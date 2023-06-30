import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/atoms/input";
import Button from "@/components/atoms/button";
import FormError from "@/components/atoms/formError";
import { User } from "@/types";
import { getUser, signupUser } from "@/lib/api/users";
import { useEffect } from "react";
import FlashMessage from "@/components/atoms/fleshMessages";

type Props = {
  user: User;
  error: string;
};

type Inputs = {
  email: string;
  user_name: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const email = context.query?.email as string;
  const user_name = context.query?.user_name as string;
  let user = null;
  let error = null;

  if (email) {
    user = await getUser(email);

    if (!user) {
      user = await signupUser(user_name, email);
    } else {
      user = null;
      error = "既にそのメールアドレスは使われています";
    }
  }

  return {
    props: {
      user,
      error,
    },
  };
};

const SignUp: NextPage<Props> = ({ user, error }) => {
  const router = useRouter();

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

  useEffect(() => {
    document.getElementById("submit_button")!.click();
  }, [user_name]);

  const onSubmit: SubmitHandler<Inputs> = () => {};

  const errorProp = errors?.email ? errors : error;

  return (
    <div className="flex flex-col items-center">
      <div className="relative border-2 border-indigo-500 rounded-lg mt-16">
        <div
          className="relative w-24 h-8 bg-indigo-500 text-white text-center border-b-2 border-indigo-500 rounded-t-lg -top-8 left-3 hover:cursor-pointer"
          onClick={() => router.push("/login")}
        >
          <div className="pt-1">login</div>
        </div>
        <div className="px-8 mx-8 mb-10">
          <div className="flex flex-col justify-center items-center space-y-5">
            <div className="text-2xl font-bold mb-4">サインアップ</div>
            {errorProp && <FormError errorProp={errorProp} />}
            <FlashMessage
              flashMessage={
                user && {
                  message:
                    "ユーザー登録の申請を行いました。認可の連絡をお待ちください",
                  type: "success",
                }
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
                  pathname: "/signup",
                  query: { user_name: user_name, email: email },
                }}
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

export default SignUp;
