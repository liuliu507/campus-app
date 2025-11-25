'use client'

import { useState } from 'react'
import ReviewsModal from './components/ReviewsModal'

// 模拟评价数据
const mockReviews = [
  {
    id: 1,
    title: '高等数学 - 张老师',
    type: '红榜',
    category: '课程评价',
    rating: 5,
    content: '老师讲课非常清晰，重点突出，作业量适中，考试公平。强烈推荐！',
    author: '匿名用户',
    likes: 24,
    dislikes: 2,
    tags: ['讲课清晰', '考试公平', '作业适中'],
    time: '2小时前',
    verified: true
  },
  {
    id: 2,
    title: '校园西餐厅',
    type: '黑榜',
    category: '商家评价',
    rating: 1,
    content: '服务态度极差，菜品质量下降严重，价格还涨了。不会再去了！',
    author: '吃货小张',
    likes: 18,
    dislikes: 1,
    tags: ['服务差', '性价比低'],
    time: '1天前',
    verified: true
  },
  {
    id: 3,
    title: '数据结构课程',
    type: '红榜',
    category: '课程评价',
    rating: 4,
    content: '虽然难度较大，但老师很负责，学完后收获满满。建议认真听讲！',
    author: '编程爱好者',
    likes: 15,
    dislikes: 3,
    tags: ['收获大', '老师负责'],
    time: '2天前',
    verified: false
  },
  {
    id: 4,
    title: '某快递代收点',
    type: '黑榜',
    category: '服务评价',
    rating: 2,
    content: '经常找不到快递，工作人员态度不耐烦，排队时间太长。',
    author: '匿名用户',
    likes: 12,
    dislikes: 0,
    tags: ['效率低', '态度差'],
    time: '3天前',
    verified: true
  }
]

export default function ReviewsPage() {
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'red' | 'black'>('red')
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['全部', '课程评价', '老师评价', '商家评价', '服务评价', '其他']

  const filteredReviews = mockReviews.filter(review => {
    const matchesTab = activeTab === 'red' ? review.type === '红榜' : review.type === '黑榜'
    const matchesSearch = review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === '全部' || review.category === selectedCategory
    return matchesTab && matchesSearch && matchesCategory
  })

  const handleLike = (reviewId: number) => {
    console.log('点赞评价:', reviewId)
    // 这里后续会连接后端API
  }

  const handleDislike = (reviewId: number) => {
    console.log('点踩评价:', reviewId)
    // 这里后续会连接后端API
  }

  const getRatingStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">红黑榜</h1>
          <p className="text-gray-600 text-lg">真实评价，避坑指南，校园生活更美好</p>
        </div>

        {/* 主标签切换 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* 红黑榜切换 */}
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('red')}
                className={`flex-1 px-6 py-4 rounded-xl font-bold text-lg transition-all ${activeTab === 'red'
                  ? 'bg-red-100 text-red-700 border-2 border-red-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                🔥 红榜推荐
              </button>
              <button
                onClick={() => setActiveTab('black')}
                className={`flex-1 px-6 py-4 rounded-xl font-bold text-lg transition-all ${activeTab === 'black'
                  ? 'bg-gray-800 text-white border-2 border-gray-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                ⚫ 黑榜避雷
              </button>
            </div>

            {/* 搜索框 */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="🔍 搜索评价内容..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* 分类筛选 */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* 发布评价按钮 */}
            <button
              onClick={() => setShowModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl whitespace-nowrap transition-colors"
            >
              ✍️ 发布评价
            </button>
          </div>

          {/* 统计信息 */}
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>
              共找到 <span className="font-bold text-red-600">{filteredReviews.length}</span> 条{activeTab === 'red' ? '红榜' : '黑榜'}评价
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                红榜推荐
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-gray-800 rounded-full"></span>
                黑榜避雷
              </span>
            </div>
          </div>
        </div>

        {/* 评价列表 */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div key={review.id} className={`rounded-2xl shadow-lg overflow-hidden border-2 ${review.type === '红榜' ? 'border-red-200 bg-white' : 'border-gray-300 bg-gray-50'
              }`}>
              {/* 评价头部 */}
              <div className={`p-4 ${review.type === '红榜' ? 'bg-red-500 text-white' : 'bg-gray-800 text-white'
                }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{review.title}</h3>
                      {review.verified && (
                        <span className="bg-white text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                          已验证
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="bg-white bg-opacity-20 px-2 py-1 rounded">
                        {review.category}
                      </span>
                      <span>{getRatingStars(review.rating)}</span>
                      <span>by {review.author}</span>
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${review.type === '红榜' ? 'text-red-100' : 'text-gray-300'
                    }`}>
                    {review.type}
                  </div>
                </div>
              </div>

              {/* 评价内容 */}
              <div className="p-6">
                <p className="text-gray-700 mb-4 leading-relaxed">{review.content}</p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {review.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${review.type === '红榜'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-200 text-gray-700'
                        }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 互动和元信息 */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(review.id)}
                      className="flex items-center gap-1 hover:text-red-600 transition-colors"
                    >
                      <span>👍</span>
                      <span>{review.likes}</span>
                    </button>
                    <button
                      onClick={() => handleDislike(review.id)}
                      className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                    >
                      <span>👎</span>
                      <span>{review.dislikes}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <span>💬</span>
                      <span>评论</span>
                    </button>
                  </div>
                  <span>{review.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 发布评价弹窗 */}
        {showModal && (
          <ReviewsModal
            onClose={() => setShowModal(false)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
      </div>
    </div>
  )
}