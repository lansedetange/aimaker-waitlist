"use client"

import { useState } from 'react'
import { WaitlistForm } from './WaitlistForm'
import { WaitlistStats } from './WaitlistStats'

export function WaitlistPageContent() {
  const [refreshStats, setRefreshStats] = useState(0)

  // 处理表单提交成功后的操作
  const handleFormSuccess = () => {
    // 刷新统计数据
    setRefreshStats(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* 头部区域 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            AImaker
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">
            The Future of AI-Powered Creation
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Join thousands of creators, developers, and innovators who are shaping the future of AI. 
            Be the first to experience our revolutionary AI creation platform.
          </p>
        </div>

        {/* 特色功能展示 */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Lightning Fast
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Generate high-quality content in seconds with our advanced AI models.
            </p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Creative Tools
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Powerful AI tools for content creation, design, and automation.
            </p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Learn & Grow
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access tutorials, community, and resources to master AI creation.
            </p>
          </div>
        </div>

        {/* Waitlist表单区域 */}
        <div className="max-w-lg mx-auto mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
              Join the Waitlist
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              Be among the first to experience the future of AI creation. 
              Get early access and exclusive updates.
            </p>
            <WaitlistForm onSuccess={handleFormSuccess} />
          </div>
        </div>

        {/* 统计信息 */}
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <WaitlistStats key={refreshStats} />
          </div>
        </div>

        {/* 底部信息 */}
        <div className="text-center mt-12 text-gray-500 dark:text-gray-400">
          <p>© 2024 AImaker. Building the future of AI-powered creation.</p>
        </div>
      </div>
    </div>
  )
} 