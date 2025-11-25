'use client'

import { useState } from 'react'
import ErrandModal from './components/ErrandModal'

// 模拟跑腿任务数据
const mockTasks = [
  {
    id: 1,
    title: '取快递服务',
    category: '取送物品',
    fromLocation: '菜鸟驿站（主校区）',
    toLocation: '学生公寓3号楼',
    price: '8元',
    weight: '轻物（＜1kg）',
    quantity: '2个包裹',
    deadline: '今天18:00前',
    description: '有两个中通快递需要取，包裹不大，放在驿站货架上',
    contact: '138****1234',
    author: '快递多多',
    status: '招募中',
    urgency: '一般',
    timePosted: '30分钟前',
    applicants: 2,
    distance: '0.8km',
    estimatedTime: '15分钟'
  },
  {
    id: 2,
    title: '紧急送文件',
    category: '文件传递',
    fromLocation: '行政楼301办公室',
    toLocation: '东校区图书馆前台',
    price: '15元',
    weight: '文件',
    quantity: '1份重要文件',
    deadline: '紧急 · 1小时内',
    description: '有一份紧急文件需要送到图书馆，关系到毕业材料，非常紧急！',
    contact: '139****5678',
    author: '毕业生小王',
    status: '招募中',
    urgency: '紧急',
    timePosted: '15分钟前',
    applicants: 0,
    distance: '1.2km',
    estimatedTime: '20分钟'
  },
  {
    id: 3,
    title: '买奶茶跑腿',
    category: '餐饮代购',
    fromLocation: '喜茶（万达广场店）',
    toLocation: '计算机学院楼',
    price: '12元',
    weight: '饮品',
    quantity: '4杯奶茶',
    deadline: '今天16:00前',
    description: '想喝喜茶的多肉葡萄，买4杯，可以AA跑腿费，要冰的少糖',
    contact: '137****9012',
    author: '奶茶爱好者',
    status: '已满',
    urgency: '一般',
    timePosted: '2小时前',
    applicants: 3,
    distance: '2.5km',
    estimatedTime: '35分钟'
  },
  {
    id: 4,
    title: '超市代购',
    category: '商品代购',
    fromLocation: '永辉超市',
    toLocation: '西校区宿舍区',
    price: '10元',
    weight: '中等（1-5kg）',
    quantity: '生活用品若干',
    deadline: '今晚20:00前',
    description: '需要购买：洗发水1瓶、纸巾2提、泡面5包、零食若干',
    contact: '136****3456',
    author: '宅宿舍',
    status: '招募中',
    urgency: '一般',
    timePosted: '1小时前',
    applicants: 1,
    distance: '1.8km',
    estimatedTime: '25分钟'
  },
  {
    id: 5,
    title: '打印资料',
    category: '文印服务',
    fromLocation: '文印店（图书馆旁）',
    toLocation: '经管学院楼',
    price: '6元',
    weight: '文件',
    quantity: '50页资料',
    deadline: '今天14:00前',
    description: '需要打印50页复习资料，双面打印，装订成册',
    contact: '135****7890',
    author: '考试党',
    status: '招募中',
    urgency: '一般',
    timePosted: '45分钟前',
    applicants: 0,
    distance: '0.5km',
    estimatedTime: '10分钟'
  }
]

