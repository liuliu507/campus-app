'use client'

import { useState } from 'react'
import SecondhandModal from './components/SecondhandModal'

// 模拟商品数据
const mockProducts = [
  {
    id: 1,
    title: '九成新 iPad Air',
    price: '1800元',
    originalPrice: '2400元',
    category: '电子产品',
    condition: '九成新',
    description: '保护得很好，无任何划痕，配件齐全',
    images: ['📱'],
    contact: '138****1234',
    location: '主校区',
    time: '2小时前',
    urgent: true
  },
  {
    id: 2,
    title: '数据结构教材',
    price: '25元',
    originalPrice: '50元',
    category: '书籍资料',
    condition: '七成新',
    description: '有少量笔记，不影响阅读',
    images: ['📚'],
    contact: '139****5678',
    location: '东校区',
    time: '1天前',
    urgent: false
  },
  {
    id: 3,
    title: '篮球鞋',
    price: '120元',
    originalPrice: '300元',
    category: '服饰鞋包',
    condition: '八成新',
    description: '只穿过几次，鞋底磨损很少',
    images: ['👟'],
    contact: '137****9012',
    location: '西校区',
    time: '3天前',
    urgent: false
  }
]

export default function SecondhandPage() {
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'sell' | 'buy'>('buy')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('全部')

  const categories = ['全部', '电子产品', '书籍资料', '服饰鞋包', '生活用品', '运动器材', '其他']

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === '全部' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">二手交易</h1>
          <p className="text-gray-600 text-lg">闲置物品循环利用，环保又实惠</p>
        </div>

        {/* 搜索和筛选栏 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* 搜索框 */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="🔍 搜索商品名称或描述..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* 分类筛选 */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors ${selectedCategory === category
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* 发布按钮 */}
            <button
              onClick={() => setShowModal(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-xl whitespace-nowrap transition-colors"
            >
              🛒 发布闲置
            </button>
          </div>
        </div>

        {/* 商品网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              {/* 商品图片 */}
              <div className="h-48 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-6xl">
                {product.images[0]}
              </div>

              <div className="p-6">
                {/* 商品标题和紧急标识 */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-800 flex-1">{product.title}</h3>
                  {product.urgent && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium ml-2">
                      急出
                    </span>
                  )}
                </div>

                {/* 价格信息 */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-orange-600">{product.price}</span>
                  <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                </div>

                {/* 商品信息 */}
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <span>🏷️ {product.category}</span>
                    <span>⭐ {product.condition}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📍 {product.location}</span>
                    <span>⏰ {product.time}</span>
                  </div>
                </div>

                {/* 商品描述 */}
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{product.description}</p>

                {/* 操作按钮 */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    💬 联系卖家
                  </button>
                  <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    🤍 收藏
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 发布商品弹窗 */}
        {showModal && (
          <SecondhandModal
            onClose={() => setShowModal(false)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
      </div>
    </div>
  )
}