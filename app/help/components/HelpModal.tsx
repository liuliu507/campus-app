'use client'

import { useState } from 'react'

interface HelpModalProps {
  onClose: () => void
  activeTab: 'help' | 'find'
  setActiveTab: (tab: 'help' | 'find') => void
}

export default function HelpModal({ onClose, activeTab, setActiveTab }: HelpModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: '打听',
    category: '',
    content: '',
    reward: '0',
    urgency: '一般',
    contact: ''
  })

  const categories = ['学习相关', '行政事务', '生活服务', '校园活动', '其他']
  const urgencyLevels = [
    { value: '一般', label: '一般', color: 'text-gray-600' },
    { value: '紧急', label: '紧急', color: 'text-red-600' },
    { value: '非常紧急', label: '非常紧急', color: 'text-red-700 font-bold' }
  ]

  const rewardOptions = [
    { value: '0', label: '无悬赏' },
    { value: '5', label: '5元' },
    { value: '10', label: '10元' },
    { value: '20', label: '20元' },
    { value: '50', label: '50元' },
    { value: 'custom', label: '自定义' }
  ]

  const [customReward, setCustomReward] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const finalReward = formData.reward === 'custom' ? customReward : formData.reward

    const submitData = {
      ...formData,
      reward: finalReward
    }

    console.log('发布求助:', submitData)
    // 这里后续会连接后端API
    alert('求助发布成功！')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* 弹窗头部 */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">发布求助</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl"
            >
              ✕
            </button>
          </div>

          {/* 求助类型切换 */}
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => {
                setActiveTab('help')
                setFormData({ ...formData, type: '求助' })
              }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'help'
                  ? 'bg-white text-indigo-600 shadow-lg'
                  : 'bg-indigo-500 text-white hover:bg-indigo-400'
                }`}
            >
              🆘 我需要帮助
            </button>
            <button
              onClick={() => {
                setActiveTab('find')
                setFormData({ ...formData, type: '打听' })
              }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'find'
                  ? 'bg-white text-indigo-600 shadow-lg'
                  : 'bg-indigo-500 text-white hover:bg-indigo-400'
                }`}
            >
              🔍 我想打听
            </button>
          </div>
        </div>

        {/* 弹窗内容 */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {activeTab === 'help' ? '求助标题 *' : '打听问题 *'}
              </label>
              <input
                type="text"
                required
                placeholder={
                  activeTab === 'help'
                    ? '例如：急！学生证丢了怎么补办？'
                    : '例如：求问图书馆哪个自习室最安静？'
                }
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  问题分类 *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">选择分类</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  紧急程度
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {urgencyLevels.map(level => (
                    <option key={level.value} value={level.value} className={level.color}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {activeTab === 'help' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  悬赏金额
                </label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-2">
                  {rewardOptions.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, reward: option.value })}
                      className={`p-2 border-2 rounded-lg text-center transition-all ${formData.reward === option.value
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-300 hover:border-gray-400'
                        }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                {formData.reward === 'custom' && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="输入自定义金额"
                      value={customReward}
                      onChange={(e) => setCustomReward(e.target.value)}
                      className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <span className="flex items-center px-3 text-gray-600">元</span>
                  </div>
                )}

                {formData.reward !== '0' && (
                  <p className="text-sm text-gray-500 mt-1">
                    💡 设置悬赏可以更快获得帮助，问题解决后支付给最佳回答者
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {activeTab === 'help' ? '详细描述 *' : '具体内容 *'}
              </label>
              <textarea
                required
                placeholder={
                  activeTab === 'help'
                    ? '请详细描述您遇到的问题、已经尝试的解决方法、期望的帮助等...'
                    : '请详细描述您想了解的信息、具体需求等...'
                }
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                联系方式（可选）
              </label>
              <input
                type="text"
                placeholder="手机号、微信或QQ，用于及时沟通"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="bg-indigo-50 rounded-xl p-4">
              <h4 className="font-bold text-indigo-800 mb-2">💡 发布建议</h4>
              <ul className="text-indigo-700 text-sm space-y-1">
                <li>• 标题要清晰明确，便于他人理解</li>
                <li>• 详细描述问题，提供足够的信息</li>
                <li>• 紧急问题可以设置悬赏加快解决</li>
                <li>• 问题解决后请及时采纳最佳答案</li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors"
            >
              🚀 发布{activeTab === 'help' ? '求助' : '打听'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}