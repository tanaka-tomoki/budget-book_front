"use client";
import IconManager from "@/utils/icons";
import { Button } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BalanceType } from "@/lib/types/balanceType";
import { IconType } from "../intarFaces/iconType";

// プロップスの設定
type IconEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onIconSelect: (iconInfo: IconType) => void; // 選択されたアイコンを親に渡すコールバック
  initialSelectedIconId?: IconType; // 初期選択状態
  initialSelectedCategory: BalanceType;
};

const IconEditModal: React.FC<IconEditModalProps> = ({
  isOpen,
  onClose,
  onIconSelect,
  initialSelectedIconId,
  initialSelectedCategory,
}) => {
  // カテゴリで表示するアイコンを分ける。デフォルト：収入
  const iconByBalance = IconManager.getByType(
    initialSelectedCategory ? initialSelectedCategory : "income",
  );
  // モーダル内での選択状態を管理
  const [selectedIconInfo, setSelectedIconInfo] = useState(
    initialSelectedIconId,
  );

  // アイコンクリック時の処理
  const handleIconClick = (iconInfo: IconType) => {
    setSelectedIconInfo(iconInfo);
  };

  // 選択ボタンクリック時の処理
  const handleConfirmSelection = () => {
    if (selectedIconInfo) {
      onIconSelect(selectedIconInfo);
      onClose();
    }
  };

  if (isOpen) {
    return (
      <div className="modal-content icon-edit-modal">
        <div className="text-right">
          <button type="button" className="z-20 space-y-2" onClick={onClose}>
            <div
              className={
                "w-8 h-0.5 bg-gray-600 translate-y-2.5 rotate-45 transition"
              }
            ></div>
            <div
              className={"w-8 h-0.5 bg-gray-600 -rotate-45 transition"}
            ></div>
          </button>
        </div>
        <div className="text-black">アイコン選択</div>
        <div className="text-black flex flex-wrap gap-1 items-start content-start px-4 py-3 scroll-area h-[60vh]">
          {iconByBalance.map((value, index) => {
            const isSelected = selectedIconInfo == value; // 各アイコンごとに選択状態をチェック
            return (
              <div
                key={value.id || index}
                className={`w-[calc(25%-0.25rem)] min-h-[4rem] flex flex-col items-center justify-center cursor-pointer rounded p-2 transition-all duration-200 border-2 ${
                  isSelected
                    ? "bg-blue-100 border-blue-500 shadow-lg transform scale-105"
                    : "border-transparent hover:bg-gray-100 hover:border-gray-300"
                }`}
                onClick={() => handleIconClick(value)}
              >
                <Image
                  src={value.path}
                  alt={value.name}
                  width={35}
                  height={28}
                  className="m-auto"
                />
                <div
                  className={`text-[12px] mt-1 ${
                    isSelected ? "text-blue-700 font-semibold" : "text-gray-700"
                  }`}
                >
                  {value.name}
                </div>
              </div>
            );
          })}
        </div>
        <Button
          variant="contained"
          onClick={handleConfirmSelection}
          disabled={!selectedIconInfo} // アイコンが選択されていない場合は無効化
          sx={{
            background: selectedIconInfo ? "#FF8C00" : "#ccc",
            color: "white",
            minWidth: 245,
            height: 53,
            fontSize: "20px",
            "&:hover": {
              background: selectedIconInfo ? "#e67e00" : "#ccc",
            },
            "&:disabled": {
              background: "#ccc",
              color: "#666",
            },
          }}
        >
          選択
        </Button>
      </div>
    );
  } else {
    return <></>;
  }
};

export default IconEditModal;
