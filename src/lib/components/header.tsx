"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  return (
    <>
      <div className="absolute top-12 w-full flex justify-between p-2.5">
        <Image src="/images/logo.png" alt="logo" width={44} height={40} />
        {/* ハンバーガーメニュー */}
        <button
          type="button"
          className="z-20 space-y-2"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <div
            className={
              openMenu
                ? "w-8 h-0.5 bg-gray-600 translate-y-2.5 rotate-45 transition duration-500 ease-in-out"
                : "w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out"
            }
          ></div>
          <div
            className={
              openMenu
                ? "opaciti-0 transition duration-500 ease-in-out"
                : "w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out"
            }
          ></div>
          <div
            className={
              openMenu
                ? "w-8 h-0.5 bg-gray-600 -rotate-45 transition duration-500 ease-in-out"
                : "w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out"
            }
          ></div>
        </button>
      </div>
      <nav
        className={`
        absolute w-2/5 h-[100vh] ease-linear duration-300 text-right pt-20 pr-4
        ${openMenu ? "right-0 bg-[#FFA500] z-10" : "right-[-10%]"}
      `}
      >
        <ul
          className={`
          ${openMenu ? "" : "hidden"}
          `}
        >
          <li className="border-white border-b-1 pb-2 my-2.5 ml-7 hover:text-gray-600 hover:border-gray-600">
            <Link href="/features/calender">カレンダー</Link>
          </li>
          <li className="border-white border-b-1 pb-2 my-2.5 ml-7 hover:text-gray-600 hover:border-gray-600">
            <Link href="/features/balanceEntry">今日の家計簿</Link>
          </li>
          <li className="border-white border-b-1 pb-2 my-2.5 ml-7 hover:text-gray-600 hover:border-gray-600">
            <Link href="/features/calender">設定</Link>
          </li>
          <li className="border-white border-b-1 pb-2 my-2.5 ml-7 hover:text-gray-600 hover:border-gray-600">
            <Link href="/features/calender">ログアウト</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
