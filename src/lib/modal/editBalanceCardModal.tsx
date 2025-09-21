"use client";
import { useState, useEffect } from "react";
import { TextField, InputAdornment, Button } from "@mui/material";
import Image from "next/image";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ja } from "date-fns/locale";
import IconManager from "@/utils/icons";
import IconEditModal from "./iconEditModal";
import { BudgetDetailInfo } from "../intarFaces/budgetDetailInfo";
import { parseDate, formatNumber } from "@/utils/format";
import { BalanceType } from "@/lib/types/balanceType";

// 引数
// 閉じる関数
// 保存イベント関数
// 選択したformデータ（null許容）
type EditBalanceCardModalProps = {
  onClose: () => void;
  onClickSaveButton: (formData: BudgetDetailInfo) => void;
  budgetDetailInfo: BudgetDetailInfo;
};

const EditBalanceCardModal: React.FC<EditBalanceCardModalProps> = ({
  onClose,
  onClickSaveButton,
  budgetDetailInfo,
}) => {
  // エラーハンドル
  const [priceErrorMessage, setPriceErrorMessage] = useState("");
  const [contentErrorMessage, setContentErrorMessage] = useState("");
  // 収入、支出のカテゴリ管理
  const [formData, setFormData] = useState<BudgetDetailInfo>(budgetDetailInfo);
  const [editType, setEditType] = useState<BalanceType>(
    formData.balanceType || "income",
  );
  const defaultIcon = IconManager.getDefault();
  const [iconInfo, setIconInfo] = useState(
    IconManager.getById(budgetDetailInfo.categoryId) || defaultIcon,
  );

  // formData.categoryIdが変わったらiconInfoを更新
  useEffect(() => {
    setIconInfo(IconManager.getById(formData.categoryId));
  }, [formData.categoryId]);
  const [showIEModal, setShowIEModal] = useState(false);

  // 収入・支出のformDataの中身を更新
  // param: 変更したい項目（amount,category,content,date）
  const handleEditChange = (field: keyof BudgetDetailInfo) => (value: any) => {
    const newValue = value.target ? value.target.value : value;
    if (field == "updateAt") {
      setFormData((prev) => ({
        ...prev,
        updateAt: value
          ? `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`
          : "",
      }));
    } else if (field === "price") {
      const raw = newValue.replace(/,/g, "");
      if (raw && isNaN(Number(raw))) {
        setPriceErrorMessage("数字を入力して下さい");
      } else {
        setPriceErrorMessage("");
        setFormData((prev) => ({
          ...prev,
          price: newValue,
        }));
      }
    } else if (field == "categoryId") {
      if (newValue.balanceType != editType) {
        setFormData((prev) => ({
          ...prev,
          categoryId: 0,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          categoryId: newValue.id,
        }));
      }
    } else if (field == "content") {
      if (newValue.length > 20) {
        setContentErrorMessage("内容は20文字以内で入力して下さい");
      } else {
        setContentErrorMessage("");
        setFormData((prev) => ({
          ...prev,
          [field]: newValue,
        }));
      }
    }
  };

  return (
    <div className="modal-content edit-balance-card-modal">
      <IconEditModal
        isOpen={showIEModal}
        onClose={() => setShowIEModal(!showIEModal)}
        onIconSelect={(selectedIconInfo) =>
          handleEditChange("categoryId")(selectedIconInfo)
        }
        initialSelectedIconId={iconInfo}
        initialSelectedCategory={editType}
      />
      <div className="text-right">
        <button type="button" className="z-20 space-y-2" onClick={onClose}>
          <div
            className={
              "w-8 h-0.5 bg-gray-600 translate-y-2.5 rotate-45 transition"
            }
          ></div>
          <div className={"w-8 h-0.5 bg-gray-600 -rotate-45 transition"}></div>
        </button>
      </div>
      <div className="text-black">入力</div>
      {/* 収入、支出切替*/}
      <div className="flex justify-center gap-4 mt-2">
        <div
          className={`w-32 h-9 border-b
            ${editType == "income" ? "text-[#FF8C00] border-[#FF8C00]" : "text-black border-black"}`}
          onClick={() => setEditType("income")}
        >
          収入
        </div>
        <div
          className={`w-32 h-9 border-b
            ${editType == "expense" ? "text-[#FF8C00] border-[#FF8C00]" : "text-black border-black"}`}
          onClick={() => setEditType("expense")}
        >
          支出
        </div>
      </div>
      <div className="text-4xl text-black mt-9">
        {/*金額*/}
        <TextField
          id="amount"
          value={formatNumber(formData.price)}
          variant="standard"
          onChange={handleEditChange("price")}
          helperText={priceErrorMessage}
          sx={{
            "& .MuiInputBase-input": { fontSize: "28px" },
            width: "250px",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <span style={{ fontSize: "28px" }}>￥</span>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="mt-6">
        <div className="text-black text-left">カテゴリ</div>
        <div className="flex justify-center gap-5">
          <div className="text-black">
            <Image
              src={iconInfo ? iconInfo.path : defaultIcon.path}
              alt={iconInfo ? iconInfo.name : defaultIcon.name}
              width={32}
              height={39}
            />
          </div>
          <div className="text-black text-base text-[20px] text-center">
            {iconInfo ? iconInfo.name : defaultIcon.name}
          </div>
          <Button
            variant="contained"
            sx={{
              background: "#FFE4B5",
              color: "black",
              minWidth: 64,
              height: 32,
            }}
            onClick={() => setShowIEModal((showIEModal) => !showIEModal)}
          >
            選択
          </Button>
        </div>
      </div>
      <div className="mt-6">
        <div className="text-black text-left">内容</div>
        <TextField
          id="content"
          value={formData.content}
          variant="standard"
          onChange={handleEditChange("content")}
          helperText={contentErrorMessage}
          sx={{
            "& .MuiInputBase-input": { fontSize: "20px" },
            width: "250px",
          }}
        />
      </div>
      <div className="mt-6">
        <div className="text-black text-left">日付</div>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
          <DemoContainer
            components={["DatePicker"]}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <DatePicker
              value={formData.updateAt ? parseDate(formData.updateAt) : null}
              format="yyyy/M/d"
              onChange={handleEditChange("updateAt")}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className="mt-6">
        <Button
          variant="contained"
          sx={{
            background: "#FF8C00",
            color: "white",
            minWidth: 245,
            height: 53,
            fontSize: "20px",
            "&:hover": "#e67e00",
          }}
          onClick={() => onClickSaveButton(formData)}
        >
          保存
        </Button>
      </div>
    </div>
  );
};

export default EditBalanceCardModal;
