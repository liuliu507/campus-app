'use client'

import { useState } from 'react'
import HelpModal from './components/HelpModal'

// 模拟求助数据
const mockHelps = [
  {
    id: 1,
    title: '求问图书馆哪个自习室最安静？',
    type: '打听',
    category: '学习相关',
    content: '最近需要准备重要考试，想知道图书馆哪个区域最安静，插座比较多？',
    author: '考研党',
    reward: '0',
    urgency: '一般',
    answers: [
      {
        id: 1,
        content: '推荐去四楼东侧，那边人少而且每个座位都有插座，很安静！',
        author: '图书馆常客',
        likes: 8,
        time: '1小时前',
        accepted: false
      },
      {
        id: 2,
        content: '三楼的研究生专区也很不错，需要学生证登记进入',
        author: '研究生学长',
        likes: 5,
        time: '2小时前',
        accepted: false
      }
    ],
    views: 45,
    time: '3小时前',
    resolved: false
  },
  {
    id: 2,
    title: '急！学生证丢了怎么补办？',
    type: '求助',
    category: '行政事务',
    content: '今天发现学生证不见了，请问补办流程是什么？需要哪些材料？多久能办好？比较着急！',
    author: '小迷糊',
    reward: '20元',
    urgency: '紧急',
    answers: [
      {
        id: 1,
        content: '先去行政楼301挂失，然后带身份证和一寸照片到302补办，一般3个工作日就能好。',
        author: '行政助理',
        likes: 12,
        time: '30分钟前',
        accepted: true
      }
    ],
    views: 89,
    time: '1小时前',
    resolved: true
  },
  {
    id: 3,
    title: '求推荐好用的数学辅导书',
    type: '打听',
    category: '学习相关',
    content: '高等数学有点跟不上了，求学长学姐推荐一些适合自学的辅导书，最好有详细解析的。',
    author: '数学小白',
    reward: '0',
    urgency: '一般',
    answers: [],
    views: 23,
    time: '5小时前',
    resolved: false
  },
  {
    id: 4,
    title: '宿舍网络突然连不上了',
    type: '求助',
    category: '生活服务',
    content: '从昨晚开始宿舍WiFi就一直连接失败，重启路由器也没用，有同学知道怎么解决吗？',
    author: '网瘾少年',
    reward: '10元',
    urgency: '紧急',
    answers: [
      {
        id: 1,
        content: '可能是网络端口问题，打电话给网络中心报修吧：88881234',
        author: '网络委员',
        likes: 3,
        time: '10分钟前',
        accepted: false
      }
    ],
    views: 67,
    time: '2小时前',
    resolved: false
  }
]

export default function HelpPage() {
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'help' | 'find'>('find')
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [selectedStatus, setSelectedStatus] = useState('全部')
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)

  const categories = ['全部', '学习相关', '行政事务', '生活服务', '校园活动', '其他']
  const statusTypes = ['全部', '已解决', '未解决', '有悬赏']

  const filteredHelps = mockHelps.filter(help => {
    const matchesSearch = help.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      help.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === '全部' || help.category === selectedCategory
    const matchesStatus =
      selectedStatus === '全部' ||
      (selectedStatus === '已解决' && help.resolved) ||
      (selectedStatus === '未解决' && !help.resolved) ||
      (selectedStatus === '有悬赏' && help.reward !== '0')

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleAnswer = (questionId: number) => {
    console.log('回答问题:', questionId)
    // 这里后续会实现回答功能
  }

  const handleLikeAnswer = (questionId: number, answerId: number) => {
    console.log('点赞回答:', questionId, answerId)
    // 这里后续会连接后端API
  }

  const toggleExpand = (questionId: number) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">求助打听</h1>
          <p className="text-gray-600 text-lg">互帮互助，校园问题一网打尽</p>
        </div>

        {/* 搜索和筛选栏 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* 搜索框 */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="🔍 搜索求助问题..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* 分类筛选 */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* 状态筛选 */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {statusTypes.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            {/* 发布按钮 */}
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl whitespace-nowrap transition-colors"
            >
              💬 发布求助
            </button>
          </div>

          {/* 统计信息 */}
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>
              共找到 <span className="font-bold text-indigo-600">{filteredHelps.length}</span> 条求助信息
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                已解决
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                未解决
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                有悬赏
              </span>
            </div>
          </div>
        </div>

        {/* 求助列表 */}
        <div className="space-y-6">
          {filteredHelps.map((help) => (
            <div key={help.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="p-6">
                {/* 问题头部 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3
                        className="text-xl font-bold text-gray-800 cursor-pointer hover:text-indigo-600"
                        onClick={() => toggleExpand(help.id)}
                      >
                        {help.title}
                      </h3>
                      {help.resolved && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                          已解决
                        </span>
                      )}
                      {help.urgency === '紧急' && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                          紧急
                        </span>
                      )}
                      {help.reward !== '0' && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                          💰 悬赏 {help.reward}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${help.type === '求助'
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-blue-100 text-blue-800'
                        }`}>
                        {help.type}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {help.category}
                      </span>
                      <span>by {help.author}</span>
                      <span>👁️ {help.views} 浏览</span>
                      <span>⏰ {help.time}</span>
                    </div>
                  </div>
                </div>

                {/* 问题内容 */}
                <div className="mb-4">
                  <p className="text-gray-700 leading-relaxed">{help.content}</p>
                </div>

                {/* 回答预览 */}
                {help.answers.length > 0 && (
                  <div className="border-t pt-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">
                        💡 回答 ({help.answers.length})
                      </h4>
                      {!expandedQuestion && (
                        <button
                          onClick={() => toggleExpand(help.id)}
                          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                        >
                          查看全部
                        </button>
                      )}
                    </div>

                    {/* 回答列表 */}
                    <div className="space-y-3">
                      {help.answers.slice(0, expandedQuestion === help.id ? undefined : 1).map((answer) => (
                        <div key={answer.id} className={`bg-gray-50 rounded-xl p-4 ${answer.accepted ? 'border-2 border-green-200' : ''
                          }`}>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <p className="text-gray-700">{answer.content}</p>
                            </div>
                            {answer.accepted && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium ml-2">
                                采纳
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-4">
                              <span>by {answer.author}</span>
                              <span>{answer.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleLikeAnswer(help.id, answer.id)}
                                className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
                              >
                                <span>👍</span>
                                <span>{answer.likes}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 操作按钮 */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleAnswer(help.id)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                      ✍️ 回答
                    </button>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                      🤍 关注
                    </button>
                  </div>

                  {expandedQuestion === help.id && (
                    <button
                      onClick={() => toggleExpand(help.id)}
                      className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                      收起
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 发布求助弹窗 */}
        {showModal && (
          <HelpModal
            onClose={() => setShowModal(false)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
      </div>
    </div>
  )
}