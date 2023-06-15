import { FC } from "react";
import Link from "next/link";
import { Lato } from "next/font/google";
import { RiRestaurantFill } from "react-icons/ri";

const lato = Lato({
  weight: ["900"],
  subsets: ["latin"],
});

const Header: FC = () => {
  return (
    <header className="flex justify-around bg-white p-4 mx-4 border-b-2 border-indigo-800">
      <div className="w-5/6 flex justify-start items-center space-x-6">
        <div className="w-44 flex justify-center items-center bg-indigo-800 text-slate-200 border-2 border-white rounded-3xl py-1 hover:bg-white hover:text-indigo-800 hover:border-indigo-800">
          <Link href="/posts" className="flex items-center font-semibold">
            <span className="pt-0.5">お店メモアプリ</span>
            <span className="text-2xl">
              <RiRestaurantFill />
            </span>
          </Link>
        </div>
        <nav className={`${lato.className} ml-10`}>
          <ul className="flex items-center justify-center space-x-8 pt-1 ml-5">
            <li className="inline-block border-b px-2 pb-0.5 text-indigo-800 border-indigo-800 hover:border-indigo-600 hover:text-indigo-600">
              <Link
                href="/posts"
                className="font-semibold hover:text-indigo-600"
              >
                お店リスト
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
