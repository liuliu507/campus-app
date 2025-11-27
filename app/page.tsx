import Link from 'next/link'

const features = [
  {
    name: '代课服务',
    href: '/substitute',
    description: '寻找代课或提供代课服务',
    color: 'from-blue-500 to-blue-600',
    icon: '📚',
    emoji: '🎓'
  },
  {
    name: '跑腿服务',
    href: '/errand',
    description: '发布或接取跑腿任务',
    color: 'from-green-500 to-green-600',
    icon: '🏃',
    emoji: '⚡'
  },
  {
    name: '二手交易',
    href: '/secondhand',
    description: '买卖闲置物品',
    color: 'from-yellow-500 to-yellow-600',
    icon: '🛒',
    emoji: '💰'
  },
  {
    name: '兼职实习',
    href: '/jobs',
    description: '寻找工作机会',
    color: 'from-purple-500 to-purple-600',
    icon: '💼',
    emoji: '🌟'
  },
  {
    name: '红黑榜',
    href: '/reviews',
    description: '分享课程和商家评价',
    color: 'from-red-500 to-red-600',
    icon: '📊',
    emoji: '🔥'
  },
  {
    name: '求助打听',
    href: '/help',
    description: '寻求帮助和解答',
    color: 'from-indigo-500 to-indigo-600',
    icon: '🙋',
    emoji: '💡'
  },
  {
    name: '趣事分享',
    href: '/share',
    description: '分享校园趣事',
    color: 'from-pink-500 to-pink-600',
    icon: '😂',
    emoji: '🎉'
  },
  {
    name: '交友找伴',
    href: '/friends',
    description: '寻找志同道合的伙伴',
    color: 'from-orange-500 to-orange-600',
    icon: '👥',
    emoji: '❤️'
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 头部区域 */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              校园助手
            </h1>
            <p className="text-gray-600 text-lg font-medium">
              一站式校园生活服务平台 · 让大学生活更精彩
            </p>
          </div>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* 欢迎标语 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6">
            <span className="text-3xl">🎯</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-800 mb-4 leading-tight">
            发现校园的
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              无限可能
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            从学习到生活，从社交到成长，我们为你提供全方位的校园服务支持
          </p>
        </div>

        {/* 功能网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Link
              key={feature.name}
              href={feature.href}
              className="group relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="
                relative bg-white rounded-2xl shadow-lg hover:shadow-2xl 
                transition-all duration-300 ease-out group-hover:scale-105 
                group-hover:-translate-y-2 border border-gray-100
                h-full flex flex-col
              ">
                {/* 渐变顶部 */}
                <div className={`bg-gradient-to-r ${feature.color} h-2 w-full`}></div>

                {/* 内容区域 */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* 图标 */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{feature.icon}</div>
                    <div className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {feature.emoji}
                    </div>
                  </div>

                  {/* 标题和描述 */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                    {feature.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    {feature.description}
                  </p>

                  {/* 悬停指示器 */}
                  <div className="mt-4 flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    立即体验
                    <span className="ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 底部信息 */}
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              为什么选择校园助手？
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-xl">🔒</span>
                </div>
                <span className="font-semibold">安全可靠</span>
                <span className="text-xs mt-1">校园身份验证</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-xl">⚡</span>
                </div>
                <span className="font-semibold">快速便捷</span>
                <span className="text-xs mt-1">一键发布需求</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-xl">👥</span>
                </div>
                <span className="font-semibold">社区互助</span>
                <span className="text-xs mt-1">万名同学在线</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 校园助手 · 让每个人的大学生活都值得纪念
          </p>
        </div>
      </footer>
    </div>
  )
}