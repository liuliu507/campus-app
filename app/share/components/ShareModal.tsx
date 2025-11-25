'use client'

import { useState } from 'react'

interface ShareModalProps {
  onClose: () => void
}

export default function ShareModal({ onClose }: ShareModalProps) {
  const [formData, setFormData] = useState({
    content: '',
    tags: [] as string[],
    mood: 'happy'
  })

  const [currentTag, setCurrentTag] = useState('')

  const moods = [
    { value: 'happy', label: '开心', emoji: '😄' },
    { value: 'excited', label: '兴奋', emoji: '🎉' },
    { value: 'funny', label: '搞笑', emoji: '😂' },
    { value: 'touched', label: '感动', emoji: '🥲' },
    { value: 'surprised', label: '惊讶', emoji: '😲' },
    { value: 'proud', label: '自豪', emoji: '😊' }
  ]

  const presetTags = ['校园生活', '学习日常', '搞笑瞬间', '美食分享', '运动健身', '美景摄影', '小确幸', '奇闻趣事']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('发布动态:', formData)
    // 这里后续会连接后端API
    alert('动态发布成功！')
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
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">分享趣事</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl"
            >
              ✕
            </button>
          </div>
        </div>

        {/* 弹窗内容 */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 心情选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                此刻心情
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {moods.map(mood => (
                  <button
                    key={mood.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, mood: mood.value })}
                    className={`p-3 border-2 rounded-xl text-center transition-all ${formData.mood === mood.value
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-300 hover:border-gray-400'
                      }`}
                  >
                    <div className="text-2xl mb-1">{mood.emoji}</div>
                    <div className="text-xs text-gray-600">{mood.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 内容输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                分享内容 *
              </label>
              <textarea
                required
                placeholder="分享你的校园趣事、学习心得、生活感悟..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 resize-none"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>表达真实感受，更容易引起共鸣哦～</span>
                <span>{formData.content.length}/500</span>
              </div>
            </div>

            {/* 标签系统 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                添加标签
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
                        ? 'bg-pink-100 text-pink-700 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    #{tag}
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
                  className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
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
                      className="flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-pink-600 hover:text-pink-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 发布须知 */}
            <div className="bg-pink-50 rounded-xl p-4">
              <h4 className="font-bold text-pink-800 mb-2">📝 发布须知</h4>
              <ul className="text-pink-700 text-sm space-y-1">
                <li>• 分享真实有趣的校园生活</li>
                <li>• 尊重他人，避免不当言论</li>
                <li>• 保护隐私，不要泄露个人信息</li>
                <li>• 优质内容会被更多同学看到</li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors"
            >
              🚀 发布动态
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}