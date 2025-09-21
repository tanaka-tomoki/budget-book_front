import { BalanceType } from "../types/balanceType";

export interface BudgetDetailInfo {
  budgetDetailId: number;
  userId: string;
  categoryId: number;
  balanceType: BalanceType;
  content: string;
  price: number;
  updateAt: string;
}

// 空のCardInfo定数を追加
export const emptyBudgetDetailInfo: BudgetDetailInfo = {
  budgetDetailId: 0,
  userId: "",
  categoryId: 0,
  balanceType: "income",
  content: "",
  price: 0,
  updateAt: new Date().toISOString().substring(0, 10),
};
