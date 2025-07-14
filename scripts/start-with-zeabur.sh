#!/bin/bash

# AImaker Waitlist - 使用Zeabur数据库启动脚本
echo "🚀 启动AImaker Waitlist (使用Zeabur数据库)..."

# 设置Zeabur数据库连接
export DATABASE_URL='postgresql://root:7bS386kwINCh4KMaOWE209QsPj1BFrp5@cgk1.clusters.zeabur.com:32171/zeabur'

# 检查是否需要初始化数据库
echo "📊 检查数据库连接..."

# 启动开发服务器
echo "🌐 启动开发服务器在 http://localhost:3000"
npm run dev 