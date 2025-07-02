'use client'
import Header from '@/lib/components/header';
import { useState, JSX } from 'react';

const BalanceEntry = () => {
  // 今日の日付取得
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // カードを作成
  // ユーザに紐づく1日分のデータを取得し、カードを生成する
  const createCard = (): JSX.Element[] => {
    // 返却するHTML要素
    const cards: JSX.Element[] = [];
    // 画面orサーバからデータを受け取る
    const data = {
      1: {
        budgetDetailId: "1",
        userId: "1",
        cartegoryId: 101,
        balanceType: 100,
        content: "水道代",
        price: 1500,
        updateAt: "2025-5-12"
      },
      2: {
        budgetDetailId: "2",
        userId: "1",
        cartegoryId: 102,
        balanceType: 100,
        content: "電気代",
        price: 3000,
        updateAt: "2025-5-12"
      }
    }


    
    return cards;

  } 

  return(
    <div className="bb-box">
      <Header />
      <div className="content-area">
        <div className="flex justify-between text-center">
          <h1 className="ml-3 text-xl">{currentDate.getFullYear()}年{currentDate.getMonth() + 1}月</h1>
        </div>
        <div className='text-right'>
          <button 
            className='mr-2 w-10 h-10 bg-[#FF8C00] hover:bg-[#ffa600d8] text-2xl text-white shadow-md rounded-full
            transform active:scale-95 focus:outline-none transition-all duration-200 ease-in-out'
          >
            +
          </button>
        </div>
        <div className='mx-3 mt-5 w-92 h-[70vh] bg-[#DEB887] rounded-md px-2 pt-3 pb-2 overflow-y-auto overflow-x-hidden hide-scrollbar'>
          <div className='balance-card'>
            <span className='w-10'>アイコン</span>
            <span className='w-37 text-sm'>名前名前名前名前名前</span>
            <span className='w-28'>￥999,999,999</span>
            <span className='w-9'>ゴミ箱</span>
          </div>
          <div className='balance-card'>
            <span className='w-10'>アイコン</span>
            <span className='w-37 text-sm'>名前名前名前名前名前</span>
            <span className='w-28'>￥999,999,999</span>
            <span className='w-9'>ゴミ箱</span>
          </div>
          <div className='balance-card'>
            <span className='w-10'>アイコン</span>
            <span className='w-37 text-sm'>名前名前名前名前名前</span>
            <span className='w-28'>￥999,999,999</span>
            <span className='w-9'>ゴミ箱</span>
          </div>
          <div className='balance-card'>
            <span className='w-10'>アイコン</span>
            <span className='w-37 text-sm'>名前名前名前名前名前</span>
            <span className='w-28'>￥999,999,999</span>
            <span className='w-9'>ゴミ箱</span>
          </div>
          <div className='balance-card'>
            <span className='w-10'>アイコン</span>
            <span className='w-37 text-sm'>名前名前名前名前名前</span>
            <span className='w-28'>￥999,999,999</span>
            <span className='w-9'>ゴミ箱</span>
          </div>
          <div className='balance-card'>
            <span className='w-10'>アイコン</span>
            <span className='w-37 text-sm'>名前名前名前名前名前</span>
            <span className='w-28'>￥999,999,999</span>
            <span className='w-9'>ゴミ箱</span>
          </div>
          <div className='balance-card'>
            <span className='w-10'>アイコン</span>
            <span className='w-37 text-sm'>名前名前名前名前名前</span>
            <span className='w-28'>￥999,999,999</span>
            <span className='w-9'>ゴミ箱</span>
          </div>
          <div className='balance-card'>
            <span className='w-10'>アイコン</span>
            <span className='w-37 text-sm'>名前名前名前名前名前</span>
            <span className='w-28'>￥999,999,999</span>
            <span className='w-9'>ゴミ箱</span>
          </div>
          <div className='balance-card'>
            <span className='w-10'>アイコン</span>
            <span className='w-37 text-sm'>名前名前名前名前名前</span>
            <span className='w-28'>￥999,999,999</span>
            <span className='w-9'>ゴミ箱</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceEntry;