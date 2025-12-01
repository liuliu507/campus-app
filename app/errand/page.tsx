// app/errand/page.tsx
'use client'

import { useState, useEffect } from 'react'
import ErrandModal from './components/ErrandModal'

// 模拟跑腿任务数据
const mockTasks = [
  {
    id: 1,
    title: '取快递服务',
    category: '取送物品',
    fromLocation: '菜鸟驿站（主校区）',
    toLocation: '学生公寓3号楼',
    price: 8.00,
    weight: '轻物（＜1kg）',
    quantity: '2个包裹',
    deadline: '今天18:00前',
    description: '有两个中通快递需要取，包裹不大，放在驿站货架上',
    contactInfo: '138****1234',
    publisherName: '快递多多',
    status: 'pending',
    urgency: '一般',
    timeAgo: '30分钟前',
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
    price: 15.00,
    weight: '文件',
    quantity: '1份重要文件',
    deadline: '紧急 · 1小时内',
    description: '有一份紧急文件需要送到图书馆，关系到毕业材料，非常紧急！',
    contactInfo: '139****5678',
    publisherName: '毕业生小王',
    status: 'pending',
    urgency: '紧急',
    timeAgo: '15分钟前',
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
    price: 12.00,
    weight: '饮品',
    quantity: '4杯奶茶',
    deadline: '今天16:00前',
    description: '想喝喜茶的多肉葡萄，买4杯，可以AA跑腿费，要冰的少糖',
    contactInfo: '137****9012',
    publisherName: '奶茶爱好者',
    status: 'accepted',
    urgency: '一般',
    timeAgo: '2小时前',
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
    price: 10.00,
    weight: '中等（1-5kg）',
    quantity: '生活用品若干',
    deadline: '今晚20:00前',
    description: '需要购买：洗发水1瓶、纸巾2提、泡面5包、零食若干',
    contactInfo: '136****3456',
    publisherName: '宅宿舍',
    status: 'pending',
    urgency: '一般',
    timeAgo: '1小时前',
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
    price: 6.00,
    weight: '文件',
    quantity: '50页资料',
    deadline: '今天14:00前',
    description: '需要打印50页复习资料，双面打印，装订成册',
    contactInfo: '135****7890',
    publisherName: '考试党',
    status: 'pending',
    urgency: '一般',
    timeAgo: '45分钟前',
    applicants: 0,
    distance: '0.5km',
    estimatedTime: '10分钟'
  }
]

interface ErrandTask {
  id: number;
  title: string;
  category: string;
  fromLocation: string;
  toLocation: string;
  price: number;
  weight: string;
  quantity: string;
  deadline: string;
  description: string;
  contactInfo: string;
  publisherName: string;
  status: string;
  urgency: string;
  timeAgo: string;
  applicants: number;
  distance: string;
  estimatedTime: string;
}

