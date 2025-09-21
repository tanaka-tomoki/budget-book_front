import { BalanceType } from "../types/balanceType";

// アイコン情報の型定義
export interface IconType {
  id: number;
  name: string;
  path: string;
  balanceType: BalanceType;
  category: string;
}
