"use client";

import { BalanceType } from "@/lib/types/balanceType";
import { IconType } from "@/lib/intarFaces/iconType";

// カテゴリ定数
const CATEGORIES = {
  UTILITIES: 'utilities',              // 光熱費・住居
  DAILY_LIFE: 'daily_life',            // 日常生活
  EDUCATION: 'education',              // 教養・教育
  TRANSPORTATION: 'transportation',    // 交通
  HOUSEHOLD_GOODS: 'household_goods',  // 家庭用品
  TAX_INSURANCE: 'tax_insurance',      // 税金・保険
  INCOME: 'income',                    // 収入
  OTHER: 'other',                      // その他
} as const;

// 支出用アイコンの定数定義
const ExpenseIcons = {
  // 光熱費・住居
  WATER: {
    id: 1,
    name: "水道代",
    path: "/images/water.png",
    balanceType: 'expense' as const,
    category: CATEGORIES.UTILITIES,
  },
  ELECTRICITY: {
    id: 2,
    name: "電気代",
    path: "/images/electricity.png",
    balanceType: 'expense' as const,
    category: CATEGORIES.UTILITIES,
  },
  GAS: {
    id: 3,
    name: "ガス代",
    path: "/images/gas.png",
    balanceType: 'expense' as const,
    category: CATEGORIES.UTILITIES,
  },
  RENT: {
    id: 4,
    name: "家賃",
    path: "/images/rent.png",
    balanceType: 'expense' as const,
    category: CATEGORIES.UTILITIES,
  },

  // 日常生活
  FOOD: {
    id: 5,
    name: "食費",
    path: "/images/food.png",
    balanceType: 'expense' as const,
    category: CATEGORIES.DAILY_LIFE,
  },
  HOUSEHOLD: {
    id: 6,
    name: "雑費",
    path: "/images/household.png",
    balanceType: 'expense' as const,
    category: CATEGORIES.DAILY_LIFE,
  },
  CLOTHING: {
    id: 7,
    name: "衣服",
    path: "/images/clothing.png",
    balanceType: 'expense' as const,
    category: CATEGORIES.DAILY_LIFE,
  },
  ENTERTAINMENT: {
    id: 8,
    name: "交際費",
    path: "/images/entertainment.png",
    balanceType: 'expense' as const,
    category: CATEGORIES.DAILY_LIFE,
  },
  COMMUNICATION: {
    id: 9,
    name: "通信費",
    path: "/images/communication.png",
    balanceType: 'expense' as const,
    category: CATEGORIES.DAILY_LIFE,
  },
  BEAUTY: {
    id: 10,
    name: "美容",
    path: "/images/beauty.png",
    balanceType: 'expense' as const,
    category: CATEGORIES.DAILY_LIFE,
  },

  // 教養・教育
  EDUCATION: {
    id: 11,
    name: "教養",
    path: "/images/education.png",
    balanceType: 'expense' as const,
    category: CATEGORIES.EDUCATION,
  },

  // 交通
  TRANSPORTATION: {
    id: 12,
    name: "交通費",
    path: "/images/transportation.png",
    balanceType: 'expense' as const,
    category: CATEGORIES.TRANSPORTATION,
  },
  CAR: {
    id: 13,
    name: "自動車",
    path: "/images/car.png",
    balanceType: 'expense' as const,
    category: CATEGORIES.TRANSPORTATION,
  },

  // 家庭用品
  APPLIANCES: {
    id: 14,
    name: "家電",
    path: "/images/appliances.png",
    balanceType: 'expense' as const,
    category: CATEGORIES.HOUSEHOLD_GOODS,
  },
  FURNITURE: {
    id: 15,
    name: "家具",
    path: "/images/furniture.png",
    balanceType: 'expense' as const,
    category: CATEGORIES.HOUSEHOLD_GOODS,
  },

  // 税金・保険
  TAX: {
    id: 16,
    name: "税金",
    path: "/images/tax.png",
    balanceType: 'expense' as const,
    category: CATEGORIES.TAX_INSURANCE,
  },
  INSURANCE: {
    id: 17,
    name: "保険",
    path: "/images/insurance.png",
    balanceType: 'expense' as const,
    category: CATEGORIES.TAX_INSURANCE,
  },

  // その他
  EXPENSE_OTHER: {
    id: 18,
    name: "その他",
    path: "/images/other.png",
    balanceType: 'expense' as const,
    category: CATEGORIES.OTHER,
  },
} as const;

// 収入用アイコンの定数定義
const IncomeIcons = {
  SALARY: {
    id: 19,
    name: "給与",
    path: "/images/salary.png",
    balanceType: 'income' as const,
    category: CATEGORIES.INCOME,
  },
  SIDE_JOB: {
    id: 20,
    name: "副業",
    path: "/images/side_job.png",
    balanceType: 'income' as const,
    category: CATEGORIES.INCOME,
  },
  INVESTMENT: {
    id: 21,
    name: "投資",
    path: "/images/investment.png",
    balanceType: 'income' as const,
    category: CATEGORIES.INCOME,
  },
  REAL_ESTATE: {
    id: 22,
    name: "不動産",
    path: "/images/real_estate.png",
    balanceType: 'income' as const,
    category: CATEGORIES.INCOME,
  },
  PENSION: {
    id: 23,
    name: "年金",
    path: "/images/pension.png",
    balanceType: 'income' as const,
    category: CATEGORIES.INCOME,
  },
  TEMPORARY: {
    id: 24,
    name: "臨時収入",
    path: "/images/temporary.png",
    balanceType: 'income' as const,
    category: CATEGORIES.INCOME,
  },
} as const;

// その他
const OtherIcons = {
  OTHER: {
  id: 0,
    name: "その他",
    path: "/images/other.png",
    balanceType: 'other' as const,
    category: CATEGORIES.OTHER,
  }
} as const;

// 全アイコンの統合
const AllIcons = {
  ...ExpenseIcons,
  ...IncomeIcons,
  ...OtherIcons
} as const;

// カテゴリ名のマッピング
const CategoryLabels: Record<string, string> = {
  [CATEGORIES.UTILITIES]: '光熱費・住居',
  [CATEGORIES.DAILY_LIFE]: '日常生活',
  [CATEGORIES.EDUCATION]: '教養・教育',
  [CATEGORIES.TRANSPORTATION]: '交通',
  [CATEGORIES.HOUSEHOLD_GOODS]: '家庭用品',
  [CATEGORIES.TAX_INSURANCE]: '税金・保険',
  [CATEGORIES.INCOME]: '収入',
  [CATEGORIES.OTHER]: 'その他',
};

// アイコン管理クラス
class IconManager {
  // IDでアイコンを取得
  static getById(id: number): IconType {
    const icon = Object.values(AllIcons).find((icon) => icon.id === id);
    return icon ? icon : this.getDefault();
  }

  // タイプでアイコン配列を取得
  static getByType(balanceType: BalanceType): IconType[] {
    return Object.values(AllIcons).filter((icon) => icon.balanceType === balanceType);
  }

  // デフォルトアイコンを取得
  static getDefault(): IconType {
    return OtherIcons.OTHER;
  }
}

// エクスポート
export default IconManager;
export { ExpenseIcons, IncomeIcons, AllIcons, CATEGORIES, CategoryLabels };