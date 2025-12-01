"use client";

import { useState } from "react";
import axios from "axios";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onReviewCreated: () => void;
}

export default function ReviewModal({ isOpen, onClose, onReviewCreated }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("red");
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    if (!title.trim() || !content.trim()) {
      alert("请填写标题和内容");
      return;
    }

    if (content.length < 10) {
      alert("评价内容至少需要10个字");
      return;
    }

    try {
      setLoading(true);

      // 准备后端需要的数据格式
      const requestData = {
        title: title,
        content: content,
        type: type,
        // 添加必要的字段
        publisherId: 1, // 暂时写死，后续从登录用户获取
        // 红榜=5分，黑榜=1分
        rating: type === "red" ? 5 : 1
      };

      console.log("提交数据:", requestData); // 调试用

      await axios.post("https://campus-backend-1-uo30.onrender.com/api/reviews/red-black", requestData);

      setTitle("");
      setContent("");
      setType("red");
      onReviewCreated();
      onClose();
      alert("评价发布成功！");
    } catch (err: any) {
      console.error("创建红黑榜失败:", err);
      console.error("错误详情:", err.response?.data); // 调试用
      alert(`发布失败: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* 弹窗头部 */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">发布评价</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl"
            >
              ✕
            </button>
          </div>
        </div>

        {/* 弹窗内容 */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-6">
            {/* 类型选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                评价类型 *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setType("red")}
                  className={`p-4 rounded-xl border-2 transition-all ${type === "red"
                    ? "border-red-500 bg-red-50 text-red-700 shadow-lg"
                    : "border-gray-300 bg-white text-gray-700 hover:border-red-300"
                    }`}
                >
                  <div className="text-2xl mb-2">👍</div>
                  <div className="font-semibold">红榜推荐</div>
                  <div className="text-sm mt-1">值得推荐的好课/好商家</div>
                </button>
                <button
                  type="button"
                  onClick={() => setType("black")}
                  className={`p-4 rounded-xl border-2 transition-all ${type === "black"
                    ? "border-gray-700 bg-gray-100 text-gray-800 shadow-lg"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-500"
                    }`}
                >
                  <div className="text-2xl mb-2">👎</div>
                  <div className="font-semibold">黑榜避雷</div>
                  <div className="text-sm mt-1">需要避坑的课程/商家</div>
                </button>
              </div>
            </div>

            {/* 标题输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                评价标题 *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`输入${type === "red" ? "推荐" : "避雷"}的对象，如："高等数学 - 张老师"`}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength={50}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {title.length}/50
              </div>
            </div>

            {/* 内容输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                详细评价 *
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`请详细描述${type === "red" ? "推荐理由和优点" : "避雷原因和问题"}...`}
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                maxLength={500}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>至少10个字</span>
                <span>{content.length}/500</span>
              </div>
            </div>

            {/* 提示信息 */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-bold text-blue-800 mb-2">💡 评价指南</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• 请基于真实体验发表评价</li>
                <li>• 内容客观具体，避免情绪化表达</li>
                <li>• 红榜：分享优质课程和商家的优点</li>
                <li>• 黑榜：指出具体问题，帮助他人避坑</li>
              </ul>
            </div>

            {/* 提交按钮 */}
            <button
              onClick={submitReview}
              disabled={loading || !title.trim() || !content.trim() || content.length < 10}
              className={`w-full font-bold py-4 px-6 rounded-xl text-lg transition-colors ${loading || !title.trim() || !content.trim() || content.length < 10
                ? "bg-gray-400 text-white cursor-not-allowed"
                : type === "red"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-gray-700 hover:bg-gray-800 text-white"
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  发布中...
                </span>
              ) : (
                `🚀 发布${type === "red" ? "红榜" : "黑榜"}评价`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}