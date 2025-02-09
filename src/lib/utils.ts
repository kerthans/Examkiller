import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using clsx and tailwind-merge
 * @param inputs - Class names to combine
 * @returns Combined class names string
 */
export function cn(...inputs: ClassValue[]): string {
  // 添加类型保护
  if (inputs.length === 0) return ''
  if (inputs.length === 1 && !inputs[0]) return ''
  
  try {
    return twMerge(clsx(inputs))
  } catch {
    // 确保即使出错也返回有效字符串
    return inputs.filter(Boolean).join(' ')
  }
}

// 导出类型定义以确保类型安全
export type { ClassValue }