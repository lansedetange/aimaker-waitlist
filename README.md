# AImaker Waitlist

AImaker Waitlist是一个现代化的waitlist网站，为AI创作平台收集早期用户的邮箱地址。用户可以提交邮箱加入waitlist，项目使用PostgreSQL数据库存储用户信息。

## 🌟 功能特性

- ✅ **邮箱收集**: 用户输入邮箱加入waitlist
- ✅ **数据验证**: 邮箱格式验证和重复检查
- ✅ **PostgreSQL数据库**: 安全存储用户邮箱信息
- ✅ **实时统计**: 显示已加入用户数和活跃天数
- ✅ **响应式设计**: 支持桌面和移动设备
- ✅ **深色模式**: 自动适应系统主题
- ✅ **现代UI**: 使用Tailwind CSS打造美观界面

## 🛠 技术栈

- **前端**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **数据库**: PostgreSQL
- **数据库客户端**: node-postgres (pg)
- **字体**: Geist Sans & Geist Mono

## 📦 安装步骤

### 1. 克隆项目

```bash
git clone https://github.com/your-username/aimaker-waitlist.git
cd aimaker-waitlist
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

创建 `.env.local` 文件：

```bash
# PostgreSQL 数据库配置
DB_HOST=localhost
DB_PORT=5432
DB_NAME=aimaker_waitlist
DB_USER=your_username
DB_PASSWORD=your_password

# 或者使用完整的数据库URL
DATABASE_URL=postgresql://username:password@localhost:5432/aimaker_waitlist
```

### 4. 设置PostgreSQL数据库

确保PostgreSQL已安装并运行，然后创建数据库：

```bash
# 连接到PostgreSQL
psql -U postgres

# 创建数据库
CREATE DATABASE aimaker_waitlist;

# 创建用户（可选）
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE aimaker_waitlist TO your_username;
```

### 5. 初始化数据库表

```bash
npm run init-db
```

### 6. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

## 📁 项目结构

```
aimaker-waitlist/
├── app/                    # Next.js App Router 目录
│   ├── api/               # API 路由
│   │   └── waitlist/      # Waitlist API端点
│   ├── fonts/             # 字体文件
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局组件
│   └── page.tsx           # 首页
├── components/            # React 组件
│   ├── WaitlistForm.tsx   # Waitlist表单组件
│   ├── WaitlistStats.tsx  # 统计信息组件
│   └── WaitlistPageContent.tsx # 页面内容组件
├── lib/                   # 工具库
│   └── db.ts              # 数据库连接和查询
├── scripts/               # 脚本文件
│   └── init-db.js         # 数据库初始化脚本
├── package.json           # 项目配置
└── README.md              # 项目文档
```

## 🔌 API 文档

### POST /api/waitlist

提交邮箱加入waitlist。

**请求体**:
```json
{
  "email": "user@example.com"
}
```

**响应**:
```json
{
  "success": true,
  "message": "Successfully joined the waitlist!",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "joinedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### GET /api/waitlist

获取waitlist统计信息。

**响应**:
```json
{
  "success": true,
  "data": {
    "totalEmails": 1250,
    "totalDays": 30
  }
}
```

## 🗄 数据库结构

### waitlist_emails 表

| 字段 | 类型 | 描述 |
|------|------|------|
| id | SERIAL PRIMARY KEY | 自增ID |
| email | VARCHAR(255) UNIQUE | 用户邮箱 |
| created_at | TIMESTAMP | 创建时间 |
| ip_address | INET | 用户IP地址 |
| user_agent | TEXT | 用户代理信息 |

## 🚀 部署

### Vercel部署

1. 推送代码到GitHub
2. 在Vercel中导入项目
3. 配置环境变量
4. 部署

### 数据库托管

推荐使用以下PostgreSQL托管服务：
- [Neon](https://neon.tech/)
- [Supabase](https://supabase.com/)
- [Railway](https://railway.app/)
- [PlanetScale](https://planetscale.com/)

## 📋 可用脚本

```bash
npm run dev        # 启动开发服务器
npm run build      # 构建生产版本
npm run start      # 启动生产服务器
npm run lint       # 运行ESLint检查
npm run init-db    # 初始化数据库表
```

## 🔧 配置说明

### 环境变量

| 变量 | 描述 | 默认值 |
|------|------|--------|
| DB_HOST | 数据库主机 | localhost |
| DB_PORT | 数据库端口 | 5432 |
| DB_NAME | 数据库名称 | aimaker_waitlist |
| DB_USER | 数据库用户 | postgres |
| DB_PASSWORD | 数据库密码 | (必填) |

## 📝 更新日志

### v0.1.0 (2024-01-01)

- ✅ 初始项目搭建
- ✅ PostgreSQL数据库集成
- ✅ Waitlist表单功能
- ✅ 邮箱验证和存储
- ✅ 实时统计展示
- ✅ 响应式设计
- ✅ API路由实现
- ✅ 错误处理和用户反馈
- ✅ 深色模式支持

## 🤝 贡献

欢迎提交Issue和Pull Request来改进项目。

## 📄 许可证

MIT License

## 💡 技术特点

- **服务器端渲染**: 使用Next.js App Router
- **类型安全**: 完整的TypeScript支持
- **性能优化**: 客户端组件最小化
- **错误处理**: 完善的错误处理机制
- **安全性**: SQL注入防护和数据验证
- **可扩展性**: 模块化组件设计

---

🚀 **享受创建你的AI waitlist网站的过程！**
