'use client'

import { useState } from 'react'
import FriendsModal from './components/FriendsModal'

// 模拟活动数据
const mockActivities = [
  {
    id: 1,
    title: '寻找羽毛球搭子',
    type: '运动健身',
    activity: '羽毛球',
    location: '学校体育馆',
    time: '周末下午',
    people: '2-4人',
    description: '想找几个一起打羽毛球的伙伴，男女不限，新手老手都欢迎！',
    author: '运动爱好者',
    contact: '138****1234',
    participants: 3,
    maxParticipants: 4,
    urgency: '一般',
    timePosted: '2小时前',
    tags: ['羽毛球', '运动', '健身'],
    gender: '不限'
  },
  {
    id: 2,
    title: '考研学习小组招人',
    type: '学习交流',
    activity: '考研备考',
    location: '图书馆研讨室',
    time: '每天晚7-10点',
    people: '3-5人',
    description: '组建考研学习小组，互相监督，分享资料，一起进步！',
    author: '考研党小明',
    contact: '139****5678',
    participants: 2,
    maxParticipants: 5,
    urgency: '一般',
    timePosted: '5小时前',
    tags: ['考研', '学习', '小组'],
    gender: '不限'
  },
  {
    id: 3,
    title: '急！今晚电影搭子',
    type: '娱乐休闲',
    activity: '看电影',
    location: '万达影城',
    time: '今晚7点',
    people: '1-2人',
    description: '临时多了一张电影票，找个人一起看《热辣滚烫》，AA制！',
    author: '电影迷',
    contact: '137****9012',
    participants: 1,
    maxParticipants: 2,
    urgency: '紧急',
    timePosted: '30分钟前',
    tags: ['电影', '今晚', 'AA制'],
    gender: '不限'
  },
  {
    id: 4,
    title: '女生专属 - 瑜伽练习',
    type: '运动健身',
    activity: '瑜伽',
    location: '舞蹈教室',
    time: '每周三、五晚',
    people: '4-8人',
    description: '寻找一起练习瑜伽的女生小伙伴，有基础教学，放松身心～',
    author: '瑜伽达人',
    contact: '136****3456',
    participants: 5,
    maxParticipants: 8,
    urgency: '一般',
    timePosted: '1天前',
    tags: ['瑜伽', '女生', '放松'],
    gender: '女生'
  },
  {
    id: 5,
    title: '校园摄影爱好者聚集',
    type: '兴趣社团',
    activity: '摄影',
    location: '校园各处',
    time: '周末全天',
    people: '不限',
    description: '欢迎喜欢摄影的同学加入，一起扫街、拍风景、交流技巧！',
    author: '摄影师小王',
    contact: '135****7890',
    participants: 12,
    maxParticipants: 0, // 0表示不限
    urgency: '一般',
    timePosted: '2天前',
    tags: ['摄影', '拍照', '艺术'],
    gender: '不限'
  }
]

