@echo off
echo 🚀 启动AImaker Waitlist (使用Zeabur数据库)...

REM 设置Zeabur数据库连接
set DATABASE_URL=postgresql://root:7bS386kwINCh4KMaOWE209QsPj1BFrp5@cgk1.clusters.zeabur.com:32171/zeabur

echo 📊 使用Zeabur数据库连接...
echo 🌐 启动开发服务器在 http://localhost:3000

REM 启动开发服务器
npm run dev 