"use client";

import { useEffect, useState } from "react";
import ShareModal from "./components/ShareModal";

interface Share {
  id: number;
  content: string;
  userId: number;
  imageUrl?: string;
  createdAt: string;
  likes?: number;
  comments?: number;
  publisherName?: string;
}

export default function SharePage() {
  const [shares, setShares] = useState<Share[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadShares = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://campus-backend-1-uo30.onrender.com/api/share/all");
      const data = await res.json();
      setShares(data);
    } catch (error) {
      console.error("加载趣事失败:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShares();
  }, []);

  // 删除趣事
  const handleDelete = async (id: number) => {
    if (!confirm("确定要删除这条趣事吗？此操作不可撤销。")) {
      return;
    }

    try {
      setDeletingId(id);
      const response = await fetch(`https://campus-backend-1-uo30.onrender.com/api/share/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // 从本地状态中移除已删除的趣事
        setShares(shares.filter(share => share.id !== id));
        console.log("删除成功");
      } else {
        throw new Error("删除失败");
      }
    } catch (error) {
      console.error("删除趣事失败:", error);
      alert("删除失败，请重试");
    } finally {
      setDeletingId(null);
    }
  };

  // 搜索过滤
  const filteredShares = shares.filter(share =>
    share.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 统计数据
  const totalShares = shares.length;
  const sharesWithImages = shares.filter(share => share.imageUrl).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 页面标题和统计 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">趣事分享</h1>
          <p className="text-gray-600 text-lg">分享校园生活中的有趣瞬间，传递快乐与温暖</p>

          {/* 统计信息 */}
          <div className="flex justify-center gap-8 mt-6">
            <div className="bg-purple-50 px-6 py-3 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">{totalShares}</div>
              <div className="text-purple-700">总分享数</div>
            </div>
            <div className="bg-green-50 px-6 py-3 rounded-xl">
              <div className="text-2xl font-bold text-green-600">{sharesWithImages}</div>
              <div className="text-green-700">带图分享</div>
            </div>
            <div className="bg-orange-50 px-6 py-3 rounded-xl">
              <div className="text-2xl font-bold text-orange-600">{shares.length > 0 ? Math.round(shares.reduce((acc, share) => acc + (share.likes || 0), 0) / shares.length) : 0}</div>
              <div className="text-orange-700">平均点赞</div>
            </div>
          </div>
        </div>

        {/* 搜索和操作栏 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* 搜索框 */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="🔍 搜索趣事内容..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* 发布按钮 */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors shadow-lg flex items-center gap-2"
            >
              <span>✨</span>
              分享趣事
            </button>
          </div>
        </div>

        {/* 加载状态 */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">加载趣事中...</p>
          </div>
        )}

        {/* 趣事列表 */}
        {!loading && (
          <div className="space-y-6">
            {filteredShares.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <div className="text-6xl mb-4">😂</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {searchTerm ? "没有找到相关趣事" : "暂无趣事分享"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm ? "换个关键词试试看" : "快来分享第一个有趣的故事吧！"}
                </p>
                {!searchTerm && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl"
                  >
                    分享趣事
                  </button>
                )}
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl"
                  >
                    清空搜索
                  </button>
                )}
              </div>
            ) : (
              filteredShares.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] border-l-4 border-l-purple-500"
                >
                  <div className="p-6">
                    {/* 用户信息和时间 */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                          {item.publisherName?.charAt(0) || "用"}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">
                            {item.publisherName || `用户${item.userId}`}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(item.createdAt).toLocaleString('zh-CN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-400">
                          #{item.id.toString().padStart(4, '0')}
                        </div>
                        {/* 删除按钮 */}
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={deletingId === item.id}
                          className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors disabled:bg-red-50 disabled:text-red-400 disabled:cursor-not-allowed text-sm"
                        >
                          {deletingId === item.id ? (
                            <>
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-600"></div>
                              删除中
                            </>
                          ) : (
                            <>
                              <span>🗑️</span>
                              删除
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* 内容 */}
                    <div className="mb-4">
                      <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-line">
                        {item.content}
                      </p>
                    </div>

                    {/* 图片 */}
                    {item.imageUrl && (
                      <div className="mb-4">
                        <img
                          src={item.imageUrl}
                          alt="趣事图片"
                          className="w-full max-w-md rounded-xl shadow-md"
                        />
                      </div>
                    )}

                    {/* 互动按钮 */}
                    <div className="flex gap-6 text-sm text-gray-600">
                      <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                        <span className="text-lg">❤️</span>
                        <span>点赞 ({item.likes || 0})</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                        <span className="text-lg">💬</span>
                        <span>评论 ({item.comments || 0})</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
                        <span className="text-lg">🔄</span>
                        <span>转发</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-purple-500 transition-colors">
                        <span className="text-lg">⭐</span>
                        <span>收藏</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* 发布趣事弹窗 */}
        <ShareModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={loadShares}
        />
      </div>
    </div>
  );
}