'use client'

import { useState } from 'react'
import ShareModal from './components/ShareModal'

// 模拟趣事数据
const mockStories = [
  {
    id: 1,
    content: '今天在图书馆看到一个同学边看书边吃泡面，结果把书页当餐巾纸擦嘴了 😂 提醒他之后整个人都石化了！',
    author: '图书馆观察员',
    images: ['😂'],
    likes: 24,
    comments: 8,
    shares: 3,
    tags: ['图书馆', '搞笑'],
    time: '2小时前',
    hot: true,
    liked: false
  },
  {
    id: 2,
    content: '分享一个学习小技巧：用番茄工作法真的效率超高！25分钟专注学习+5分钟休息，今天完成了所有作业 🎉',
    author: '学习达人',
    images: ['📚', '⏰'],
    likes: 18,
    comments: 5,
    shares: 12,
    tags: ['学习技巧', '效率'],
    time: '5小时前',
    hot: true,
    liked: true
  },
  {
    id: 3,
    content: '校园里的樱花全开了！分享几张今天拍的照片，真的太美了～',
    author: '摄影爱好者',
    images: ['🌸', '🌸', '🌸'],
    likes: 32,
    comments: 15,
    shares: 8,
    tags: ['校园美景', '摄影'],
    time: '1天前',
    hot: false,
    liked: false
  },
  {
    id: 4,
    content: '刚刚在食堂打饭，阿姨给我打了超级多的菜，说是今天最后一份了！大学里的小确幸 💕',
    author: '幸运儿',
    images: ['🍛'],
    likes: 12,
    comments: 3,
    shares: 1,
    tags: ['食堂', '小确幸'],
    time: '3小时前',
    hot: false,
    liked: false
  },
  {
    id: 5,
    content: '有没有同学也喜欢夜跑的？今晚操场见！🏃‍♂️ 一起燃烧卡路里～',
    author: '运动健将',
    images: ['🏃‍♂️', '🌙'],
    likes: 9,
    comments: 6,
    shares: 2,
    tags: ['夜跑', '运动'],
    time: '6小时前',
    hot: false,
    liked: true
  }
]

// 模拟评论数据
const mockComments = [
  {
    id: 1,
    storyId: 1,
    content: '哈哈哈哈我也看到了！当时憋笑憋得好辛苦',
    author: '吃瓜群众',
    likes: 5,
    time: '1小时前'
  },
  {
    id: 2,
    storyId: 1,
    content: '这画面感太强了，已经开始脚趾抠地了',
    author: '尴尬症患者',
    likes: 3,
    time: '45分钟前'
  }
]

