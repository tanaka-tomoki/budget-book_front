"use client";
import Header from "@/lib/components/header";
import { useState, useEffect } from "react";
import EditBalanceCardModal from "@/lib/modal/editBalanceCardModal";
import IconManager from "@/utils/icons";
import { isEmpty } from "@/utils/validation";
import Image from "next/image";
import {
  BudgetDetailInfo,
  emptyBudgetDetailInfo,
} from "@/lib/intarFaces/budgetDetailInfo";
import { formatNumber } from "@/utils/format";
import api from '@/utils/client';
import { API_ENDPOINTS } from '@/utils/constants/APIendpoints';
import { AxiosError, AxiosResponse } from 'axios';

const BalanceEntry = () => {
  // 今日の日付取得
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [showModal, setShowModal] = useState(false);
  // 選択されたデータ
  const [selectedFormData, setSelectedFormData] = useState<BudgetDetailInfo>(
    emptyBudgetDetailInfo,
  );
  const [data, setData] = useState<{ [key: string]: BudgetDetailInfo }>({
    1: {
      budgetDetailId: 1,
      userId: "1",
      categoryId: 1,
      balanceType: "income",
      content: "水道代",
      price: 1500,
      updateAt: "2025-5-09",
    },
    2: {
      budgetDetailId: 2,
      userId: "1",
      categoryId: 2,
      balanceType: "income",
      content: "電気代",
      price: 3000,
      updateAt: "2025-5-12",
    },
  });

  const handleOpenModal = (cardData: BudgetDetailInfo) => {
    if (!cardData) {
      setSelectedFormData(emptyBudgetDetailInfo);
    } else {
      setSelectedFormData(cardData);
    }
    setShowModal((prev) => !prev);
  };

  // カードを作成
  // ユーザに紐づく1日分のデータを取得し、カードを生成する
  // サーバからデータを受け取る
  useEffect(() => {
    getBalanceCard();
  }, []);

  const getBalanceCard = async() => {
     await api
      .get(API_ENDPOINTS.BALAMCECARD.GET)
      .then((response: AxiosResponse) => {
        const { data, status } = response;
      })
      .finally(() => {
        console.log('通信結果');
      });
  };

  // タグ編集モーダル保存ボタン押下処理
  // 編集したデータをDBに保存し、収支入力画面へデータを反映する
  const saveEditData = (formData: BudgetDetailInfo) => {
    // 収支詳細ID：formdataのレングスを取ってきて、それに＋１した値。padStart(3, 値)
    const nextBudgetDetailId = data ? Object.keys(data).length + 1 : 1;
    const existingKey = Object.keys(data).find(
      (key) => data[key].budgetDetailId == formData.budgetDetailId,
    );
    // 内容が空の場合、アイコンの名前を設定
    if (isEmpty(formData.content)) {
      const iconName = IconManager.getById(formData.categoryId).name;
      formData = {
        ...formData,
        content: iconName,
      };
    }
    const updatteFormData = {
      ...formData,
      budgetDetailId: nextBudgetDetailId,
    };
    if (existingKey) {
      setData((prev) => ({
        ...prev,
        [existingKey!]: formData,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [nextBudgetDetailId.toString()]: updatteFormData,
      }));
    }
    setShowModal((prev) => !prev);
    console.log("更新データ", data);
  };

  const deleteData = (formData: BudgetDetailInfo) => {
    setData((prevData) => {
      const newData = { ...prevData };
      const keyToDelete = formData.budgetDetailId;
      delete newData[keyToDelete];
      return newData;
    });
  };

  return (
    <div className="bb-box">
      <Header />
      {/* 収支入力モーダル 
        todo: propsにカードデータを設定
      */}
      {showModal ? (
        <EditBalanceCardModal
          onClose={() => setShowModal((prev) => !prev)}
          onClickSaveButton={(formData) => saveEditData(formData)}
          budgetDetailInfo={selectedFormData}
        />
      ) : (
        <></>
      )}

      <div className="content-area">
        <div className="flex justify-between text-center">
          <h1 className="ml-3 text-xl">
            {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
            {currentDate.getDate()}日
          </h1>
        </div>
        <div className="text-right">
          <button
            onClick={() => handleOpenModal(emptyBudgetDetailInfo)}
            className="mr-2 w-10 h-10 bg-[#FF8C00] hover:bg-[#ffa600d8] text-2xl text-white shadow-md rounded-full
            transform active:scale-95 focus:outline-none transition-all duration-200 ease-in-out"
          >
            +
          </button>
        </div>
        <div className="mx-3 mt-5 w-92 h-[70vh] bg-[#DEB887] rounded-md px-2 pt-3 pb-2 scroll-area">
          {data ? (
            Object.values(data)
              .sort((a, b) => Date.parse(b.updateAt) - Date.parse(a.updateAt))
              .map((card) => (
                <div
                  className="balance-card"
                  key={card.budgetDetailId}
                  onClick={() => handleOpenModal(card)}
                >
                  <Image
                    src={IconManager.getById(card.categoryId).path}
                    alt=""
                    width={32}
                    height={39}
                  />
                  <span className="w-37 text-sm">{card.content}</span>
                  <span className="w-28">{formatNumber(card.price)}</span>
                  <Image
                    src="/images/trash.png"
                    alt=""
                    width={32}
                    height={39}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteData(card);
                    }}
                  />
                </div>
              ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default BalanceEntry;
