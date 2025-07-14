// Waitlist相关的类型定义

// 数据库查询参数类型
export type QueryParam = string | number | boolean | Date | null | undefined

// API响应类型
export interface WaitlistApiResponse {
  success: boolean
  message?: string
  data?: {
    id: number
    email: string
    joinedAt: string
  }
  error?: string
}

// 统计数据类型
export interface WaitlistStatsResponse {
  success: boolean
  data: {
    totalEmails: number
    totalDays: number
  }
  error?: string
}

// 数据库错误类型
export interface DatabaseError extends Error {
  code?: string
  detail?: string
  hint?: string
}

// 表单成功回调数据类型
export interface WaitlistFormSuccessData {
  id: number
  email: string
  joinedAt: string
}

// 数据库统计查询结果类型
export interface DatabaseStatsResult {
  total_emails: string
  total_days: string
}

// PostgreSQL查询结果类型
export interface QueryResult<T = Record<string, unknown>> {
  rows: T[]
  rowCount: number | null
  command: string
  oid: number
  fields: Array<{
    name: string
    tableID: number
    columnID: number
    dataTypeID: number
    dataTypeSize: number
    dataTypeModifier: number
    format: string
  }>
} 