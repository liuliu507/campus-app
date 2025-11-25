'use client'

import { useState } from 'react'

interface SubstituteModalProps {
  onClose: () => void
}

export default function SubstituteModal({ onClose }: SubstituteModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    teacher: '',
    campus: '',
    time: '',
    date: '',
    type: '水课',
    price: '',
    description: '',
    contact: '',
    urgency: '一般'
  })

  const campuses = ['主校区', '东校区', '西校区', '新校区']
  const courseTypes = [
    { value: '水课', label: '水课', emoji: '💦', description: '轻松简单，可自习' },
    { value: '专业课', label: '专业课', emoji: '📚', description: '需要认真听讲' },
    { value: '体育课', label: '体育课', emoji: '⚽', description: '需要运动能力' },
    { value: '实验课', label: '实验课', emoji: '🔬', description: '需要动手操作' }
  ]
  const urgencyLevels = [
    { value: '一般', label: '一般', color: 'text-gray-600' },
    { value: '紧急', label: '紧急', color: 'text-orange-600' },
    { value: '非常紧急', label: '非常紧急', color: 'text-red-600 font-bold' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('发布代课需求:', formData)
    alert('代课需求发布成功！等待同学接单')
    onClose()
  }

  const isFormValid = () => {
    return formData.title && formData.course && formData.teacher &&
      formData.campus && formData.time && formData.date &&
      formData.price && formData.description && formData.contact
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* 弹窗头部 */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">发布代课需求</h2>
              <p className="text-blue-100 text-sm mt-1">详细填写信息，更快找到合适的代课</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 text-2xl transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* 弹窗内容 */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 基础信息 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  需求标题 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如：周一高数课代课"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  课程名称 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如：高等数学"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  任课老师 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如：张老师"
                  value={formData.teacher}
                  onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  上课校区 *
                </label>
                <select
                  required
                  value={formData.campus}
                  onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">选择校区</option>
                  {campuses.map(campus => (
                    <option key={campus} value={campus}>{campus}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 时间信息 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  上课时间 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如：周一 第1-2节 (8:00-9:40)"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  上课日期 *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* 课程类型和报酬 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  课程类型 *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {courseTypes.map(type => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: type.value })}
                      className={`p-3 border-2 rounded-xl text-center transition-all ${formData.type === type.value
                          ? 'border-blue-500 bg-blue-50 shadow-sm'
                          : 'border-gray-300 hover:border-gray-400'
                        }`}
                    >
                      <div className="text-lg mb-1">{type.emoji}</div>
                      <div className="font-medium text-sm">{type.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{type.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    报酬金额 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：30元"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    紧急程度
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {urgencyLevels.map(level => (
                      <option key={level.value} value={level.value} className={level.color}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 详细描述 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                详细要求 *
              </label>
              <textarea
                required
                placeholder="请详细说明代课要求：
• 是否需要回答问题
• 签到方式（纸质/电子）
• 课堂注意事项
• 其他特殊要求"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>

            {/* 联系方式 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                联系方式 *
              </label>
              <input
                type="text"
                required
                placeholder="手机号或微信，用于接单者联系您"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* 发布按钮 */}
            <button
              type="submit"
              disabled={!isFormValid()}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              🚀 发布代课需求
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}