'use client'

import { useEffect, useState } from 'react'
import FriendsModal from './components/FriendsModal'

type Activity = {
  id: number
  title: string
  type: string
  activity: string
  location: string
  timeText: string
  people: string
  description: string
  author?: string
  contact: string
  participants: number
  maxParticipants: number
  urgency?: string
  timePosted?: string
  tags: string[]
  gender?: string
  createdAt?: string
}

export default function FriendsPage() {
  const [showModal, setShowModal] = useState(false)
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(false)
  const [expandedActivity, setExpandedActivity] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('全部')
  const [selectedGender, setSelectedGender] = useState('全部')

  const activityTypes = ['全部', '运动健身', '学习交流', '娱乐休闲', '兴趣社团', '其他']
  const genderOptions = ['全部', '不限', '男生', '女生']

  // 拉取活动列表
  const fetchActivities = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/friends')
      if (!res.ok) throw new Error('fetch failed')
      const data: Activity[] = await res.json()
      // map: backend 使用 timeText / maxParticipants 等字段
      setActivities(data)
    } catch (e) {
      console.error('获取活动失败', e)
      setActivities([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  const toggleExpand = (id: number) => {
    setExpandedActivity(expandedActivity === id ? null : id)
  }

  // 加入活动（前端会请求后端, 后端返回 FriendJoin -> 里面有 id）
  const handleJoin = async (activityId: number) => {
    const participantName = prompt('请输入你的称呼（例如：张三）') || '匿名'
    const participantContact = prompt('请输入联系方式（选填）') || ''

    try {
      const res = await fetch(`/api/friends/${activityId}/join?participantName=${encodeURIComponent(participantName)}&participantContact=${encodeURIComponent(participantContact)}`, {
        method: 'POST'
      })
      if (!res.ok) {
        const err = await res.text()
        throw new Error(err || '加入失败')
      }
      const joinRecord = await res.json()
      // 乐观更新对应活动的 participants +1
      setActivities(prev => prev.map(a => a.id === activityId ? { ...a, participants: (a.participants ?? 0) + 1 } : a))
      alert('已申请加入，等待组织者确认（若需要）\n报名记录 id: ' + (joinRecord.id ?? ''))
    } catch (e: any) {
      console.error('join failed', e)
      alert('加入失败：' + (e.message || e))
    }
  }

  // 删除活动
  const handleDelete = async (activityId: number) => {
    if (!confirm('确定要删除这个活动吗？此操作不可撤销。')) {
      return
    }

    try {
      const res = await fetch(`/api/friends/${activityId}`, {
        method: 'DELETE'
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText || '删除失败')
      }

      // 从本地状态中移除已删除的活动
      setActivities(prev => prev.filter(a => a.id !== activityId))
      alert('活动删除成功')
    } catch (e: any) {
      console.error('删除失败', e)
      alert('删除失败：' + (e.message || e))
    }
  }

  const handleContact = (contact: string) => {
    if (!contact) {
      alert('未提供联系方式')
      return
    }
    navigator.clipboard.writeText(contact)
    alert('联系方式已复制到剪贴板')
  }

  const filtered = activities.filter(act => {
    const matchesSearch = (
      act.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.tags?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    const matchesType = selectedType === '全部' || act.type === selectedType
    const matchesGender = selectedGender === '全部' || act.gender === selectedGender
    return matchesSearch && matchesType && matchesGender
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">交友找伴</h1>
          <p className="text-gray-600 text-lg">找到志同道合的伙伴，丰富校园生活</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="🔍 搜索活动、兴趣或关键词..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl"
              />
            </div>

            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="px-4 py-3 border border-gray-300 rounded-xl">
              {activityTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <select value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)} className="px-4 py-3 border border-gray-300 rounded-xl">
              {genderOptions.map(g => <option key={g} value={g}>{g}</option>)}
            </select>

            <button onClick={() => setShowModal(true)} className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-xl">
              👥 发布活动
            </button>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>共找到 <span className="font-bold text-teal-600">{filtered.length}</span> 个活动</div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full"></span> 紧急招募</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span> 即将满员</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {loading ? <p className="text-center">加载中...</p> : filtered.map(activity => (
            <div key={activity.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-800 cursor-pointer hover:text-teal-600" onClick={() => toggleExpand(activity.id)}>
                        {activity.title}
                      </h3>
                      {activity.urgency === '紧急' && <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">紧急</span>}
                      {activity.gender && activity.gender !== '不限' && <span className={`text-xs px-2 py-1 rounded-full font-medium ${activity.gender === '女生' ? 'bg-pink-100 text-pink-800' : 'bg-blue-100 text-blue-800'}`}>{activity.gender}专属</span>}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-medium">{activity.type}</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">{activity.activity}</span>
                      <span>⏰ {activity.createdAt ? new Date(activity.createdAt).toLocaleString() : ''}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600"><span>📍</span><span>{activity.location}</span></div>
                    <div className="flex items-center gap-2 text-gray-600"><span>⏰</span><span>{activity.timeText}</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600"><span>👥</span><span>{activity.people}</span></div>
                    <div className="flex items-center gap-2 text-gray-600"><span>📞</span><span>{activity.contact}</span></div>
                  </div>
                </div>

                <div className="mb-4"><p className="text-gray-700 leading-relaxed">{activity.description}</p></div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {activity.tags?.map((tag, idx) => <span key={idx} className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">#{tag}</span>)}
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>参与进度</span>
                    <span>{activity.maxParticipants === 0 ? `${activity.participants}人已加入` : `${activity.participants}/${activity.maxParticipants}人`}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full transition-all duration-300" style={{ width: `${activity.maxParticipants === 0 ? 100 : Math.min(100, (activity.participants / activity.maxParticipants) * 100)}%`, backgroundColor: (activity.maxParticipants > 0 && activity.participants >= activity.maxParticipants) ? '#ef4444' : '#0d9488' }}></div>
                  </div>
                  {activity.maxParticipants > 0 && activity.participants >= activity.maxParticipants && <p className="text-red-600 text-sm mt-1 text-center">已满员</p>}
                </div>

                <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                  <button
                    onClick={() => handleJoin(activity.id)}
                    disabled={activity.maxParticipants > 0 && activity.participants >= activity.maxParticipants}
                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${activity.maxParticipants > 0 && activity.participants >= activity.maxParticipants ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 text-white'}`}
                  >
                    {activity.maxParticipants > 0 && activity.participants >= activity.maxParticipants ? '已满员' : '✅ 立即加入'}
                  </button>
                  <button
                    onClick={() => handleContact(activity.contact)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium"
                  >
                    💬 联系组织者
                  </button>
                  <button
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-medium"
                  >
                    🤍 收藏活动
                  </button>
                  <button
                    onClick={() => handleDelete(activity.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium"
                  >
                    🗑️ 删除活动
                  </button>
                </div>

                {expandedActivity === activity.id && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-800 mb-3">📋 活动详情</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>活动类型：</strong>{activity.type} - {activity.activity}</p>
                      <p><strong>地点详情：</strong>{activity.location}</p>
                      <p><strong>时间安排：</strong>{activity.timeText}</p>
                      <p><strong>人数要求：</strong>{activity.people}</p>
                      <p><strong>性别要求：</strong>{activity.gender}</p>
                      <p><strong>联系方式：</strong>{activity.contact}</p>
                    </div>

                    <button onClick={() => toggleExpand(activity.id)} className="mt-3 text-teal-600 hover:text-teal-700 text-sm font-medium">收起详情</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {showModal && <FriendsModal onClose={() => setShowModal(false)} onCreated={() => { setShowModal(false); fetchActivities() }} />}
      </div>
    </div>
  )
}