export default function ErrandPage() {
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'nearby' | 'urgent'>('all')
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [searchTerm, setSearchTerm] = useState('')
  const [tasks, setTasks] = useState(mockTasks)

  const categories = ['全部', '取送物品', '文件传递', '餐饮代购', '商品代购', '文印服务', '其他']
  const urgencyLevels = ['全部', '一般', '紧急', '非常紧急']

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.fromLocation.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === '全部' || task.category === selectedCategory
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'nearby' && task.distance <= '1km') ||
      (activeTab === 'urgent' && task.urgency === '紧急')

    return matchesSearch && matchesCategory && matchesTab
  })

  const handleTakeOrder = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, applicants: task.applicants + 1 }
        : task
    ))
    alert('接单成功！请及时联系发布者确认细节')
  }

  const handleContact = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      navigator.clipboard.writeText(task.contact)
      alert('联系方式已复制到剪贴板！')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '招募中': return 'bg-green-100 text-green-800 border border-green-300'
      case '已满': return 'bg-gray-100 text-gray-800 border border-gray-300'
      case '进行中': return 'bg-blue-100 text-blue-800 border border-blue-300'
      case '已完成': return 'bg-purple-100 text-purple-800 border border-purple-300'
      default: return 'bg-yellow-100 text-yellow-800 border border-yellow-300'
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case '紧急': return 'bg-red-100 text-red-800 border border-red-300'
      case '非常紧急': return 'bg-red-500 text-white border border-red-600'
      default: return 'bg-gray-100 text-gray-800 border border-gray-300'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '取送物品': return 'bg-blue-100 text-blue-800'
      case '文件传递': return 'bg-green-100 text-green-800'
      case '餐饮代购': return 'bg-pink-100 text-pink-800'
      case '商品代购': return 'bg-orange-100 text-orange-800'
      case '文印服务': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDistanceColor = (distance: string) => {
    const dist = parseFloat(distance)
    if (dist <= 1) return 'text-green-600'
    if (dist <= 2) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cyan-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">跑腿服务</h1>
          <p className="text-gray-600 text-lg">动动手指，跑腿赚钱 · 发布需求，省时省力</p>
        </div>

        {/* 主操作区 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* 左侧：功能描述 */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                校园生活
                <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent"> 更轻松</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                取快递、送文件、买奶茶... 校园跑腿，让生活更便捷
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">🚴</div>
                  <span>快速送达</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">💰</div>
                  <span>合理报酬</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">📍</div>
                  <span>校园范围</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">⚡</div>
                  <span>及时响应</span>
                </div>
              </div>
            </div>

            {/* 右侧：操作按钮 */}
            <div className="flex flex-col gap-4 w-full lg:w-auto">
              <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                🏃 发布跑腿需求
              </button>
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${activeTab === 'all'
                    ? 'bg-green-100 text-green-700 border-2 border-green-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  全部任务
                </button>
                <button
                  onClick={() => setActiveTab('nearby')}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${activeTab === 'nearby'
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  附近任务
                </button>
                <button
                  onClick={() => setActiveTab('urgent')}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${activeTab === 'urgent'
                    ? 'bg-red-100 text-red-700 border-2 border-red-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  紧急任务
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 搜索筛选栏 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="🔍 搜索跑腿任务、地点、物品..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>找到 <strong className="text-green-600">{filteredTasks.length}</strong> 个跑腿任务</span>
            <span>💡 提示：接单前请确认时间和地点</span>
          </div>
        </div>

        {/* 任务列表 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
              {/* 任务头部 */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getUrgencyColor(task.urgency)}`}>
                        {task.urgency}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(task.category)}`}>
                        {task.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{task.price}</div>
                    <div className="text-sm text-gray-500">{task.applicants}人申请</div>
                  </div>
                </div>

                {/* 位置信息 */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600">📦</span>
                    <span className="flex-1">{task.fromLocation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">🎯</span>
                    <span className="flex-1">{task.toLocation}</span>
                  </div>
                </div>
              </div>

              {/* 任务详情 */}
              <div className="p-6">
                <p className="text-gray-700 mb-4 leading-relaxed">{task.description}</p>

                {/* 任务规格 */}
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <span>⚖️</span>
                    <span>{task.weight}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📦</span>
                    <span>{task.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>⏰</span>
                    <span>{task.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={getDistanceColor(task.distance)}>📍</span>
                    <span>{task.distance} · {task.estimatedTime}</span>
                  </div>
                </div>

                {/* 发布信息 */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <span>by {task.author}</span>
                    <span>{task.timePosted}</span>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleTakeOrder(task.id)}
                    disabled={task.status === '已满'}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${task.status === '已满'
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow hover:shadow-md'
                      }`}
                  >
                    {task.status === '已满' ? '已满员' : '✅ 立即接单'}
                  </button>
                  <button
                    onClick={() => handleContact(task.id)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-all shadow hover:shadow-md"
                  >
                    💬 联系发布者
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 空状态 */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚴</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">暂无跑腿任务</h3>
            <p className="text-gray-600 mb-6">暂时没有找到匹配的跑腿任务，试试调整筛选条件</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
            >
              发布第一个需求
            </button>
          </div>
        )}

        {/* 发布需求弹窗 */}
        {showModal && <ErrandModal onClose={() => setShowModal(false)} />}
      </div>
    </div>
  )
}