"use client"

import { useState, useEffect } from 'react'

interface StatsData {
  totalEmails: number
  totalDays: number
}

export function WaitlistStats() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 获取统计数据
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/waitlist')
      if (response.ok) {
        const data = await response.json()
        setStats(data.data)
      }
    } catch (error) {
      console.error('获取统计数据失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  // 刷新统计数据的方法
  const refreshStats = () => {
    setIsLoading(true)
    fetchStats()
  }

  if (isLoading) {
    return (
      <div className="flex justify-center space-x-8 py-6">
        <div className="text-center">
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-16 rounded mb-2"></div>
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-20 rounded"></div>
        </div>
        <div className="text-center">
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-16 rounded mb-2"></div>
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-20 rounded"></div>
        </div>
      </div>
    )
  }

  if (!stats) {
    return null
  }

  return (
    <div className="text-center">
      <div className="flex justify-center space-x-8 py-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {stats.totalEmails.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            People Joined
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {stats.totalDays}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Days Active
          </div>
        </div>
      </div>
      
      <button
        onClick={refreshStats}
        className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
      >
        Refresh Stats
      </button>
    </div>
  )
}

// 导出刷新函数给父组件使用
export { WaitlistStats as default } 