export default function SharePage() {
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'hot'>('all')
  const [selectedTag, setSelectedTag] = useState('全部')
  const [expandedComments, setExpandedComments] = useState<number | null>(null)
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({})
  const [stories, setStories] = useState(mockStories)

  const tags = ['全部', '搞笑', '学习技巧', '校园美景', '运动', '小确幸', '其他']

  const filteredStories = stories.filter(story => {
    const matchesTab = activeTab === 'all' || (activeTab === 'hot' && story.hot)
    const matchesTag = selectedTag === '全部' || story.tags.includes(selectedTag)
    return matchesTab && matchesTag
  })

  const handleLike = (storyId: number) => {
    setStories(stories.map(story =>
      story.id === storyId
        ? {
          ...story,
          likes: story.liked ? story.likes - 1 : story.likes + 1,
          liked: !story.liked
        }
        : story
    ))
  }

  const handleComment = (storyId: number) => {
    const comment = commentInputs[storyId]
    if (comment && comment.trim()) {
      console.log('发布评论:', { storyId, comment })
      // 这里后续会连接后端API
      setCommentInputs({ ...commentInputs, [storyId]: '' })
      alert('评论发布成功！')
    }
  }

  const handleShare = (storyId: number) => {
    console.log('分享动态:', storyId)
    // 这里后续会实现分享功能
    navigator.clipboard.writeText(window.location.href)
    alert('链接已复制到剪贴板！')
  }

  const toggleComments = (storyId: number) => {
    setExpandedComments(expandedComments === storyId ? null : storyId)
  }

  const getStoryComments = (storyId: number) => {
    return mockComments.filter(comment => comment.storyId === storyId)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">趣事分享</h1>
          <p className="text-gray-600 text-lg">分享校园点滴，记录美好时光</p>
        </div>

        {/* 发布按钮 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <button
                onClick={() => setShowModal(true)}
                className="w-full text-left p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-pink-400 hover:bg-pink-50 transition-all text-gray-500 hover:text-gray-700"
              >
                💭 分享你的校园趣事...
              </button>
            </div>
          </div>
        </div>

        {/* 筛选栏 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* 标签切换 */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'all'
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                全部动态
              </button>
              <button
                onClick={() => setActiveTab('hot')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'hot'
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                🔥 热门
              </button>
            </div>

            {/* 标签筛选 */}
            <div className="flex gap-2 overflow-x-auto">
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`whitespace-nowrap px-3 py-2 rounded-lg text-sm transition-colors ${selectedTag === tag
                    ? 'bg-pink-100 text-pink-700 border border-pink-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 动态列表 */}
        <div className="space-y-6">
          {filteredStories.map((story) => (
            <div key={story.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="p-6">
                {/* 动态头部 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {story.author.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{story.author}</h3>
                      <p className="text-sm text-gray-500">{story.time}</p>
                    </div>
                  </div>
                  {story.hot && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                      热门
                    </span>
                  )}
                </div>

                {/* 动态内容 */}
                <div className="mb-4">
                  <p className="text-gray-800 leading-relaxed text-lg">{story.content}</p>
                </div>

                {/* 图片展示 */}
                {story.images && story.images.length > 0 && (
                  <div className={`grid gap-2 mb-4 ${story.images.length === 1 ? 'grid-cols-1' :
                    story.images.length === 2 ? 'grid-cols-2' :
                      'grid-cols-3'
                    }`}>
                    {story.images.map((image, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl h-32 flex items-center justify-center text-4xl hover:scale-105 transition-transform cursor-pointer"
                      >
                        {image}
                      </div>
                    ))}
                  </div>
                )}

                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {story.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* 互动统计 */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span>{story.likes} 点赞</span>
                  <span>{story.comments} 评论</span>
                  <span>{story.shares} 分享</span>
                </div>

                {/* 互动按钮 */}
                <div className="flex border-t border-b border-gray-200 py-3">
                  <button
                    onClick={() => handleLike(story.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${story.liked
                      ? 'text-pink-600 bg-pink-50'
                      : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {story.liked ? '❤️' : '🤍'} 点赞
                  </button>
                  <button
                    onClick={() => toggleComments(story.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    💬 评论
                  </button>
                  <button
                    onClick={() => handleShare(story.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    🔗 分享
                  </button>
                </div>

                {/* 评论区域 */}
                {expandedComments === story.id && (
                  <div className="mt-4">
                    {/* 评论列表 */}
                    {getStoryComments(story.id).map(comment => (
                      <div key={comment.id} className="flex gap-3 mb-4 last:mb-0">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-2xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm text-gray-800">{comment.author}</span>
                              <span className="text-xs text-gray-500">{comment.time}</span>
                            </div>
                            <p className="text-gray-700 text-sm">{comment.content}</p>
                          </div>
                          <div className="flex items-center gap-4 mt-1 px-2">
                            <button className="text-xs text-gray-500 hover:text-gray-700">
                              回复
                            </button>
                            <button className="text-xs text-gray-500 hover:text-gray-700">
                              👍 {comment.likes}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* 评论输入框 */}
                    <div className="flex gap-3 mt-4">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="写下你的评论..."
                            value={commentInputs[story.id] || ''}
                            onChange={(e) => setCommentInputs({
                              ...commentInputs,
                              [story.id]: e.target.value
                            })}
                            className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleComment(story.id)
                              }
                            }}
                          />
                          <button
                            onClick={() => handleComment(story.id)}
                            className="px-4 py-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors"
                          >
                            发送
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 发布动态弹窗 */}
        {showModal && (
          <ShareModal
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  )
}