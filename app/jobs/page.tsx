'use client'

import { useState, useEffect } from 'react'
import JobModal from './components/JobsModal'

// API 基础URL
const API_BASE_URL = 'https://campus-backend-1-uo30.onrender.com/api/jobs';

// 职位接口定义
interface Job {
  id: number
  title: string
  description: string
  company: string
  jobType: string
  category: string
  salary: string
  location: string
  workAddress: string
  contactInfo: string
  contactPerson: string
  requirements: string
  benefits: string
  workHours: string
  publisherId: string
  publisherName: string
  images: string[]
  urgent: boolean
  status: string
  viewCount: number
  applyCount: number
  createdAt: string
  expireDate: string
  timeAgo: string
  daysLeft: string
}

// 模拟数据（备用）
const mockJobs: Job[] = [
  {
    id: 1,
    title: '校园推广专员',
    description: '负责校园产品推广，与同学沟通交流，组织推广活动',
    company: '某科技公司',
    jobType: '兼职',
    category: '市场推广',
    salary: '2000-3000元/月',
    location: '主校区',
    workAddress: '主校区及周边',
    contactInfo: '138****1234',
    contactPerson: '张经理',
    requirements: '性格开朗，沟通能力强，有推广经验者优先',
    benefits: '提供培训，表现优秀者有奖金',
    workHours: '周一至周五，弹性工作',
    publisherId: 'publisher1',
    publisherName: '张经理',
    images: ['💼'],
    urgent: true,
    status: 'OPEN',
    viewCount: 45,
    applyCount: 12,
    createdAt: new Date().toISOString(),
    expireDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    timeAgo: '2小时前',
    daysLeft: '15天后截止'
  },
  {
    id: 2,
    title: '软件开发实习生',
    description: '参与公司产品开发，学习最新技术栈',
    company: '某软件公司',
    jobType: '实习',
    category: '技术开发',
    salary: '3000-5000元/月',
    location: '全市',
    workAddress: '高新区科技园',
    contactInfo: '139****5678',
    contactPerson: '李总监',
    requirements: '计算机相关专业，熟悉Java或Python',
    benefits: '提供转正机会，技术大牛指导',
    workHours: '周一至周五 9:00-18:00',
    publisherId: 'publisher2',
    publisherName: '李总监',
    images: ['💻'],
    urgent: false,
    status: 'OPEN',
    viewCount: 78,
    applyCount: 23,
    createdAt: new Date().toISOString(),
    expireDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    timeAgo: '1天前',
    daysLeft: '10天后截止'
  },
  {
    id: 3,
    title: '家教老师',
    description: '辅导初中数学，帮助学生提高成绩',
    company: '个人',
    jobType: '兼职',
    category: '教育辅导',
    salary: '100元/小时',
    location: '东校区',
    workAddress: '学生家中或学校附近',
    contactInfo: '137****9012',
    contactPerson: '王老师',
    requirements: '数学成绩优秀，有耐心，沟通能力强',
    benefits: '时间灵活，报酬优厚',
    workHours: '周末或晚上',
    publisherId: 'publisher3',
    publisherName: '王老师',
    images: ['📚'],
    urgent: false,
    status: 'OPEN',
    viewCount: 32,
    applyCount: 8,
    createdAt: new Date().toISOString(),
    expireDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    timeAgo: '3天前',
    daysLeft: '20天后截止'
  }
]