export default function ErrandPage() {
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'my' | 'nearby' | 'urgent'>('all')
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [searchTerm, setSearchTerm] = useState('')
  const [tasks, setTasks] = useState<ErrandTask[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const categories = ['全部', '取送物品', '文件传递', '餐饮代购', '商品代购', '文印服务', '其他']
  const urgencyLevels = ['全部', '一般', '紧急', '非常紧急']

  // 加载跑腿任务
  const loadTasks = async () => {
    try {
      setLoading(true)

      // 真实API调用
      const response = await fetch('https://campus-backend-1-uo30.onrender.com/api/errands')
      if (response.ok) {
        const data = await response.json()
        setTasks(data)
      } else {
        // 如果API失败，使用模拟数据
        console.log('API调用失败，使用模拟数据')
        setTasks(mockTasks)
      }

    } catch (error) {
      console.error('加载任务失败:', error)
      // API失败时使用模拟数据
      setTasks(mockTasks)
    } finally {
      setLoading(false)
    }
  }

  // 页面加载时获取数据
  useEffect(() => {
    loadTasks()
  }, [])

  // 获取当前用户发布的任务（临时逻辑，后面可以改成真实用户系统）
  const getMyTasks = () => {
    // 临时逻辑：显示所有状态为 pending 的任务作为"我的任务"
    return tasks.filter(task => task.status === 'pending')
  }

  // 获取可接单的任务
  const getAvailableTasks = () => {
    return tasks.filter(task => task.status === 'pending')
  }

  // 根据当前标签获取任务列表
  const getCurrentTasks = () => {
    switch (activeTab) {
      case 'my':
        return getMyTasks()
      case 'nearby':
        return tasks.filter(task => parseFloat(task.distance) <= 1)
      case 'urgent':
        return tasks.filter(task => task.urgency === '紧急')
      default:
        return tasks
    }
  }

  // 删除任务
  const handleDeleteTask = async (taskId: number) => {
    if (!confirm('确定要删除这个跑腿需求吗？此操作不可撤销。')) {
      return
    }

    setDeletingId(taskId)

    try {
      console.log(`🗑️ 删除跑腿任务 ID: ${taskId}`)

      const response = await fetch(`https://campus-backend-1-uo30.onrender.com/api/errands/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      console.log('📡 删除响应状态:', response.status)
      console.log('📡 删除响应状态文本:', response.statusText)

      if (response.ok) {
        const result = await response.json()
        console.log('✅ 删除成功:', result)

        // 从列表中移除任务
        setTasks(prev => prev.filter(task => task.id !== taskId))
        alert('跑腿需求删除成功！')
      } else {
        // 获取详细的错误信息
        const errorText = await response.text()
        console.error('❌ 删除失败 - 状态:', response.status)
        console.error('❌ 删除失败 - 错误信息:', errorText)

        // 尝试解析错误信息
        try {
          const errorData = JSON.parse(errorText)
          console.error('❌ 删除失败 - 解析后的错误:', errorData)
          alert(`删除失败: ${errorData.message || '未知错误'}`)
        } catch {
          console.error('❌ 删除失败 - 原始错误文本:', errorText)
          alert(`删除失败: ${errorText || '未知错误'}`)
        }
      }
    } catch (err: any) {
      console.error('❌ 删除任务失败:', err)
      alert(`删除失败: ${err.message}`)
    } finally {
      setDeletingId(null)
    }
  }
  const currentTasks = getCurrentTasks()

  const filteredTasks = currentTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.fromLocation.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === '全部' || task.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // 发布跑腿任务 - 修改后的版本，移除 publisherId
  const handlePublish = async (formData: any) => {
    try {
      // 转换表单数据为API需要的格式 - 移除 publisherId
      const requestData = {
        title: formData.title,
        category: formData.category,
        fromLocation: formData.fromLocation,
        toLocation: formData.toLocation,
        price: parseFloat(formData.price.replace('元', '')) || parseFloat(formData.price) || 0,
        weight: formData.weight,
        quantity: formData.quantity,
        deadline: formData.deadline,
        description: formData.description,
        contactInfo: formData.contact,
        urgency: formData.urgency
      }

      console.log('发布跑腿需求:', requestData)

      // 真实API调用
      const response = await fetch('https://campus-backend-1-uo30.onrender.com/api/errands', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      console.log('API响应状态:', response.status)

      if (response.ok) {
        let newTask;
        try {
          newTask = await response.json();
        } catch (parseError) {
          console.warn('API返回的不是JSON，使用请求数据创建任务');
          newTask = {
            ...requestData,
            id: Date.now(), // 生成唯一ID
            publisherName: '匿名用户',
            status: 'pending',
            timeAgo: '刚刚',
            applicants: 0,
            distance: '1.0km',
            estimatedTime: '20分钟'
          };
        }

        setTasks(prev => [newTask, ...prev]);
        alert('跑腿需求发布成功！');
        setShowModal(false);

        // 自动切换到"我的需求"标签
        setActiveTab('my');
      } else {
        // 如果API失败，使用本地数据
        console.log('API发布失败，使用本地存储');
        const localTask = {
          ...requestData,
          id: Date.now(),
          publisherName: '匿名用户',
          status: 'pending',
          timeAgo: '刚刚',
          applicants: 0,
          distance: '1.0km',
          estimatedTime: '20分钟'
        };
        setTasks(prev => [localTask, ...prev]);
        alert('跑腿需求发布成功！(本地存储)');
        setShowModal(false);
        setActiveTab('my');
      }

    } catch (error) {
      console.error('发布失败:', error);
      // 即使API失败，也使用本地数据
      const localTask = {
        ...formData,
        id: Date.now(),
        publisherName: '匿名用户',
        status: 'pending',
        timeAgo: '刚刚',
        applicants: 0,
        distance: '1.0km',
        estimatedTime: '20分钟',
        price: parseFloat(formData.price.replace('元', '')) || parseFloat(formData.price) || 0
      };

      setTasks(prev => [localTask, ...prev]);
      alert('跑腿需求发布成功！(本地模式)');
      setShowModal(false);
      setActiveTab('my');
    }
  }

  // 接单 - 修改后的版本
  const handleTakeOrder = async (taskId: number) => {
    try {
      // 真实API调用 - 移除 acceptorId 参数
      const response = await fetch(`https://campus-backend-1-uo30.onrender.com/api/errands/${taskId}/accept`, {
        method: 'POST',
      })

      if (response.ok) {
        const updatedTask = await response.json()
        setTasks(prev => prev.map(task =>
          task.id === taskId ? updatedTask : task
        ))
        alert('接单成功！请及时联系发布者确认细节')
      } else {
        // 如果API失败，本地更新状态
        setTasks(prev => prev.map(task =>
          task.id === taskId ? { ...task, status: 'accepted' } : task
        ))
        alert('接单成功！(本地模式)')
      }

    } catch (error) {
      console.error('接单失败:', error)
      // 即使API失败，也本地更新状态
      setTasks(prev => prev.map(task =>
        task.id === taskId ? { ...task, status: 'accepted' } : task
      ))
      alert('接单成功！(本地模式)')
    }
  }

  const handleContact = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      navigator.clipboard.writeText(task.contactInfo)
      alert('联系方式已复制到剪贴板！')
    }
  }

  // 取消任务
  const handleCancelTask = (taskId: number) => {
    if (confirm('确定要取消这个跑腿需求吗？')) {
      setTasks(prev => prev.map(task =>
        task.id === taskId
          ? { ...task, status: 'cancelled' }
          : task
      ))
      alert('任务已取消')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-green-100 text-green-800 border border-green-300'
      case 'accepted': return 'bg-blue-100 text-blue-800 border border-blue-300'
      case 'cancelled': return 'bg-red-100 text-red-800 border border-red-300'
      case 'completed': return 'bg-purple-100 text-purple-800 border border-purple-300'
      default: return 'bg-yellow-100 text-yellow-800 border border-yellow-300'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '招募中'
      case 'accepted': return '已接单'
      case 'cancelled': return '已取消'
      case 'completed': return '已完成'
      default: return '未知状态'
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

  const getTabDisplayName = (tab: string) => {
    switch (tab) {
      case 'all': return '全部任务'
      case 'my': return '我的需求'
      case 'nearby': return '附近任务'
      case 'urgent': return '紧急任务'
      default: return tab
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-cyan-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
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
                {activeTab === 'my' ? '管理我的' : '校园生活'}
                <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  {activeTab === 'my' ? ' 跑腿需求' : ' 更轻松'}
                </span>
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                {activeTab === 'my'
                  ? '查看和管理你发布的所有跑腿需求'
                  : '取快递、送文件、买奶茶... 校园跑腿，让生活更便捷'
                }
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                {activeTab === 'my' ? (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">📊</div>
                      <span>需求状态</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">👥</div>
                      <span>申请人数</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">🔄</div>
                      <span>灵活管理</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">🗑️</div>
                      <span>删除管理</span>
                    </div>
                  </>
                ) : (
                  <>
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
                  </>
                )}
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
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`py-3 px-4 rounded-xl font-semibold transition-all ${activeTab === 'all'
                    ? 'bg-green-100 text-green-700 border-2 border-green-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  全部 ({tasks.length})
                </button>
                <button
                  onClick={() => setActiveTab('my')}
                  className={`py-3 px-4 rounded-xl font-semibold transition-all ${activeTab === 'my'
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  我的 ({getMyTasks().length})
                </button>
                <button
                  onClick={() => setActiveTab('nearby')}
                  className={`py-3 px-4 rounded-xl font-semibold transition-all ${activeTab === 'nearby'
                    ? 'bg-orange-100 text-orange-700 border-2 border-orange-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  附近 ({tasks.filter(t => parseFloat(t.distance) <= 1).length})
                </button>
                <button
                  onClick={() => setActiveTab('urgent')}
                  className={`py-3 px-4 rounded-xl font-semibold transition-all ${activeTab === 'urgent'
                    ? 'bg-red-100 text-red-700 border-2 border-red-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  紧急 ({tasks.filter(t => t.urgency === '紧急').length})
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
                placeholder={activeTab === 'my'
                  ? "🔍 在我的需求中搜索..."
                  : "🔍 搜索跑腿任务、地点、物品..."
                }
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
            <span>
              {getTabDisplayName(activeTab)} ·
              <strong className="text-green-600"> {filteredTasks.length} </strong>
              个任务
            </span>
            <span>💡 提示：{activeTab === 'my' ? '及时处理申请信息' : '接单前请确认时间和地点'}</span>
          </div>
        </div>

        {/* 任务列表 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 relative">
              {/* 删除按钮 - 只在"我的需求"页面显示 */}
              {activeTab === 'my' && (
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  disabled={deletingId === task.id}
                  className="absolute top-3 right-3 z-10 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="删除需求"
                >
                  {deletingId === task.id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  )}
                </button>
              )}

              {/* 任务头部 */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {getStatusText(task.status)}
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
                    <div className="text-2xl font-bold text-green-600">¥{task.price}</div>
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
                    <span>by {task.publisherName}</span>
                    <span>{task.timeAgo}</span>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex space-x-3">
                  {activeTab === 'my' ? (
                    // 我的需求页面的按钮
                    <>
                      <button
                        onClick={() => handleCancelTask(task.id)}
                        disabled={task.status === 'cancelled' || task.status === 'accepted'}
                        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${task.status === 'cancelled' || task.status === 'accepted'
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow hover:shadow-md'
                          }`}
                      >
                        {task.status === 'cancelled' ? '已取消' :
                          task.status === 'accepted' ? '已接单' : '❌ 取消需求'}
                      </button>
                      <button
                        onClick={() => handleContact(task.id)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-all shadow hover:shadow-md"
                      >
                        📋 查看申请
                      </button>
                    </>
                  ) : (
                    // 其他页面的按钮
                    <>
                      <button
                        onClick={() => handleTakeOrder(task.id)}
                        disabled={task.status === 'accepted' || task.status === 'cancelled'}
                        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${task.status === 'accepted' || task.status === 'cancelled'
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow hover:shadow-md'
                          }`}
                      >
                        {task.status === 'accepted' ? '已接单' :
                          task.status === 'cancelled' ? '已取消' : '✅ 立即接单'}
                      </button>
                      <button
                        onClick={() => handleContact(task.id)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-all shadow hover:shadow-md"
                      >
                        💬 联系发布者
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 空状态 */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">
              {activeTab === 'my' ? '📝' : '🚴'}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {activeTab === 'my' ? '暂无跑腿需求' : '暂无跑腿任务'}
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'my'
                ? '您还没有发布任何跑腿需求'
                : '暂时没有找到匹配的跑腿任务，试试调整筛选条件'
              }
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
            >
              {activeTab === 'my' ? '发布跑腿需求' : '发布第一个需求'}
            </button>
          </div>
        )}

        {/* 发布需求弹窗 */}
        {showModal && (
          <ErrandModal
            onClose={() => setShowModal(false)}
            onPublish={handlePublish}
          />
        )}
      </div>
    </div>
  )
}