'use client'

import { useState } from 'react'
import SubstituteModal from './components/SubstituteModal'

// 模拟代课任务数据
const mockTasks = [
  {
    id: 1,
    title: '周一高等数学代课',
    course: '高等数学',
    teacher: '张教授',
    campus: '主校区',
    time: '周一 第1-2节 (8:00-9:40)',
    date: '2024-01-15',
    type: '专业课',
    price: '50元',
    description: '需要认真听讲，老师可能会点名提问，最好有数学基础',
    contact: '138****1234',
    author: '数学困难户',
    status: '招募中',
    urgency: '一般',
    timePosted: '2小时前',
    applicants: 2,
    likes: 5
  },
  {
    id: 2,
    title: '周三英语课代课',
    course: '大学英语',
    teacher: '李老师',
    campus: '东校区',
    time: '周三 第3-4节 (10:10-11:50)',
    date: '2024-01-17',
    type: '水课',
    price: '30元',
    description: '课堂轻松，主要是看视频和小组讨论，只需要签到',
    contact: '139****5678',
    author: '出国党',
    status: '招募中',
    urgency: '紧急',
    timePosted: '30分钟前',
    applicants: 0,
    likes: 3
  },
  {
    id: 3,
    title: '周五体育课代课',
    course: '篮球选修',
    teacher: '王教练',
    campus: '西校区',
    time: '周五 第5-6节 (13:30-15:10)',
    date: '2024-01-19',
    type: '体育课',
    price: '40元',
    description: '会打篮球的优先，主要是分组练习和比赛',
    contact: '137****9012',
    author: '受伤的MVP',
    status: '已满',
    urgency: '一般',
    timePosted: '5小时前',
    applicants: 5,
    likes: 8
  },
  {
    id: 4,
    title: '周二计算机基础代课',
    course: '计算机基础',
    teacher: '刘教授',
    campus: '主校区',
    time: '周二 第1-2节 (8:00-9:40)',
    date: '2024-01-16',
    type: '专业课',
    price: '45元',
    description: '上机操作课，需要基本的计算机操作能力',
    contact: '136****3456',
    author: '程序员小白',
    status: '招募中',
    urgency: '一般',
    timePosted: '1小时前',
    applicants: 1,
    likes: 2
  }
]

export default function SubstitutePage() {
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'find' | 'take'>('take')
  const [selectedCampus, setSelectedCampus] = useState('全部')
  const [selectedType, setSelectedType] = useState('全部')
  const [searchTerm, setSearchTerm] = useState('')
  const [tasks, setTasks] = useState(mockTasks)

  const campuses = ['全部', '主校区', '东校区', '西校区', '新校区']
  const courseTypes = ['全部', '水课', '专业课', '体育课', '实验课']

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCampus = selectedCampus === '全部' || task.campus === selectedCampus
    const matchesType = selectedType === '全部' || task.type === selectedType

    return matchesSearch && matchesCampus && matchesType
  })

  const handleTakeOrder = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, applicants: task.applicants + 1 }
        : task
    ))
    alert('接单成功！请及时联系发布者确认详情')
  }

  const handleContact = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      navigator.clipboard.writeText(task.contact)
      alert('联系方式已复制到剪贴板！')
    }
  }

  const handleLike = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, likes: task.likes + 1 }
        : task
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '招募中': return 'bg-green-100 text-green-800 border border-green-300'
      case '已满': return 'bg-gray-100 text-gray-800 border border-gray-300'
      case '已取消': return 'bg-red-100 text-red-800 border border-red-300'
      default: return 'bg-blue-100 text-blue-800 border border-blue-300'
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case '紧急': return 'bg-red-100 text-red-800 border border-red-300'
      case '非常紧急': return 'bg-red-500 text-white border border-red-600'
      default: return 'bg-gray-100 text-gray-800 border border-gray-300'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case '水课': return 'bg-green-100 text-green-800'
      case '专业课': return 'bg-blue-100 text-blue-800'
      case '体育课': return 'bg-orange-100 text-orange-800'
      case '实验课': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">代课服务</h1>
          <p className="text-gray-600 text-lg">找代课省心，接代课赚钱</p>
        </div>

        {/* 主操作区 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* 左侧：功能描述 */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                轻松解决
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> 上课冲突</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                无论是临时有事还是想赚零花钱，这里都能满足你的需求
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">✅</div>
                  <span>快速匹配</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">💰</div>
                  <span>合理报酬</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">🔒</div>
                  <span>安全可靠</span>
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
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                📝 发布代课需求
              </button>
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('find')}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${activeTab === 'find'
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  我的需求
                </button>
                <button
                  onClick={() => setActiveTab('take')}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${activeTab === 'take'
                      ? 'bg-green-100 text-green-700 border-2 border-green-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  接单赚钱
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
                placeholder="🔍 搜索课程、老师、关键词..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
            </div>
            <select
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
              className="px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {campuses.map(campus => (
                <option key={campus} value={campus}>{campus}</option>
              ))}
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {courseTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>找到 <strong className="text-blue-600">{filteredTasks.length}</strong> 个代课任务</span>
            <span>💡 提示：及时沟通确认细节</span>
          </div>
        </div>

        {/* 任务列表 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(task.type)}`}>
                        {task.type}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{task.price}</div>
                    <div className="text-sm text-gray-500">{task.applicants}人申请</div>
                  </div>
                </div>

                {/* 课程信息 */}
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600">📚</span>
                    <span>{task.course}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">👨‍🏫</span>
                    <span>{task.teacher}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-600">📍</span>
                    <span>{task.campus}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-600">⏰</span>
                    <span>{task.time}</span>
                  </div>
                </div>
              </div>

              {/* 任务描述 */}
              <div className="p-6">
                <p className="text-gray-700 mb-4 leading-relaxed">{task.description}</p>

                {/* 任务详情 */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <span>by {task.author}</span>
                    <span>{task.timePosted}</span>
                  </div>
                  <button
                    onClick={() => handleLike(task.id)}
                    className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <span>❤️</span>
                    <span>{task.likes}</span>
                  </button>
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
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">暂无代课任务</h3>
            <p className="text-gray-600 mb-6">暂时没有找到匹配的代课任务，试试调整筛选条件</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
            >
              发布第一个需求
            </button>
          </div>
        )}

        {/* 发布需求弹窗 */}
        {showModal && <SubstituteModal onClose={() => setShowModal(false)} />}
      </div>
    </div>
  )
}