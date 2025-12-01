'use client'

import { useState } from 'react'

interface JobModalProps {
  onClose: () => void
  onSuccess: () => void
  activeTab: 'publish' | 'find'
  setActiveTab: (tab: 'publish' | 'find') => void
}

// API 基础URL
const API_BASE_URL = 'https://campus-backend-1-uo30.onrender.com/api/jobs';

export default function JobModal({ onClose, onSuccess, activeTab, setActiveTab }: JobModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    jobType: '',
    category: '',
    salary: '',
    location: '',
    workAddress: '',
    contactInfo: '',
    contactPerson: '',
    requirements: '',
    benefits: '',
    workHours: '',
    urgent: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const jobTypes = ['兼职', '实习', '全职']
  const categories = ['技术开发', '市场推广', '教育辅导', '行政文员', '设计创意', '餐饮服务', '销售业务', '其他']
  const locations = ['主校区', '东校区', '西校区', '新校区', '全市']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // 表单验证
    const requiredFields = ['title', 'description', 'company', 'jobType', 'category',
      'salary', 'location', 'contactInfo', 'contactPerson']
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData])

    if (missingFields.length > 0) {
      setError('请填写所有必填字段')
      setLoading(false)
      return
    }

    try {
      // 准备提交数据 - 确保字段名与后端一致
      const submitData = {
        title: formData.title,
        description: formData.description,
        company: formData.company,
        jobType: formData.jobType,
        category: formData.category,
        salary: formData.salary,
        location: formData.location,
        workAddress: formData.workAddress || `${formData.location}具体面议`,
        contactInfo: formData.contactInfo,
        contactPerson: formData.contactPerson,
        requirements: formData.requirements || '有相关经验者优先',
        benefits: formData.benefits || '提供培训，表现优秀者可转正',
        workHours: formData.workHours || '具体面议',
        urgent: formData.urgent,
        images: ['💼'],
        drive: "default_drive",
        // 添加可能需要的默认值
        status: "OPEN",
        viewCount: 0,
        applyCount: 0
      }

      console.log('提交职位数据:', submitData)

      // 调用后端API发布职位
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      console.log('发布响应状态:', response.status)

      if (response.ok) {
        const result = await response.json()
        console.log('发布响应数据:', result)

        if (result.success) {
          console.log('职位发布成功:', result.data)
          alert('职位发布成功！')
          onSuccess() // 触发父组件的刷新
        } else {
          throw new Error(result.message || '发布失败')
        }
      } else {
        const errorText = await response.text()
        console.error('发布失败响应:', errorText)
        throw new Error(`发布失败: ${response.status} - ${errorText}`)
      }
    } catch (err) {
      console.error('发布失败:', err)
      const errorMessage = err instanceof Error ? err.message : '发布失败'
      setError(`发布失败: ${errorMessage}`)
      alert(`发布失败: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* 弹窗头部 */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">兼职实习</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl"
            >
              ✕
            </button>
          </div>

          {/* 标签切换 */}
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => setActiveTab('publish')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'publish'
                ? 'bg-white text-blue-600 shadow-lg'
                : 'bg-blue-500 text-white hover:bg-blue-400'
                }`}
            >
              📢 发布职位
            </button>
            <button
              onClick={() => setActiveTab('find')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'find'
                ? 'bg-white text-blue-600 shadow-lg'
                : 'bg-blue-500 text-white hover:bg-blue-400'
                }`}
            >
              🔍 寻找工作
            </button>
          </div>
        </div>

        {/* 弹窗内容 */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'publish' ? (
            // 发布职位表单
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 错误提示 */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    职位标题 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：校园推广专员"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    公司名称 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：某科技公司"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    工作类型 *
                  </label>
                  <select
                    required
                    value={formData.jobType}
                    onChange={(e) => handleInputChange('jobType', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">选择类型</option>
                    {jobTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    岗位类别 *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">选择类别</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    薪资范围 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：2000-3000元/月"
                    value={formData.salary}
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    工作地点 *
                  </label>
                  <select
                    required
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">选择地点</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    详细地址
                  </label>
                  <input
                    type="text"
                    placeholder="例如：主校区教学楼A座"
                    value={formData.workAddress}
                    onChange={(e) => handleInputChange('workAddress', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    联系人 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：张经理"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    联系方式 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="手机号或微信"
                    value={formData.contactInfo}
                    onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  职位描述 *
                </label>
                <textarea
                  required
                  placeholder="详细描述工作内容、职责等..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    任职要求
                  </label>
                  <textarea
                    placeholder="学历、技能、经验等要求..."
                    value={formData.requirements}
                    onChange={(e) => handleInputChange('requirements', e.target.value)}
                    rows={2}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    福利待遇
                  </label>
                  <textarea
                    placeholder="薪资福利、培训机会等..."
                    value={formData.benefits}
                    onChange={(e) => handleInputChange('benefits', e.target.value)}
                    rows={2}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  工作时间
                </label>
                <input
                  type="text"
                  placeholder="例如：周一至周五 9:00-18:00"
                  value={formData.workHours}
                  onChange={(e) => handleInputChange('workHours', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={formData.urgent}
                  onChange={(e) => handleInputChange('urgent', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="urgent" className="ml-2 text-sm text-gray-700">
                  标记为急招职位
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full font-bold py-4 px-6 rounded-xl text-lg transition-colors ${loading
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    发布中...
                  </span>
                ) : (
                  '🚀 发布职位'
                )}
              </button>
            </form>
          ) : (
            // 寻找工作页面
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">寻找理想工作</h3>
                <p className="text-gray-600 mb-6">在主页面可以浏览和搜索所有职位信息</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-bold text-blue-800 mb-2">💡 求职小贴士</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• 仔细阅读职位要求和公司信息</li>
                  <li>• 准备一份简洁明了的简历</li>
                  <li>• 面试前了解公司背景和岗位职责</li>
                  <li>• 注意保护个人隐私和安全</li>
                </ul>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
              >
                返回浏览职位
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}