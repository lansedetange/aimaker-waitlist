import { Pool } from 'pg'
import type { QueryParam, QueryResult, DatabaseError, DatabaseStatsResult } from '@/types/waitlist'

// 数据库连接池配置
// 优先使用DATABASE_URL，如果没有则使用分开的环境变量
const pool = new Pool(
  process.env.DATABASE_URL 
    ? {
        connectionString: process.env.DATABASE_URL,
        // 连接池配置
        max: 20, // 最大连接数
        idleTimeoutMillis: 30000, // 空闲连接超时时间
        connectionTimeoutMillis: 2000, // 连接超时时间
        // SSL配置（Zeabur等云数据库通常需要）
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      }
    : {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'aimaker_waitlist',
        password: process.env.DB_PASSWORD || '',
        port: parseInt(process.env.DB_PORT || '5432'),
        // 连接池配置
        max: 20, // 最大连接数
        idleTimeoutMillis: 30000, // 空闲连接超时时间
        connectionTimeoutMillis: 2000, // 连接超时时间
      }
)

// 数据库查询函数
export async function query(text: string, params?: QueryParam[]): Promise<QueryResult> {
  const client = await pool.connect()
  try {
    const result = await client.query(text, params)
    return result
  } finally {
    client.release()
  }
}

// 初始化数据库表
export async function initializeDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS waitlist_emails (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      ip_address INET,
      user_agent TEXT
    );
    
    CREATE INDEX IF NOT EXISTS idx_waitlist_emails_email ON waitlist_emails(email);
    CREATE INDEX IF NOT EXISTS idx_waitlist_emails_created_at ON waitlist_emails(created_at);
  `
  
  try {
    await query(createTableQuery)
    console.log('数据库表初始化成功')
  } catch (error) {
    console.error('数据库表初始化失败:', error)
    throw error
  }
}

// 添加邮箱到waitlist
export async function addEmailToWaitlist(email: string, ipAddress?: string, userAgent?: string) {
  const insertQuery = `
    INSERT INTO waitlist_emails (email, ip_address, user_agent)
    VALUES ($1, $2, $3)
    RETURNING id, email, created_at
  `
  
  try {
    const result = await query(insertQuery, [email, ipAddress, userAgent])
    return result.rows[0]
  } catch (error: unknown) {
    const dbError = error as DatabaseError
    // 检查是否是重复邮箱错误
    if (dbError.code === '23505') {
      throw new Error('Email already exists in waitlist')
    }
    throw error
  }
}

// 获取waitlist统计信息
export async function getWaitlistStats(): Promise<DatabaseStatsResult> {
  const statsQuery = `
    SELECT 
      COUNT(*) as total_emails,
      COUNT(DISTINCT DATE(created_at)) as total_days
    FROM waitlist_emails
  `
  
  try {
    const result = await query(statsQuery)
    return result.rows[0] as unknown as DatabaseStatsResult
  } catch (error) {
    console.error('获取waitlist统计失败:', error)
    throw error
  }
}

export default pool 