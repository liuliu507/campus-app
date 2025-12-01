"use client";

import { useState } from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ShareModal({ isOpen, onClose, onSuccess }: ShareModalProps) {
  const [userId, setUserId] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!userId || !content) {
      alert("用户ID和趣事内容不能为空");
      return;
    }

    if (content.length < 5) {
      alert("趣事内容至少需要5个字");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/share/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: Number(userId),
          content,
          imageUrl: imageUrl || null,
        }),
      });

      if (!res.ok) throw new Error("发布失败");

      alert("发布成功！");
      onSuccess();
      onClose();
      // 重置表单
      setUserId("");
      setContent("");
      setImageUrl("");
    } catch (error) {
      console.error("发布失败:", error);
      alert("发布失败，请检查网络连接或稍后重试");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* 弹窗头部 */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">分享趣事</h2>
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
            {/* 用户ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                用户 ID *
              </label>
              <input
                type="number"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="请输入您的用户ID"
                min="1"
              />
            </div>

            {/* 趣事内容 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                趣事内容 *
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                placeholder="分享您遇到的趣事、搞笑瞬间或温暖故事..."
                rows={6}
                maxLength={500}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>至少5个字</span>
                <span>{content.length}/500</span>
              </div>
            </div>

            {/* 图片 URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                图片链接（可选）
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="https://example.com/image.jpg"
              />
              {imageUrl && (
                <div className="mt-2">
                  <div className="text-xs text-gray-500 mb-1">图片预览：</div>
                  <img
                    src={imageUrl}
                    alt="预览"
                    className="w-32 h-32 object-cover rounded-lg border"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* 提示信息 */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <h4 className="font-bold text-purple-800 mb-2">💡 分享指南</h4>
              <ul className="text-purple-700 text-sm space-y-1">
                <li>• 分享真实、有趣的校园生活经历</li>
                <li>• 内容积极向上，传递正能量</li>
                <li>• 尊重他人隐私，避免敏感信息</li>
                <li>• 可以配上相关图片让故事更生动</li>
              </ul>
            </div>

            {/* 提交按钮 */}
            <button
              onClick={handleSubmit}
              disabled={loading || !userId || !content.trim() || content.length < 5}
              className={`w-full font-bold py-4 px-6 rounded-xl text-lg transition-colors ${loading || !userId || !content.trim() || content.length < 5
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  发布中...
                </span>
              ) : (
                "🚀 发布趣事"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}