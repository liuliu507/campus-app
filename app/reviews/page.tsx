"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ReviewModal from "./components/ReviewsModal";

interface Review {
  id: number;
  title: string;
  content: string;
  type: string; // red=红榜, black=黑榜
  createdAt: string;
  likes?: number;
  dislikes?: number;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "red" | "black">("all");
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8081/api/reviews/red-black");
      console.log("API返回数据:", res.data); // 调试用

      // 转换后端数据为前端需要的格式
      const transformedReviews = res.data.map((item: any) => ({
        id: item.id,
        title: item.targetName, // 后端返回的是 targetName
        content: item.content,
        // 根据评分判断类型：5分=红榜，1分=黑榜
        type: item.rating === 5 ? "red" : "black",
        createdAt: item.createdAt,
        likes: item.likes || 0,
        dislikes: 0 // 后端没有 dislikes 字段
      }));

      setReviews(transformedReviews);
    } catch (err) {
      console.error("获取红黑榜失败:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // 过滤评价
  const filteredReviews = reviews.filter(review =>
    filter === "all" || review.type === filter
  );

  // 统计数据 - 现在基于转换后的数据统计
  const redCount = reviews.filter(r => r.type === "red").length;
  const blackCount = reviews.filter(r => r.type === "black").length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 页面标题和统计 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">红黑榜</h1>
          <p className="text-gray-600 text-lg">分享你的课程评价和商家体验，帮助更多同学避坑</p>

          {/* 统计信息 */}
          <div className="flex justify-center gap-8 mt-6">
            <div className="bg-red-50 px-6 py-3 rounded-xl">
              <div className="text-2xl font-bold text-red-600">{redCount}</div>
              <div className="text-red-700">红榜推荐</div>
            </div>
            <div className="bg-gray-100 px-6 py-3 rounded-xl">
              <div className="text-2xl font-bold text-gray-800">{blackCount}</div>
              <div className="text-gray-700">黑榜避雷</div>
            </div>
            <div className="bg-blue-50 px-6 py-3 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">{reviews.length}</div>
              <div className="text-blue-700">总评价数</div>
            </div>
          </div>
        </div>

        {/* 操作栏 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* 筛选按钮 */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg transition-colors ${filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                全部
              </button>
              <button
                onClick={() => setFilter("red")}
                className={`px-4 py-2 rounded-lg transition-colors ${filter === "red"
                  ? "bg-red-600 text-white"
                  : "bg-red-100 text-red-700 hover:bg-red-200"
                  }`}
              >
                👍 红榜推荐
              </button>
              <button
                onClick={() => setFilter("black")}
                className={`px-4 py-2 rounded-lg transition-colors ${filter === "black"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                👎 黑榜避雷
              </button>
            </div>

            {/* 发布按钮 */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              ✏️ 发布评价
            </button>
          </div>
        </div>

        {/* 加载状态 */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">加载评价中...</p>
          </div>
        )}

        {/* 评价列表 */}
        {!loading && (
          <div className="space-y-6">
            {filteredReviews.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {filter === "all" ? "暂无评价" :
                    filter === "red" ? "暂无红榜推荐" : "暂无黑榜评价"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {filter === "all" ? "快来发布第一个评价吧！" :
                    `还没有${filter === "red" ? "红榜推荐" : "黑榜避雷"}的评价`}
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl"
                >
                  发布评价
                </button>
              </div>
            ) : (
              filteredReviews.map((item) => (
                <div
                  key={item.id}
                  className={`border-l-4 rounded-r-2xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] ${item.type === "red"
                    ? "border-l-red-500 bg-gradient-to-r from-red-50 to-white"
                    : "border-l-gray-700 bg-gradient-to-r from-gray-50 to-white"
                    }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className={`text-2xl ${item.type === "red" ? "text-red-500" : "text-gray-700"
                          }`}>
                          {item.type === "red" ? "👍" : "👎"}
                        </span>
                        <div>
                          <h2 className={`text-xl font-bold ${item.type === "red" ? "text-red-700" : "text-gray-800"
                            }`}>
                            {item.title}
                          </h2>
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-1 ${item.type === "red"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-200 text-gray-700"
                            }`}>
                            {item.type === "red" ? "红榜推荐" : "黑榜避雷"}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString('zh-CN')}
                      </span>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                      {item.content}
                    </p>

                    {/* 互动按钮 */}
                    <div className="flex gap-4 text-sm text-gray-600">
                      <button className="flex items-center gap-1 hover:text-green-600 transition-colors">
                        <span>👍</span>
                        <span>有用 ({item.likes || 0})</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                        <span>👎</span>
                        <span>无用 ({item.dislikes || 0})</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                        <span>💬</span>
                        <span>评论</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                        <span>🔗</span>
                        <span>分享</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* 发布评价弹窗 */}
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onReviewCreated={fetchReviews}
        />
      </div>
    </div>
  );
}