'use client'

import { useState } from 'react'

interface FriendsModalProps {
  onClose: () => void
  activeTab: 'find' | 'organize'
  setActiveTab: (tab: 'find' | 'organize') => void
}

export default function FriendsModal({ onClose, activeTab, setActiveTab }: FriendsModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: '运动健身',
    activity: '',
    location: '',
    time: '',
    people: '',
    maxParticipants: '',
    description: '',
    contact: '',
    urgency: '一般',
    gender: '不限',
    tags: [] as string[]
  })

  const [currentTag, setCurrentTag] = useState('')

  const activityTypes = ['运动健身', '学习交流', '娱乐休闲', '兴趣社团', '其他']
  const urgencyLevels = [
    { value: '一般', label: '一般' },
    { value: '紧急', label: '紧急' },
    { value: '非常紧急', label: '非常紧急' }
  ]
  const genderOptions = [
    { value: '不限', label: '不限' },
    { value: '男生', label: '仅限男生' },
    { value: '女生', label: '仅限女生' }
  ]

  const presetTags = ['羽毛球', '篮球', '跑步', '考研', '自习', '电影', '游戏', '摄影', '音乐', '舞蹈', '美食', '旅游']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('发布活动:', formData)
    // 这里后续会连接后端API
    alert('活动发布成功！')
    onClose()
  }

  const handleAddTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 5) {
      setFormData({ ...formData, tags: [...formData.tags, tag] })
    }
    setCurrentTag('')
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* 弹窗头部 */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">交友找伴</h2>
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
              onClick={() => setActiveTab('organize')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'organize'
                ? 'bg-white text-teal-600 shadow-lg'
                : 'bg-teal-500 text-white hover:bg-teal-400'
                }`}
            >
              🎯 发起活动
            </button>
            <button
              onClick={() => setActiveTab('find')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'find'
                ? 'bg-white text-teal-600 shadow-lg'
                : 'bg-teal-500 text-white hover:bg-teal-400'
                }`}
            >
              🔍 寻找伙伴
            </button>
          </div>
        </div>

        {/* 弹窗内容 */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'organize' ? (
            // 发布活动表单
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  活动标题 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如：寻找羽毛球搭子、考研学习小组招人"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    活动类型 *
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    {activityTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    具体活动 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：羽毛球、考研备考、看电影"
                    value={formData.activity}
                    onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    活动地点 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：学校体育馆、图书馆、万达影城"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    活动时间 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：周末下午、每天晚7-10点、今晚7点"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    人数要求 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：2-4人、3-5人"
                    value={formData.people}
                    onChange={(e) => setFormData({ ...formData, people: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    最大人数
                  </label>
                  <input
                    type="number"
                    placeholder="0表示不限"
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    性别要求
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    {genderOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  活动描述 *
                </label>
                <textarea
                  required
                  placeholder="详细描述活动内容、要求、注意事项等..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  联系方式 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="手机号、微信或QQ"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    紧急程度
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    {urgencyLevels.map(level => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    添加标签
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="输入标签..."
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleAddTag(currentTag)
                        }
                      }}
                      className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddTag(currentTag)}
                      disabled={!currentTag || formData.tags.length >= 5}
                      className="px-4 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      添加
                    </button>
                  </div>
                </div>
              </div>

              {/* 预设标签 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  常用标签
                </label>
                <div className="flex flex-wrap gap-2">
                  {presetTags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleAddTag(tag)}
                      disabled={formData.tags.includes(tag) || formData.tags.length >= 5}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${formData.tags.includes(tag)
                        ? 'bg-teal-100 text-teal-700 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* 已选标签 */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-teal-600 hover:text-teal-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div className="bg-teal-50 rounded-xl p-4">
                <h4 className="font-bold text-teal-800 mb-2">💡 发布建议</h4>
                <ul className="text-teal-700 text-sm space-y-1">
                  <li>• 标题要清晰明确，吸引志同道合的伙伴</li>
                  <li>• 详细描述活动内容和要求</li>
                  <li>• 设置合理的人数限制</li>
                  <li>• 及时回复参与者的申请</li>
                </ul>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors"
              >
                🚀 发布活动
              </button>
            </form>
          ) : (
            // 寻找伙伴页面
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">寻找活动伙伴</h3>
                <p className="text-gray-600 mb-6">在主页面可以浏览和搜索所有活动，找到志同道合的伙伴</p>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
                <h4 className="font-bold text-teal-800 mb-2">💡 参与建议</h4>
                <ul className="text-teal-700 text-sm space-y-2">
                  <li>• 仔细阅读活动详情，确保符合要求</li>
                  <li>• 提前联系组织者了解具体安排</li>
                  <li>• 遵守活动时间和地点</li>
                  <li>• 尊重其他参与者，友好相处</li>
                  <li>• 注意个人安全和财产安全</li>
                </ul>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
              >
                返回浏览活动
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}