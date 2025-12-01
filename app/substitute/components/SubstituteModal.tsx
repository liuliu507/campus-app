'use client'

import { useState } from 'react'

interface SubstituteModalProps {
  onClose: () => void
  onPublish: (formData: any) => void
}

export default function SubstituteModal({ onClose, onPublish }: SubstituteModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    campus: '',
    genderRequirement: '',
    classTime: '',
    classDate: '',
    courseType: '水课',
    reward: '',
    description: '',
    contactInfo: '',
    urgency: '一般',
    teacher: '未知老师'
  })

  const [loading, setLoading] = useState(false)

  const campuses = ['桃花坪', '二里半', '南苑', '天马', '咸嘉湖', '江边']
  const genders = ['女', '男', '不限']
  const courseTypes = [
    { value: '水课', label: '水课', emoji: '💦', description: '轻松简单，可自习' },
    { value: '专业课', label: '专业课', emoji: '📚', description: '需要做笔记' },
    { value: '体育课', label: '体育课', emoji: '⚽', description: '需要运动能力' },
    { value: '实验课', label: '实验课', emoji: '🔬', description: '需要动手操作' }
  ]
  const urgencyLevels = [
    { value: '一般', label: '一般', color: 'text-gray-600' },
    { value: '紧急', label: '紧急', color: 'text-orange-600' },
    { value: '非常紧急', label: '非常紧急', color: 'text-red-600 font-bold' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid()) {
      alert('请填写所有必填字段！');
      return;
    }

    setLoading(true)

    try {
      // 直接调用父组件的 onPublish 函数，让父组件处理API请求
      await onPublish(formData)
    } catch (error) {
      console.error('发布失败:', error)
      // 错误处理在父组件中已经做了
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = () => {
    return formData.title && formData.campus &&
      formData.genderRequirement && formData.classTime && formData.classDate &&
      formData.reward && formData.description && formData.contactInfo
  }

  // 获取今天的日期，用于设置日期输入的最小值
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0]
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
              disabled={loading}
              className="text-white hover:text-blue-200 text-2xl transition-colors disabled:opacity-50"
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
                  placeholder="例如：今天三四节本部专业课找代课"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
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
                  disabled={loading}
                >
                  <option value="">选择校区</option>
                  {campuses.map(campus => (
                    <option key={campus} value={campus}>{campus}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  性别要求 *
                </label>
                <select
                  required
                  value={formData.genderRequirement}
                  onChange={(e) => setFormData({ ...formData, genderRequirement: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                >
                  <option value="">性别要求</option>
                  {genders.map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  任课老师
                </label>
                <input
                  type="text"
                  placeholder="例如：张老师"
                  value={formData.teacher}
                  onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                />
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
                  placeholder="例如：第1-2节 (8:00-9:40)"
                  value={formData.classTime}
                  onChange={(e) => setFormData({ ...formData, classTime: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  上课日期 *
                </label>
                <input
                  type="date"
                  required
                  min={getTodayDate()}
                  value={formData.classDate}
                  onChange={(e) => setFormData({ ...formData, classDate: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
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
                      onClick={() => setFormData({ ...formData, courseType: type.value })}
                      disabled={loading}
                      className={`p-3 border-2 rounded-xl text-center transition-all ${formData.courseType === type.value
                        ? 'border-blue-500 bg-blue-50 shadow-sm'
                        : 'border-gray-300 hover:border-gray-400'
                        } disabled:opacity-50`}
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
                    placeholder="例如：30 或 30元"
                    value={formData.reward}
                    onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={loading}
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
                    disabled={loading}
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
                disabled={loading}
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
                value={formData.contactInfo}
                onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              />
            </div>

            {/* 发布按钮 */}
            <button
              type="submit"
              disabled={!isFormValid() || loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  发布中...
                </>
              ) : (
                '🚀 发布代课需求'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}