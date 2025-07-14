import { NextRequest, NextResponse } from 'next/server'
import { addEmailToWaitlist, initializeDatabase } from '@/lib/db'
import { headers } from 'next/headers'

// 邮箱验证正则表达式
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    // 解析请求数据
    const { email } = await request.json()
    
    // 验证邮箱格式
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }
    
    // 获取客户端信息
    const headersList = headers()
    const userAgent = headersList.get('user-agent') || ''
    const forwarded = headersList.get('x-forwarded-for')
    const realIp = headersList.get('x-real-ip')
    const ipAddress = forwarded?.split(',')[0] || realIp || '0.0.0.0'
    
    // 确保数据库表已初始化
    await initializeDatabase()
    
    // 添加邮箱到waitlist
    const result = await addEmailToWaitlist(
      email.trim().toLowerCase(),
      ipAddress,
      userAgent
    )
    
    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist!',
      data: {
        id: result.id,
        email: result.email,
        joinedAt: result.created_at
      }
    }, { status: 201 })
    
  } catch (error: any) {
    console.error('API错误:', error)
    
    // 处理重复邮箱错误
    if (error.message === 'Email already exists in waitlist') {
      return NextResponse.json(
        { error: 'Email already registered in waitlist' },
        { status: 409 }
      )
    }
    
    // 处理数据库连接错误
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      return NextResponse.json(
        { error: 'Database connection failed. Please try again later.' },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// 获取waitlist统计信息
export async function GET() {
  try {
    const { getWaitlistStats } = await import('@/lib/db')
    
    // 确保数据库表已初始化
    await initializeDatabase()
    
    const stats = await getWaitlistStats()
    
    return NextResponse.json({
      success: true,
      data: {
        totalEmails: parseInt(stats.total_emails),
        totalDays: parseInt(stats.total_days)
      }
    })
    
  } catch (error: any) {
    console.error('获取统计信息错误:', error)
    
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
} 