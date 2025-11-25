'use client'

import { useState } from 'react'

interface ErrandModalProps {
  onClose: () => void
}

export default function ErrandModal({ onClose }: ErrandModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    fromLocation: '',
    toLocation: '',
    price: '',
    weight: '',
    quantity: '',
    deadline: '',
    description: '',
    contact: '',
    urgency: '一般'
  })

  const categories = [
    { value: '取送物品', label: '取送物品', emoji: '📦', description: '快递、文件等物品取送' },
    { value: '文件传递', label: '文件传递', emoji: '📄', description: '重要文件紧急传递' },
    { value: '餐饮代购', label: '餐饮代购', emoji: '🍔', description: '外卖、奶茶等代买' },
    { value: '商品代购', label: '商品代购', emoji: '🛒', description: '超市、商场商品代购' },
    { value: '文印服务', label: '文印服务', emoji: '🖨️', description: '打印、复印资料' },
    { value: '其他', label: '其他服务', emoji: '🔧', description: '其他类型跑腿' }
  ]

  const weightOptions = [
    { value: '轻物（＜1kg）', label: '轻物（＜1kg）' },
    { value: '中等（1-5kg）', label: '中等（1-5kg）' },
    { value: '重物（5-10kg）', label: '重物（5-10kg）' },
    { value: '很重（＞10kg）', label: '很重（＞10kg）' }
  ]

  const urgencyLevels = [
    { value: '一般', label: '一般', color: 'text-gray-600' },
    { value: '紧急', label: '紧急', color: 'text-orange-600' },
    { value: '非常紧急', label: '非常紧急', color: 'text-red-600 font-bold' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('发布跑腿需求:', formData)
    alert('跑腿需求发布成功！等待同学接单')
    onClose()
  }

  const isFormValid = () => {
    return formData.title && formData.category && formData.fromLocation &&
      formData.toLocation && formData.price && formData.weight &&
      formData.quantity && formData.deadline && formData.description && formData.contact
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* 弹窗头部 */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">发布跑腿需求</h2>
              <p className="text-green-100 text-sm mt-1">详细填写信息，更快找到合适的跑腿</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-green-200 text-2xl transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* 弹窗内容 */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 基础信息 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                任务标题 *
              </label>
              <input
                type="text"
                required
                placeholder="例如：取快递、送文件、买奶茶"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* 分类选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                任务分类 *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {categories.map(category => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: category.value })}
                    className={`p-3 border-2 rounded-xl text-center transition-all ${formData.category === category.value
                      ? 'border-green-500 bg-green-50 shadow-sm'
                      : 'border-gray-300 hover:border-gray-400'
                      }`}
                  >
                    <div className="text-lg mb-1">{category.emoji}</div>
                    <div className="font-medium text-sm">{category.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{category.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 位置信息 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  取件地点 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如：菜鸟驿站、行政楼301"
                  value={formData.fromLocation}
                  onChange={(e) => setFormData({ ...formData, fromLocation: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  送达地点 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如：学生公寓3号楼、图书馆前台"
                  value={formData.toLocation}
                  onChange={(e) => setFormData({ ...formData, toLocation: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* 任务规格 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  预估重量 *
                </label>
                <select
                  required
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">选择重量</option>
                  {weightOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  物品数量 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如：2个包裹、1份文件"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  完成时限 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如：今天18:00前、2小时内"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* 报酬和紧急程度 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  报酬金额 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如：8元、15元"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  紧急程度
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {urgencyLevels.map(level => (
                    <option key={level.value} value={level.value} className={level.color}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 详细描述 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                详细要求 *
              </label>
              <textarea
                required
                placeholder="请详细说明跑腿要求：
• 物品的具体信息
• 取件和送达的具体位置
• 特殊要求（如：要冰的、要发票等）
• 其他注意事项"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
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
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* 发布按钮 */}
            <button
              type="submit"
              disabled={!isFormValid()}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              🚀 发布跑腿需求
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}