'use client'

import { useState } from 'react'

interface ReviewsModalProps {
  onClose: () => void
  activeTab: 'red' | 'black'
  setActiveTab: (tab: 'red' | 'black') => void
}

export default function ReviewsModal({ onClose, activeTab, setActiveTab }: ReviewsModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: '红榜',
    category: '',
    rating: 5,
    content: '',
    tags: [] as string[],
    author: '匿名用户',
    contact: ''
  })

  const [currentTag, setCurrentTag] = useState('')

  const categories = ['课程评价', '老师评价', '商家评价', '服务评价', '其他']
  const presetTags = ['讲课清晰', '考试公平', '作业适中', '服务好', '性价比高', '环境优美', '态度差', '效率低', '价格贵']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('发布评价:', formData)
    // 这里后续会连接后端API
    alert('评价发布成功！感谢您的分享')
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
        <div className={`p-6 ${activeTab === 'red' ? 'bg-red-600' : 'bg-gray-800'
          } text-white`}>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">发布评价</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl"
            >
              ✕
            </button>
          </div>

          {/* 红黑榜切换 */}
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => {
                setActiveTab('red')
                setFormData({ ...formData, type: '红榜', rating: 5 })
              }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'red'
                  ? 'bg-white text-red-600 shadow-lg'
                  : 'bg-red-500 text-white hover:bg-red-400'
                }`}
            >
              👍 红榜推荐
            </button>
            <button
              onClick={() => {
                setActiveTab('black')
                setFormData({ ...formData, type: '黑榜', rating: 1 })
              }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'black'
                  ? 'bg-white text-gray-800 shadow-lg'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
            >
              👎 黑榜避雷
            </button>
          </div>
        </div>

        {/* 弹窗内容 */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  评价对象 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如：高等数学 - 张老师、校园西餐厅"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  评价分类 *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">选择分类</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                评分 *
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`text-2xl ${star <= formData.rating
                        ? activeTab === 'red' ? 'text-yellow-400' : 'text-gray-400'
                        : 'text-gray-300'
                      }`}
                  >
                    {star <= formData.rating ? '⭐' : '☆'}
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {formData.rating} 星
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                详细评价 *
              </label>
              <textarea
                required
                placeholder={`请详细描述您的${activeTab === 'red' ? '推荐理由和优点' : '不满之处和改进建议'
                  }...`}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                标签
                <span className="text-gray-500 text-sm ml-1">（可选，最多5个）</span>
              </label>

              {/* 预设标签 */}
              <div className="flex flex-wrap gap-2 mb-3">
                {presetTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleAddTag(tag)}
                    disabled={formData.tags.includes(tag) || formData.tags.length >= 5}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${formData.tags.includes(tag)
                        ? 'bg-red-100 text-red-800 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* 自定义标签输入 */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="输入自定义标签..."
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddTag(currentTag)
                    }
                  }}
                  className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
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

              {/* 已选标签 */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  发布者名称
                </label>
                <input
                  type="text"
                  placeholder="默认：匿名用户"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  联系方式（可选）
                </label>
                <input
                  type="text"
                  placeholder="用于核实信息"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-bold text-gray-800 mb-2">📝 发布须知</h4>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• 请基于真实体验发布评价</li>
                <li>• 避免人身攻击和不当言论</li>
                <li>• 详细描述有助于其他同学参考</li>
                <li>• 评价需要审核通过后显示</li>
              </ul>
            </div>

            <button
              type="submit"
              className={`w-full font-bold py-4 px-6 rounded-xl text-lg transition-colors ${activeTab === 'red'
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-gray-800 hover:bg-gray-900 text-white'
                }`}
            >
              🚀 发布评价
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}