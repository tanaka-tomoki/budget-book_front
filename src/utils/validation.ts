'use client';

export const isEmpty = (value: string | null | undefined): boolean => {
  return !value || value.trim() === '';
};
