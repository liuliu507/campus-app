'use client'

import { useState, useEffect } from 'react'
import SecondhandModal from './components/SecondhandModal'

// 直接连接后端
const API_BASE_URL = 'http://localhost:8081/api/secondhand';

interface SecondhandProduct {
  id: number
  title: string
  description: string
  price: number
  originalPrice?: number
  category: string
  condition: string
  location: string
  contact: string
  images?: string[]
  urgent?: boolean
  status?: string
  viewCount?: number
  likeCount?: number
  createdAt?: string
  sellerName?: string
}

// 降级用的模拟数据
const mockProducts: SecondhandProduct[] = [
  {
    id: 1,
    title: '九成新 iPad Air',
    description: '保护得很好，无任何划痕，配件齐全',
    price: 1800,
    originalPrice: 2400,
    category: '电子产品',
    condition: '九成新',
    location: '主校区',
    contact: '138****1234',
    images: ['📱'],
    urgent: true,
    status: 'AVAILABLE',
    viewCount: 25,
    likeCount: 8,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    sellerName: '匿名用户'
  },
  {
    id: 2,
    title: '数据结构教材',
    description: '有少量笔记，不影响阅读',
    price: 25,
    originalPrice: 60,
    category: '书籍资料',
    condition: '七成新',
    location: '东校区',
    contact: '微信: study2024',
    images: ['📚'],
    status: 'AVAILABLE',
    viewCount: 15,
    likeCount: 3,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    sellerName: '匿名用户'
  },
  {
    id: 3,
    title: '篮球鞋',
    description: '只穿过几次，鞋底磨损很少',
    price: 120,
    originalPrice: 900,
    category: '服饰鞋包',
    condition: '八成新',
    location: '西校区',
    contact: 'QQ: 123456789',
    images: ['👟'],
    status: 'AVAILABLE',
    viewCount: 32,
    likeCount: 5,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    sellerName: '匿名用户'
  }
]

export default function SecondhandPage() {
  const [showModal, setShowModal] = useState(false)
  const [products, setProducts] = useState<SecondhandProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('全部')

  const categories = ['全部', '电子产品', '书籍资料', '服饰鞋包', '生活用品', '运动器材', '其他']

  // 获取商品数据
  const loadProducts = async () => {
    setLoading(true)
    setError('')

    try {
      console.log('🔄 直接连接后端:', API_BASE_URL)

      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache'
      })

      console.log('📡 后端响应状态:', response.status)

      if (!response.ok) {
        throw new Error(`后端请求失败: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('✅ 后端返回数据：', data)

      if (Array.isArray(data) && data.length > 0) {
        setProducts(data)
        setError('')
      } else {
        // 如果后端返回空数组，使用模拟数据
        setProducts(mockProducts)
        setError('后端无数据，使用模拟数据')
      }
    } catch (err: any) {
      console.error('❌ 加载商品失败', err)
      // 连接失败时使用模拟数据
      setProducts(mockProducts)
      setError(`后端连接失败: ${err.message}，使用模拟数据演示`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  // 搜索和分类过滤
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === '全部' || product.category === selectedCategory
    const matchesSearch = !searchTerm ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // 发布成功后的回调
  const handleProductPublished = () => {
    setShowModal(false)
    loadProducts() // 重新加载商品列表
  }

  // 格式化时间显示
  const formatTime = (timeString?: string) => {
    if (!timeString) return '未知时间';

    const time = new Date(timeString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return '刚刚'
    } else if (diffInHours < 24) {
      return `${diffInHours}小时前`
    } else {
      return `${Math.floor(diffInHours / 24)}天前`
    }
  }

  // 手动重试连接
  const handleRetry = () => {
    loadProducts()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 头部 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            二手交易
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            闲置物品循环利用，让环保与实惠触手可及
          </p>
        </div>

        {/* 搜索和筛选区域 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center mb-6">
            {/* 搜索框 */}
            <div className="flex-1 w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="搜索商品名称或描述..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* 分类筛选 */}
            <div className="w-full lg:w-auto">
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* 发布按钮 */}
            <button
              onClick={() => setShowModal(true)}
              className="w-full lg:w-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              发布闲置
            </button>
          </div>

          {/* 统计信息和错误提示 */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-6 text-sm text-gray-600 justify-center">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                共 {products.length} 件商品
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                {products.filter(p => p.condition === '全新').length} 件全新
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                {products.filter(p => p.category === '电子产品').length} 件电子产品
              </span>
            </div>

            {error && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-yellow-800 font-medium">{error}</p>
                      <p className="text-yellow-700 text-sm mt-1">后端地址: {API_BASE_URL}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleRetry}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    重试连接
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 加载状态 */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">正在加载商品数据...</p>
            </div>
          </div>
        )}

        {/* 商品网格 */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                {/* 商品图片 */}
                <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <div className="text-6xl">{product.images[0]}</div>
                  ) : (
                    <div className="text-6xl text-gray-400">📦</div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  </div>
                  {product.urgent && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        急出
                      </span>
                    </div>
                  )}
                </div>

                {/* 商品信息 */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
                    {product.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* 价格信息 */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-red-500">
                      ¥{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ¥{product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* 商品元信息 */}
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>{product.condition}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span>{product.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                      <span>{formatTime(product.createdAt)}</span>
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (product.contact) {
                          alert(`卖家联系方式: ${product.contact}`)
                        } else {
                          alert('该卖家暂未提供联系方式')
                        }
                      }}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-center"
                    >
                      联系卖家
                    </button>
                    <button
                      onClick={() => console.log('收藏:', product.id)}
                      className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 空状态 */}
        {!loading && filteredProducts.length === 0 && products.length > 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">未找到商品</h3>
            <p className="text-gray-600 mb-8">没有找到符合条件的商品，尝试调整搜索条件</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('全部'); }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors duration-200"
            >
              重置筛选
            </button>
          </div>
        )}

        {/* 模态框 */}
        {showModal && (
          <SecondhandModal
            onClose={() => setShowModal(false)}
            onSuccess={handleProductPublished}
          />
        )}
      </div>
    </div>
  )
}