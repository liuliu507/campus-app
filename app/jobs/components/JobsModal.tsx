'use client'

import { useState } from 'react'

interface JobsModalProps {
  onClose: () => void
  activeTab: 'post' | 'find'
  setActiveTab: (tab: 'post' | 'find') => void
}

export default function JobsModal({ onClose, activeTab, setActiveTab }: JobsModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    type: '兼职',
    category: '',
    salary: '',
    location: '',
    duration: '',
    requirements: '',
    description: '',
    contact: '',
    urgent: false
  })

  const jobTypes = ['兼职', '实习']
  const categories = ['教育培训', '餐饮服务', '技术开发', '市场运营', '行政文员', '销售推广', '其他']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('发布职位:', formData)
    // 这里后续会连接后端API
    alert('职位发布成功！')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* 弹窗头部 */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
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
              onClick={() => setActiveTab('post')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'post'
                ? 'bg-white text-purple-600 shadow-lg'
                : 'bg-purple-500 text-white hover:bg-purple-400'
                }`}
            >
              💼 发布职位
            </button>
            <button
              onClick={() => setActiveTab('find')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'find'
                ? 'bg-white text-purple-600 shadow-lg'
                : 'bg-purple-500 text-white hover:bg-purple-400'
                }`}
            >
              🔍 寻找机会
            </button>
          </div>
        </div>

        {/* 弹窗内容 */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'post' ? (
            // 发布职位表单
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    职位名称 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：家教老师、餐厅服务员"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    公司/个人名称 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：校园咖啡厅、个人家长"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    工作类型 *
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    {jobTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    工作类别 *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">选择类别</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    薪资待遇 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：80-120元/小时、200-300元/天"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    工作地点 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：校内、市区、线上"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  工作周期 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如：长期有效、3个月、每周2-3次"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  职位要求 *
                </label>
                <textarea
                  required
                  placeholder="描述对申请者的要求，如专业、技能、经验等"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  工作描述 *
                </label>
                <textarea
                  required
                  placeholder="详细描述工作内容、职责等"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  联系方式 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="手机号、微信或邮箱"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={formData.urgent}
                  onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="urgent" className="ml-2 text-sm text-gray-700">
                  标记为紧急招聘
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors"
              >
                🚀 发布职位
              </button>
            </form>
          ) : (
            // 寻找机会页面
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">寻找理想工作</h3>
                <p className="text-gray-600 mb-6">在主页面可以浏览和搜索所有兼职实习机会</p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <h4 className="font-bold text-purple-800 mb-2">💡 求职建议</h4>
                <ul className="text-purple-700 text-sm space-y-2">
                  <li>• 仔细阅读职位要求，确保符合条件</li>
                  <li>• 提前准备简历和相关作品</li>
                  <li>• 面试前了解公司背景和职位内容</li>
                  <li>• 注意个人信息安全，谨防诈骗</li>
                  <li>• 确认工作时间和薪资结算方式</li>
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