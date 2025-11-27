'use client'

import { useState } from 'react'

interface SecondhandModalProps {
  onClose: () => void
  onSuccess: () => void
}

interface FormData {
  title: string
  category: string
  condition: string
  price: string
  originalPrice: string
  description: string
  location: string
  contact: string
  urgent: boolean
}

// 直接在组件内部定义API地址，避免传递问题
const API_BASE_URL = 'http://localhost:8081/api/secondhand';

export default function SecondhandModal({ onClose, onSuccess }: SecondhandModalProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    category: '电子产品',
    condition: '九成新',
    price: '',
    originalPrice: '',
    description: '',
    location: '主校区',
    contact: '',
    urgent: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const categories = ['电子产品', '书籍资料', '服饰鞋包', '生活用品', '运动器材', '其他']
  const conditions = ['全新', '九成新', '八成新', '七成新', '六成新及以下']
  const campuses = ['主校区', '东校区', '西校区', '南校区', '北校区']

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) setError(null)
  }

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setError('请输入商品标题')
      return false
    }
    if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      setError('请输入有效的出售价格')
      return false
    }
    if (!formData.description.trim()) {
      setError('请输入商品描述')
      return false
    }
    if (!formData.contact.trim()) {
      setError('请输入联系方式')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      // 构造符合后端要求的提交数据
      const submitData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        category: formData.category,
        condition: formData.condition,
        location: formData.location,
        contact: formData.contact,
        urgent: formData.urgent,
        images: [] // 后端要求有这个字段
      }

      console.log('📤 提交数据到:', API_BASE_URL)
      console.log('📤 提交数据:', submitData)

      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`发布失败: ${response.status} - ${errorText}`)
      }

      const result = await response.json()
      console.log('✅ 发布成功:', result)

      alert('🎉 商品发布成功！')
      onSuccess()

    } catch (err: any) {
      console.error('❌ 发布失败:', err)
      setError(err.message || '发布失败，请检查后端服务是否启动')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* 头部 */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">发布闲置商品</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 调试信息 */}
          <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
            <strong>API端点:</strong> {API_BASE_URL}
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </div>
          )}

          {/* 表单 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 商品标题 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                商品标题 <span className="text-red-500">*</span>
              </label>
              <input
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="例如：九成新 iPad Air"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* 价格信息 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  出售价格 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">¥</span>
                  <input
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="0.00"
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  原价（可选）
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">¥</span>
                  <input
                    value={formData.originalPrice}
                    onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                    placeholder="0.00"
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* 分类和成色 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  商品分类
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  商品成色
                </label>
                <select
                  value={formData.condition}
                  onChange={(e) => handleInputChange('condition', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 校区和联系方式 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  所在校区
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {campuses.map(campus => (
                    <option key={campus} value={campus}>{campus}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  联系方式 <span className="text-red-500">*</span>
                </label>
                <input
                  value={formData.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  placeholder="手机号或微信"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* 商品描述 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                商品描述 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="请详细描述商品的状况、特点、使用情况等..."
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                required
              />
            </div>

            {/* 急出选项 */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.urgent}
                onChange={(e) => handleInputChange('urgent', e.target.checked)}
                id="urgent"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="urgent" className="text-sm font-medium text-gray-700">
                标记为急出商品
              </label>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors duration-200 disabled:opacity-50"
              >
                取消
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    发布中...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    发布商品
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}