export default function FriendsPage() {
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'find' | 'organize'>('find')
  const [selectedType, setSelectedType] = useState('全部')
  const [selectedGender, setSelectedGender] = useState('全部')
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedActivity, setExpandedActivity] = useState<number | null>(null)

  const activityTypes = ['全部', '运动健身', '学习交流', '娱乐休闲', '兴趣社团', '其他']
  const genderOptions = ['全部', '不限', '男生', '女生']

  const filteredActivities = mockActivities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === '全部' || activity.type === selectedType
    const matchesGender = selectedGender === '全部' || activity.gender === selectedGender

    return matchesSearch && matchesType && matchesGender
  })

  const handleJoin = (activityId: number) => {
    console.log('参加活动:', activityId)
    // 这里后续会连接后端API
    alert('申请已发送！请等待组织者确认')
  }

  const handleContact = (activityId: number) => {
    console.log('联系组织者:', activityId)
    const activity = mockActivities.find(a => a.id === activityId)
    if (activity) {
      navigator.clipboard.writeText(activity.contact)
      alert('联系方式已复制到剪贴板！')
    }
  }

  const toggleExpand = (activityId: number) => {
    setExpandedActivity(expandedActivity === activityId ? null : activityId)
  }

  const getParticipantsText = (participants: number, maxParticipants: number) => {
    if (maxParticipants === 0) return `${participants}人已加入`
    return `${participants}/${maxParticipants}人`
  }

  const getProgressPercentage = (participants: number, maxParticipants: number) => {
    if (maxParticipants === 0) return 100
    return (participants / maxParticipants) * 100
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">交友找伴</h1>
          <p className="text-gray-600 text-lg">找到志同道合的伙伴，丰富校园生活</p>
        </div>

        {/* 搜索和筛选栏 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* 搜索框 */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="🔍 搜索活动、兴趣或关键词..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* 类型筛选 */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {activityTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* 性别筛选 */}
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {genderOptions.map(gender => (
                <option key={gender} value={gender}>{gender}</option>
              ))}
            </select>

            {/* 发布按钮 */}
            <button
              onClick={() => setShowModal(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-xl whitespace-nowrap transition-colors"
            >
              👥 发布活动
            </button>
          </div>

          {/* 统计信息 */}
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>
              共找到 <span className="font-bold text-teal-600">{filteredActivities.length}</span> 个活动
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                紧急招募
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                即将满员
              </span>
            </div>
          </div>
        </div>

        {/* 活动列表 */}
        <div className="space-y-6">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="p-6">
                {/* 活动头部 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3
                        className="text-xl font-bold text-gray-800 cursor-pointer hover:text-teal-600"
                        onClick={() => toggleExpand(activity.id)}
                      >
                        {activity.title}
                      </h3>
                      {activity.urgency === '紧急' && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                          紧急
                        </span>
                      )}
                      {activity.gender !== '不限' && (
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${activity.gender === '女生'
                            ? 'bg-pink-100 text-pink-800'
                            : 'bg-blue-100 text-blue-800'
                          }`}>
                          {activity.gender}专属
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-medium">
                        {activity.type}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {activity.activity}
                      </span>
                      <span>by {activity.author}</span>
                      <span>⏰ {activity.timePosted}</span>
                    </div>
                  </div>
                </div>

                {/* 活动基本信息 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span>📍</span>
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span>⏰</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span>👥</span>
                      <span>{activity.people}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span>📞</span>
                      <span>{activity.contact}</span>
                    </div>
                  </div>
                </div>

                {/* 活动描述 */}
                <div className="mb-4">
                  <p className="text-gray-700 leading-relaxed">{activity.description}</p>
                </div>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {activity.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* 参与进度 */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>参与进度</span>
                    <span>{getParticipantsText(activity.participants, activity.maxParticipants)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${getProgressPercentage(activity.participants, activity.maxParticipants)}%`,
                        backgroundColor: activity.maxParticipants > 0 &&
                          activity.participants >= activity.maxParticipants
                          ? '#ef4444'
                          : '#0d9488'
                      }}
                    ></div>
                  </div>
                  {activity.maxParticipants > 0 && activity.participants >= activity.maxParticipants && (
                    <p className="text-red-600 text-sm mt-1 text-center">已满员</p>
                  )}
                </div>

                {/* 操作按钮 */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleJoin(activity.id)}
                    disabled={activity.maxParticipants > 0 && activity.participants >= activity.maxParticipants}
                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${activity.maxParticipants > 0 && activity.participants >= activity.maxParticipants
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-teal-600 hover:bg-teal-700 text-white'
                      }`}
                  >
                    {activity.maxParticipants > 0 && activity.participants >= activity.maxParticipants
                      ? '已满员'
                      : '✅ 立即加入'}
                  </button>
                  <button
                    onClick={() => handleContact(activity.id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                  >
                    💬 联系组织者
                  </button>
                  <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                    🤍 收藏活动
                  </button>
                </div>

                {/* 扩展信息 */}
                {expandedActivity === activity.id && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-800 mb-3">📋 活动详情</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>活动类型：</strong>{activity.type} - {activity.activity}</p>
                      <p><strong>地点详情：</strong>{activity.location}</p>
                      <p><strong>时间安排：</strong>{activity.time}</p>
                      <p><strong>人数要求：</strong>{activity.people}</p>
                      <p><strong>性别要求：</strong>{activity.gender}</p>
                      <p><strong>联系方式：</strong>{activity.contact}</p>
                    </div>

                    <button
                      onClick={() => toggleExpand(activity.id)}
                      className="mt-3 text-teal-600 hover:text-teal-700 text-sm font-medium"
                    >
                      收起详情
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 发布活动弹窗 */}
        {showModal && (
          <FriendsModal
            onClose={() => setShowModal(false)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
      </div>
    </div>
  )
}