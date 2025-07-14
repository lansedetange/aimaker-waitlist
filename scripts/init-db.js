const { Pool } = require('pg')

// 数据库连接配置
// 优先使用DATABASE_URL，如果没有则使用分开的环境变量
const pool = new Pool(
  process.env.DATABASE_URL 
    ? {
        connectionString: process.env.DATABASE_URL,
        // SSL配置（Zeabur等云数据库通常需要）
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      }
    : {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'aimaker_waitlist',
        password: process.env.DB_PASSWORD || '',
        port: parseInt(process.env.DB_PORT || '5432'),
      }
)

async function initializeDatabase() {
  console.log('开始初始化数据库...')
  
  try {
    // 创建waitlist邮箱表
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
    
    await pool.query(createTableQuery)
    console.log('✅ 数据库表创建成功!')
    
    // 检查表是否存在
    const checkQuery = "SELECT table_name FROM information_schema.tables WHERE table_name = 'waitlist_emails'"
    const result = await pool.query(checkQuery)
    
    if (result.rows.length > 0) {
      console.log('✅ waitlist_emails表已确认存在')
    } else {
      console.log('❌ waitlist_emails表创建失败')
    }
    
  } catch (error) {
    console.error('❌ 数据库初始化失败:', error)
    process.exit(1)
  } finally {
    await pool.end()
    console.log('数据库连接已关闭')
  }
}

// 运行初始化
initializeDatabase() 