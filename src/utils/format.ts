'use client';

// 3桁区切りの数値フォーマット
export function formatNumber(value: number) {
  if (!value) return '';
  const raw = value.toString().replace(/,/g, '');
  if (isNaN(Number(raw))) return '';
  return Number(raw).toLocaleString();
};

// 日付の整形（ネイティブDateオブジェクトを使用）
export function parseDate(dateString: string) {
  if (!dateString) return null;
  const [year, month, day] = dateString.split('-');
  // ネイティブDateオブジェクトを直接返す（タイムゾーンの影響なし）
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};
