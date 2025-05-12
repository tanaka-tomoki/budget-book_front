'use client';
import { useState } from "react";

const Header = (() => {
  const [ openMenu, setOpenMenu ] = useState(false);
  return (
    <>
      <div className="absolute top-12 w-full flex justify-between p-2.5">
        <img src={'/logo.png'} className="w-11" />
        {/* ハンバーガーメニュー */}
        <button 
          type="button"
          className="z-10 space-y-2"
          onClick = {() => setOpenMenu(!openMenu)}
        >
          <div className={
            openMenu ? "w-8 h-0.5 bg-gray-600 translate-y-2.5 rotate-45 transition duration-500 ease-in-out"
            : "w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out"
          }>
          </div>
          <div className={
            openMenu ? "opaciti-0 transition duration-500 ease-in-out"
            : "w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out"
          }>
          </div>
          <div className={
            openMenu ? "w-8 h-0.5 bg-gray-600 -rotate-45 transition duration-500 ease-in-out"
            : "w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out"
         }>
          </div>
        </button>
      </div>
      <nav className={`
        absolute top-12 w-2/5 h-[804px] ease-linear duration-300 text-right pt-20 pr-4
        ${openMenu ? "right-0 bg-[#FFA500]" : "right-[-10%]"}
      `}>
        <ul className={`

          ${openMenu ? "" : "hidden"}
          `}>
          <li className="border-white border-b-1 pb-2 my-2.5 ml-7 hover:text-gray-600 hover:border-gray-600">
            <a href="">カレンダー</a>
          </li>
          <li className="border-white border-b-1 pb-2 my-2.5 ml-7 hover:text-gray-600 hover:border-gray-600">
            <a href="">今日の家計簿</a>
          </li>
          <li className="border-white border-b-1 pb-2 my-2.5 ml-7 hover:text-gray-600 hover:border-gray-600">
          <a href="">設定</a>
          </li>
          <li className="border-white border-b-1 pb-2 my-2.5 ml-7 hover:text-gray-600 hover:border-gray-600">
          <a href="">ログアウト</a>
          </li>
        </ul>
      </nav>
    </>
  )
})

export default Header;