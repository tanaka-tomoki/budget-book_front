"use client";
import Header from "@/lib/components/header";
import React, { useState, JSX } from "react";

const Calendar = () => {
  // 取引データのインタフェース
  interface Transaction {
    year: number;
    month: number;
    date: number;
    income: number;
    expense: number;
  }

  // テストデータ
  const transactions: Transaction[] = [
    { year: 2025, month: 6, date: 1, income: 20, expense: 2 },
    { year: 2025, month: 6, date: 2, income: 20, expense: 2 },
    { year: 2025, month: 7, date: 14, income: 20, expense: 2 },
  ];

  // 今日の日付取得
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // 曜日名の配列（日本語表記）
  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];

  /**
   * 指定した月の日数を取得する
   */
  const getAmountOfDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  /**
   * 指定した月の1日が何曜日かを取得する（0=日曜日, 1=月曜日, ...）
   */
  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  /**
   * 数値を日本語のカンマ区切り形式でフォーマットする関数
   */
  const formatNumber = (num: number): string => {
    return num.toLocaleString("ja-JP");
  };

  /**
   * 特定の日付の取引データを取得する関数
   */
  const getTransactionForDate = (
    year: number,
    month: number,
    date: number,
  ): Transaction | undefined => {
    return transactions.find(
      (t: Transaction) =>
        t.year === year && t.month === month && t.date === date,
    );
  };

  /**
   * 前月・次月に移動
   */
  const navigateMonth = (direction: "prev" | "next"): void => {
    console.log("月移動のボタン押したよ");
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  /**
   * 今日に移動
   */
  const goToToday = (): void => {
    setCurrentDate(new Date());
  };

  /**
   * カレンダーをグリッド
   */
  const renderCalendarDays = (): JSX.Element[] => {
    // 指定月の日数
    const daysInMonth: number = getAmountOfDaysInMonth(currentDate);
    // 指定月の一日目
    const firstDay: number = getFirstDayOfMonth(currentDate);
    // 返却するHTML
    const days: JSX.Element[] = [];

    // 前月の日付を表示（当月1日より前の空白を埋める）
    for (let i = 0; i < firstDay; i++) {
      // 前月を取得
      const prevMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0,
      );
      // 前月の曜日を取得
      const prevDay = prevMonth.getDate() - (firstDay - 1 - i);

      days.push(
        <div key={`prev-${prevDay}`} className="p-1 text-gray-400 text-xs">
          <div className="text-center mb-1">{prevDay}</div>
        </div>,
      );
    }

    // 当月の日付を1から開始
    for (let day = 1; day <= daysInMonth; day++) {
      // 正しい日付で取引データを取得
      const transaction: Transaction | undefined = getTransactionForDate(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1, // monthは0ベースなので+1
        day,
      );

      const hasIncome: boolean =
        transaction !== undefined && transaction.income > 0;
      const hasExpense: boolean =
        transaction !== undefined && transaction.expense > 0;

      days.push(
        <div key={day} className="p-1 border-gray-400 h-16">
          {/* 正しい日付を表示 */}
          <div className="text-center text-xs font-medium mb-1">{day}</div>

          {/* 収入がある場合は青色で表示 */}
          {hasIncome && transaction && (
            <div className="text-xs bg-blue-600 rounded-md text-white mb-1 text-center">
              {formatNumber(transaction.income)}
            </div>
          )}

          {/* 支出がある場合は赤色で表示 */}
          {hasExpense && transaction && (
            <div className="text-xs bg-red-600 rounded-md text-white mb-1 text-center">
              {formatNumber(transaction.expense)}
            </div>
          )}
        </div>,
      );
    }

    // 🔧 修正: 翌月の日付表示を固定の6行（42セル）に統一
    const totalDisplayedDays = firstDay + daysInMonth;
    const totalCells = 42; // 6行 × 7列 = 42セル固定
    const remainingCells = totalCells - totalDisplayedDays;

    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div key={`next-${day}`} className="p-1 text-gray-400 text-xs">
          <div className="text-center mb-1">{day}</div>
        </div>,
      );
    }

    return days;
  };

  return (
    <div className="bb-box">
      <Header />
      <div className="content-area">
        <div className="flex justify-between text-center">
          <h1 className="ml-3 text-xl">
            {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
          </h1>
          <div className="mr-3 flex text-center">
            <button
              className="bg-[#FF8C00] w-12 h-6 mr-2 p-1 pb-1 rounded text-sm text-white shadow-md"
              onClick={goToToday}
            >
              今日
            </button>
            <button
              className="bg-amber-400 w-6 h-6 mr-1 text-sm rounded border-[#FF8C00] shadow-md"
              onClick={() => navigateMonth("prev")}
            >
              ＜
            </button>
            <button
              className="bg-amber-400 w-6 h-6 mr-1 text-sm rounded border-[#FF8C00] shadow-md"
              onClick={() => navigateMonth("next")}
            >
              ＞
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center w-full mt-4">
          <div className="text-xl">
            <div className="text-left">
              <span className="mr-1">収入</span>
              <span>￥</span>
              <span>99999</span>
            </div>
            <div>
              <span className="mr-1">支出</span>
              <span>￥</span>
              <span>9999999</span>
            </div>
            <div>
              <span className="mr-1">収支</span>
              <span>￥</span>
              <span>999999999</span>
            </div>
          </div>
        </div>
        {/* カレンダーヘッダー */}
        <div className="bg-white">
          {/* 曜日ヘッダー */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {dayNames.map((day, index) => (
              <div
                key={day}
                className={`p-2 text-center text-xs font-medium border-r border-gray-200 ${
                  index === 0
                    ? "text-red-500" // 日曜日は赤色
                    : index === 6
                      ? "text-blue-500" // 土曜日は青色
                      : "text-gray-700" // 平日は灰色
                }`}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 grid-rows-6">
            {renderCalendarDays()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
