'use client'

import { useState } from 'react'

interface SecondhandModalProps {
  onClose: () => void
  activeTab: 'sell' | 'buy'
  setActiveTab: (tab: 'sell' | 'buy') => void
}

export default function SecondhandModal({ onClose, activeTab, setActiveTab }: SecondhandModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    condition: '',
    price: '',
    originalPrice: '',
    description: '',
    location: '',
    contact: '',
    urgent: false
  })

  const categories = ['电子产品', '书籍资料', '服饰鞋包', '生活用品', '运动器材', '其他']
  const conditions = ['全新', '九成新', '八成新', '七成新', '六成新及以下']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('发布商品:', formData)
    // 这里后续会连接后端API
    alert('商品发布成功！')
    onClose()
  }

  const handleContactSeller = (productId: number) => {
    console.log('联系卖家:', productId)
    alert('已复制卖家联系方式到剪贴板')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* 弹窗头部 */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">二手交易</h2>
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
              onClick={() => setActiveTab('sell')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'sell'
                  ? 'bg-white text-orange-600 shadow-lg'
                  : 'bg-orange-500 text-white hover:bg-orange-400'
                }`}
            >
              🛒 我要卖货
            </button>
            <button
              onClick={() => setActiveTab('buy')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'buy'
                  ? 'bg-white text-orange-600 shadow-lg'
                  : 'bg-orange-500 text-white hover:bg-orange-400'
                }`}
            >
              🔍 我要买货
            </button>
          </div>
        </div>

        {/* 弹窗内容 */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'sell' ? (
            // 发布商品表单
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  商品标题 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如：九成新 iPad Air"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    商品分类 *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">选择分类</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    商品成色 *
                  </label>
                  <select
                    required
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">选择成色</option>
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    出售价格 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：1800元"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    原价（可选）
                  </label>
                  <input
                    type="text"
                    placeholder="例如：2400元"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  交易地点 *
                </label>
                <select
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">选择交易地点</option>
                  <option value="主校区">主校区</option>
                  <option value="东校区">东校区</option>
                  <option value="西校区">西校区</option>
                  <option value="新校区">新校区</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  商品描述 *
                </label>
                <textarea
                  required
                  placeholder="详细描述商品的状况、使用情况、配件等信息..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={formData.urgent}
                  onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="urgent" className="ml-2 text-sm text-gray-700">
                  标记为急出商品
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors"
              >
                🚀 发布商品
              </button>
            </form>
          ) : (
            // 买货页面 - 搜索和筛选
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">寻找心仪商品</h3>
                <p className="text-gray-600 mb-6">在主页面可以浏览和搜索所有二手商品</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <h4 className="font-bold text-amber-800 mb-2">💡 购物小贴士</h4>
                <ul className="text-amber-700 text-sm space-y-1">
                  <li>• 交易前仔细检查商品状况</li>
                  <li>• 尽量选择当面交易</li>
                  <li>• 确认价格和配件是否齐全</li>
                  <li>• 注意个人财产安全</li>
                </ul>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
              >
                返回浏览商品
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}