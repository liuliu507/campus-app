'use client'

import { useState, useEffect } from 'react'
import SubstituteModal from './components/SubstituteModal'

interface Demand {
  id: string
  title: string
  campus: string
  genderRequirement: string
  classTime: string
  classDate: string
  courseType: string
  reward: string
  description: string
  contactInfo: string
  urgency: string
  teacher?: string
  status: 'pending' | 'accepted' | 'completed'
  createdAt: string
  // 兼容现有代码的字段
  type: string
  price: string
  time: string
  date: string
  gender: string
  contact: string
}

export default function SubstitutePage() {
  const [demands, setDemands] = useState<Demand[]>([])
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'all' | 'my'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCampus, setFilterCampus] = useState('全部')
  const [filterType, setFilterType] = useState('全部')

  /* ---------- 加载数据 ---------- */
  const loadDemands = async () => {
    try {
      console.log('开始加载代课需求数据...')
      const response = await fetch('https://campus-backend-1-uo30.onrender.com/api/class-substitution')

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const demandsData = await response.json()
      console.log('成功加载数据:', demandsData)

      const formattedData = demandsData.map((demand: any) => ({
        ...demand,
        type: demand.courseType || '水课',
        price: demand.reward || '0元',
        time: demand.classTime || '',
        date: demand.classDate || '',
        gender: demand.genderRequirement || '不限',
        contact: demand.contactInfo || ''
      }))
      setDemands(formattedData)
    } catch (error) {
      console.error('加载代课需求数据失败:', error)
      setDemands([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDemands()
  }, [])

  /* ---------- 发布需求 ---------- */
  const handlePublish = async (formData: any) => {
    try {
      console.log('开始发布需求:', formData)
      const publishData = { ...formData, publisherId: 1001 } // 固定用户ID

      const response = await fetch('https://campus-backend-1-uo30.onrender.com/api/class-substitution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(publishData)
      })

      if (!response.ok) throw new Error(`发布失败，状态码: ${response.status}`)

      const newDemand = await response.json()
      console.log('发布成功，新需求:', newDemand)

      const formattedDemand = {
        ...newDemand,
        type: newDemand.courseType || '水课',
        price: newDemand.reward || '0元',
        time: newDemand.classTime || '',
        date: newDemand.classDate || '',
        gender: newDemand.genderRequirement || '不限',
        contact: newDemand.contactInfo || ''
      }
      setDemands(prev => [...prev, formattedDemand])
      setShowModal(false)
      alert('代课需求发布成功！')
    } catch (error) {
      console.error('发布失败:', error)
      alert('发布失败，请重试')
      throw error
    }
  }

  /* ---------- 删除需求 ---------- */
  const handleDeleteDemand = async (id: string) => {
    if (!confirm('确定要删除这个代课需求吗？')) return
    try {
      // 后端暂无该接口，先给出提示；后续把路径改成 /api/class-substitution/{id} 即可
      alert('删除功能暂未开放，等待后端支持')
      // const response = await fetch(`https://campus-backend-1-uo30.onrender.com/api/class-substitution/${id}`, {
      //   method: 'DELETE'
      // })
      // if (response.ok) {
      //   setDemands(prev => prev.filter(d => d.id !== id))
      //   alert('删除成功！')
      // } else {
      //   throw new Error('删除失败')
      // }
    } catch (error) {
      console.error('删除失败:', error)
      alert('删除失败，请重试')
    }
  }

  /* ---------- 接单 ---------- */
  const handleAcceptDemand = async (id: string) => {
    try {
      const response = await fetch(
        `https://campus-backend-1-uo30.onrender.com/api/class-substitution/${id}/accept?acceptorId=1001`,
        { method: 'POST' }
      )

      if (!response.ok) throw new Error('接单失败')

      const updatedDemand = await response.json()
      const formattedDemand = {
        ...updatedDemand,
        type: updatedDemand.courseType || '水课',
        price: updatedDemand.reward || '0元',
        time: updatedDemand.classTime || '',
        date: updatedDemand.classDate || '',
        gender: updatedDemand.genderRequirement || '不限',
        contact: updatedDemand.contactInfo || ''
      }
      setDemands(prev => prev.map(d => (d.id === id ? formattedDemand : d)))
      alert('接单成功！请及时联系需求方')
    } catch (error) {
      console.error('接单失败:', error)
      alert('接单失败，请重试')
    }
  }

  /* ---------- 搜索/过滤 ---------- */
  const filteredDemands = demands.filter(demand => {
    const matchesSearch =
      demand.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demand.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCampus = filterCampus === '全部' || demand.campus === filterCampus
    const matchesType = filterType === '全部' || demand.type === filterType
    const isMyDemand = activeTab === 'my'
    return matchesSearch && matchesCampus && matchesType && (!isMyDemand || demand.status === 'pending')
  })

  const campuses = ['全部', '桃花坪', '二里半', '南苑', '天马', '咸嘉湖', '江边']
  const courseTypes = ['全部', '水课', '专业课', '体育课', '实验课']

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  /* ---------- 渲染 ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">代课服务</h1>
          <p className="text-blue-100 text-lg mb-8">找代课省心，接代课赚钱，轻松解决上课冲突</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl mb-2">🚀</div>
              <h3 className="font-semibold mb-1">快速匹配</h3>
              <p className="text-blue-100 text-sm">智能推荐合适人选</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl mb-2">🔒</div>
              <h3 className="font-semibold mb-1">安全可靠</h3>
              <p className="text-blue-100 text-sm">实名认证保障安全</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="font-semibold mb-1">合理报酬</h3>
              <p className="text-blue-100 text-sm">公平定价双方满意</p>
            </div>
          </div>
        </div>
      </div>

      {/* 主体 */}
      <div className="max-w-6xl mx-auto px-4 py-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          {/* 标签 & 发布 */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'all' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                全部需求 ({demands.length})
              </button>
              <button
                onClick={() => setActiveTab('my')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'my' ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                我的需求 ({demands.filter(d => d.status === 'pending').length})
              </button>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              📝 发布代课需求
            </button>
          </div>

          {/* 搜索/筛选 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="搜索课程、老师、关键词..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={filterCampus}
              onChange={e => setFilterCampus(e.target.value)}
              className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {campuses.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {courseTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* 列表 */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">找到 {filteredDemands.length} 个代课任务</h3>
              <p className="text-sm text-gray-500">提示：及时沟通确认细节</p>
            </div>
            {filteredDemands.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">暂无代课任务</h3>
                <p className="text-gray-500 mb-6">暂时没有找到匹配的代课任务，试试调整筛选条件</p>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                >
                  发布第一个需求
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredDemands.map(d => (
                  <div key={d.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-1">{d.title}</h4>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{d.campus}</span>
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded">{d.type}</span>
                          <span
                            className={`px-2 py-1 rounded ${d.urgency === '非常紧急'
                                ? 'bg-red-100 text-red-700'
                                : d.urgency === '紧急'
                                  ? 'bg-orange-100 text-orange-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                          >
                            {d.urgency}
                          </span>
                          <span
                            className={`px-2 py-1 rounded ${d.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : d.status === 'accepted'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                          >
                            {d.status === 'pending' ? '待接单' : d.status === 'accepted' ? '已接单' : '已完成'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600 mb-1">{d.price}</div>
                        <div className="text-sm text-gray-500">{new Date(d.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                      <div><span className="font-medium">时间：</span>{d.time} | {d.date}</div>
                      <div><span className="font-medium">性别要求：</span>{d.gender}</div>
                    </div>

                    <p className="text-gray-700 mb-4 whitespace-pre-line">{d.description}</p>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500"><span className="font-medium">联系方式：</span>{d.contact}</div>
                      <div className="flex gap-2">
                        {activeTab === 'all' && d.status === 'pending' && (
                          <button
                            onClick={() => handleAcceptDemand(d.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            🎯 立即接单
                          </button>
                        )}
                        {activeTab === 'my' && (
                          <button
                            onClick={() => handleDeleteDemand(d.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            删除
                          </button>
                        )}
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                          联系详情
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 弹窗 */}
      {showModal && <SubstituteModal onClose={() => setShowModal(false)} onPublish={handlePublish} />}
    </div>
  )
}