export default function JobsPage() {
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'publish' | 'find'>('find')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedJobType, setSelectedJobType] = useState('全部')
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [refreshTrigger, setRefreshTrigger] = useState(0) // 新增刷新触发器
  const [deletingId, setDeletingId] = useState<number | null>(null) // 删除状态管理

  const jobTypes = ['全部', '兼职', '实习', '全职']
  const categories = ['全部', '技术开发', '市场推广', '教育辅导', '行政文员', '设计创意', '餐饮服务', '销售业务', '其他']

  // 加载职位数据
  const loadJobs = async () => {
    setLoading(true)
    setError('')
    try {
      console.log('开始加载职位数据...')
      const response = await fetch(API_BASE_URL)
      if (response.ok) {
        const result = await response.json()
        console.log('API返回数据:', result)

        if (result.success) {
          console.log('获取职位成功，数据量:', result.data?.length || 0)
          // 确保数据是数组，如果不是则转换为数组
          const jobsData = Array.isArray(result.data) ? result.data : []
          setJobs(jobsData)

          // 如果没有数据，使用模拟数据
          if (jobsData.length === 0) {
            console.log('API返回空数据，使用模拟数据')
            setJobs(mockJobs)
          }
        } else {
          console.warn('API返回success为false:', result.message)
          setJobs(mockJobs)
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (err) {
      console.error('加载职位失败:', err)
      const errorMessage = err instanceof Error ? err.message : '加载职位失败'
      setError(`${errorMessage}，使用模拟数据`)
      setJobs(mockJobs)
    } finally {
      setLoading(false)
    }
  }

  // 搜索职位
  const searchJobs = async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.append('keyword', searchTerm)
      if (selectedJobType && selectedJobType !== '全部') {
        params.append('jobType', selectedJobType)
      }
      if (selectedCategory && selectedCategory !== '全部') {
        params.append('category', selectedCategory)
      }

      const url = `${API_BASE_URL}/search?${params.toString()}`
      console.log('搜索URL:', url)
      const response = await fetch(url)

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setJobs(result.data)
        } else {
          throw new Error(result.message || '搜索失败')
        }
      } else {
        throw new Error(`搜索失败: ${response.status}`)
      }
    } catch (err) {
      console.error('搜索职位失败:', err)
      const errorMessage = err instanceof Error ? err.message : '搜索失败'
      setError(`${errorMessage}，使用本地筛选`)
      // 搜索失败时使用本地筛选
      const filtered = mockJobs.filter(job => {
        const matchesSearch = searchTerm ?
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) : true

        const matchesJobType = selectedJobType === '全部' || job.jobType === selectedJobType
        const matchesCategory = selectedCategory === '全部' || job.category === selectedCategory

        return matchesSearch && matchesJobType && matchesCategory
      })
      setJobs(filtered)
    } finally {
      setLoading(false)
    }
  }

  // 删除职位
  const handleDeleteJob = async (jobId: number) => {
    if (!confirm('确定要删除这个职位吗？此操作不可撤销。')) {
      return
    }

    setDeletingId(jobId)

    try {
      console.log(`🗑️ 删除职位 ID: ${jobId}`)

      const response = await fetch(`${API_BASE_URL}/${jobId}`, {
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

        // 从列表中移除职位
        setJobs(prev => prev.filter(job => job.id !== jobId))
        alert('职位删除成功！')
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
      console.error('❌ 删除职位失败:', err)
      alert(`删除失败: ${err.message}`)
    } finally {
      setDeletingId(null)
    }
  }

  useEffect(() => {
    loadJobs()
  }, [refreshTrigger]) // 添加refreshTrigger依赖

  useEffect(() => {
    if (searchTerm || selectedJobType !== '全部' || selectedCategory !== '全部') {
      searchJobs()
    } else {
      loadJobs()
    }
  }, [searchTerm, selectedJobType, selectedCategory])

  const handleContactEmployer = (job: Job) => {
    navigator.clipboard.writeText(job.contactInfo)
      .then(() => {
        alert('已复制联系方式到剪贴板')
      })
      .catch(() => {
        alert(`联系方式: ${job.contactInfo}`)
      })
  }

  const handleApplyJob = async (jobId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${jobId}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          alert('申请成功！我们会尽快联系您')
          // 刷新数据
          loadJobs()
        } else {
          throw new Error(result.message || '申请失败')
        }
      } else {
        throw new Error(`申请失败: ${response.status}`)
      }
    } catch (err) {
      console.error('申请失败:', err)
      const errorMessage = err instanceof Error ? err.message : '申请失败'
      alert(`申请失败: ${errorMessage}`)
    }
  }

  const handleJobPublished = () => {
    setShowModal(false)
    // 强制刷新数据
    setRefreshTrigger(prev => prev + 1)
    console.log('职位发布成功，触发数据刷新')
  }

  // 获取当前用户发布的职位（临时逻辑）
  const getMyJobs = () => {
    // 临时逻辑：显示所有状态为 OPEN 的职位作为"我的职位"
    return jobs.filter(job => job.status === 'OPEN')
  }

  // 根据当前标签获取职位列表
  const getCurrentJobs = () => {
    switch (activeTab) {
      case 'publish':
        return getMyJobs()
      default:
        return jobs
    }
  }

  const currentJobs = getCurrentJobs()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">兼职实习</h1>
          <p className="text-gray-600 text-lg">寻找理想工作，积累实践经验</p>
        </div>

        {/* 标签切换 */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-2">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('find')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'find'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                🔍 寻找工作
              </button>
              <button
                onClick={() => setActiveTab('publish')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'publish'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                📢 我的发布
              </button>
            </div>
          </div>
        </div>

        {/* 搜索和筛选栏 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* 搜索框 */}
            <div className="flex-1">
              <input
                type="text"
                placeholder={activeTab === 'publish' ? "🔍 在我的发布中搜索..." : "🔍 搜索职位、公司或描述..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* 工作类型筛选 */}
            <div className="flex gap-2 overflow-x-auto">
              {jobTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedJobType(type)}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors ${selectedJobType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* 发布按钮 */}
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl whitespace-nowrap transition-colors"
            >
              📢 发布职位
            </button>
          </div>

          {/* 分类筛选 */}
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors ${selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 统计信息和错误提示 */}
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex gap-6 text-sm text-gray-600">
              <span>📊 共 {currentJobs.length} 个职位</span>
              <span>🚨 {currentJobs.filter(j => j.urgent).length} 个急招</span>
              <span>✅ {currentJobs.filter(j => j.status === 'OPEN').length} 个招聘中</span>
              {activeTab === 'publish' && <span>🗑️ 可管理我的发布</span>}
            </div>
            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">
                ⚠️ {error}
              </div>
            )}
          </div>
        </div>

        {/* 加载状态 */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">加载中...</p>
          </div>
        )}

        {/* 职位网格 */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden relative">
                {/* 删除按钮 - 只在"我的发布"页面显示 */}
                {activeTab === 'publish' && (
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    disabled={deletingId === job.id}
                    className="absolute top-4 right-4 z-20 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="删除职位"
                  >
                    {deletingId === job.id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                )}

                {/* 职位状态标签 */}
                <div className="absolute top-4 left-4 z-10">
                  {job.status === 'CLOSED' && (
                    <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                      已结束
                    </span>
                  )}
                  {job.status === 'FILLED' && (
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                      已招满
                    </span>
                  )}
                </div>

                {/* 职位图片 */}
                <div className="h-48 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-6xl relative">
                  {job.images && job.images.length > 0 ? job.images[0] : '💼'}
                  {job.urgent && (
                    <span className="absolute top-4 right-12 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                      急招
                    </span>
                  )}
                </div>

                <div className="p-6">
                  {/* 职位标题和公司 */}
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2">{job.title}</h3>
                    <p className="text-blue-600 font-medium">{job.company}</p>
                  </div>

                  {/* 薪资和类型 */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-green-600">{job.salary}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${job.jobType === '兼职' ? 'bg-yellow-100 text-yellow-800' :
                      job.jobType === '实习' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                      {job.jobType}
                    </span>
                  </div>

                  {/* 职位信息 */}
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <span>🏷️ {job.category}</span>
                      <span>📍 {job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⏰ {job.timeAgo || '未知时间'}</span>
                      <span className={`font-medium ${job.daysLeft?.includes('今天') ? 'text-red-600' :
                        job.daysLeft?.includes('天后') ? 'text-orange-600' : 'text-gray-600'
                        }`}>
                        📅 {job.daysLeft || '未知'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span>👀 {job.viewCount} 浏览</span>
                      <span>📨 {job.applyCount} 申请</span>
                    </div>
                  </div>

                  {/* 职位描述 */}
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{job.description}</p>

                  {/* 操作按钮 */}
                  <div className="flex space-x-3">
                    {activeTab === 'publish' ? (
                      // 我的发布页面的按钮
                      <>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          disabled={deletingId === job.id}
                          className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-2 px-4 rounded-lg font-medium transition-all shadow hover:shadow-md disabled:opacity-50"
                        >
                          {deletingId === job.id ? '删除中...' : '🗑️ 删除'}
                        </button>
                        <button
                          onClick={() => handleContactEmployer(job)}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-all shadow hover:shadow-md"
                        >
                          📊 查看申请
                        </button>
                      </>
                    ) : (
                      // 寻找工作页面的按钮
                      <>
                        <button
                          onClick={() => handleApplyJob(job.id)}
                          disabled={job.status !== 'OPEN'}
                          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${job.status === 'OPEN'
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                          {job.status === 'OPEN' ? '📝 立即申请' : '已结束'}
                        </button>
                        <button
                          onClick={() => handleContactEmployer(job)}
                          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                        >
                          💬 联系HR
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 空状态 */}
        {!loading && currentJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💼</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {activeTab === 'publish' ? '暂无发布职位' : '暂无职位'}
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'publish'
                ? '您还没有发布任何职位'
                : '暂时没有找到符合条件的职位'
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedJobType('全部')
                setSelectedCategory('全部')
                setRefreshTrigger(prev => prev + 1)
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl"
            >
              {activeTab === 'publish' ? '发布第一个职位' : '重置筛选条件'}
            </button>
          </div>
        )}

        {/* 发布职位弹窗 */}
        {showModal && (
          <JobModal
            onClose={() => setShowModal(false)}
            onSuccess={handleJobPublished}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
      </div>
    </div>
  )
}