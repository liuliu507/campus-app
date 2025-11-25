'use client'

import { useState } from 'react'
import JobsModal from './components/JobsModal'

// 模拟职位数据
const mockJobs = [
  {
    id: 1,
    title: '家教老师（数学）',
    company: '个人家长',
    type: '兼职',
    salary: '80-120元/小时',
    location: '线上/线下均可',
    duration: '长期有效',
    requirements: '数学专业优先，有家教经验',
    description: '辅导初中生数学，每周2-3次，每次2小时',
    contact: '138****1234',
    time: '2小时前',
    urgent: true,
    category: '教育培训'
  },
  {
    id: 2,
    title: '餐厅服务员',
    company: '校园咖啡厅',
    type: '兼职',
    salary: '18-22元/小时',
    location: '校内',
    duration: '3个月',
    requirements: '有服务意识，沟通能力强',
    description: '负责点单、送餐、清洁等工作，工作时间灵活',
    contact: '139****5678',
    time: '1天前',
    urgent: false,
    category: '餐饮服务'
  },
  {
    id: 3,
    title: '前端开发实习生',
    company: '科技公司',
    type: '实习',
    salary: '200-300元/天',
    location: '市区',
    duration: '3-6个月',
    requirements: '熟悉React、Vue等框架',
    description: '参与公司产品前端开发，有导师指导',
    contact: '137****9012',
    time: '3天前',
    urgent: false,
    category: '技术开发'
  },
  {
    id: 4,
    title: '活动策划助理',
    company: '文化传媒公司',
    type: '实习',
    salary: '150-200元/天',
    location: '市区',
    duration: '2个月',
    requirements: '有活动策划经验，创意能力强',
    description: '协助策划校园活动，负责执行和协调',
    contact: '136****3456',
    time: '5天前',
    urgent: false,
    category: '市场运营'
  }
]

export default function JobsPage() {
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'post' | 'find'>('find')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('全部')
  const [selectedCategory, setSelectedCategory] = useState('全部')

  const jobTypes = ['全部', '兼职', '实习']
  const categories = ['全部', '教育培训', '餐饮服务', '技术开发', '市场运营', '行政文员', '销售推广', '其他']

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === '全部' || job.type === selectedType
    const matchesCategory = selectedCategory === '全部' || job.category === selectedCategory
    return matchesSearch && matchesType && matchesCategory
  })

  const handleApply = (jobId: number) => {
    console.log('申请职位:', jobId)
    alert('申请成功！请等待用人单位联系')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">兼职实习</h1>
          <p className="text-gray-600 text-lg">积累工作经验，开启职业旅程</p>
        </div>

        {/* 搜索和筛选栏 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* 搜索框 */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="🔍 搜索职位、公司或关键词..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* 类型筛选 */}
            <div className="flex gap-2">
              {jobTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors ${selectedType === type
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* 分类筛选 */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* 发布按钮 */}
            <button
              onClick={() => setShowModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl whitespace-nowrap transition-colors"
            >
              💼 发布职位
            </button>
          </div>
        </div>

        {/* 职位列表 */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* 左边：职位信息 */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                          {job.urgent && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                              急招
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            🏢 {job.company}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.type === '兼职'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                            }`}>
                            {job.type}
                          </span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                            {job.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 薪资和地点 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-purple-600">{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <span>📍</span>
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <span>⏰</span>
                        <span>{job.duration}</span>
                      </div>
                    </div>

                    {/* 职位要求 */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-2">职位要求：</h4>
                      <p className="text-gray-600 text-sm">{job.requirements}</p>
                    </div>

                    {/* 工作描述 */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-2">工作内容：</h4>
                      <p className="text-gray-600 text-sm">{job.description}</p>
                    </div>

                    {/* 时间和联系方式 */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>🕒 {job.time}</span>
                      <span>📞 {job.contact}</span>
                    </div>
                  </div>

                  {/* 右边：操作按钮 */}
                  <div className="flex lg:flex-col gap-3 lg:w-48">
                    <button
                      onClick={() => handleApply(job.id)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors whitespace-nowrap"
                    >
                      📨 立即申请
                    </button>
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors whitespace-nowrap">
                      💬 联系咨询
                    </button>
                    <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-medium transition-colors whitespace-nowrap">
                      🤍 收藏职位
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 发布职位弹窗 */}
        {showModal && (
          <JobsModal
            onClose={() => setShowModal(false)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
      </div>
    </div>
  )
}