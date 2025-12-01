"use client";

import { useState } from "react";
import axios from "axios";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onHelpCreated: () => void;
}

export default function HelpModal({ isOpen, onClose, onHelpCreated }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !contact.trim()) {
      alert("请填写完整信息");
      return;
    }

    if (description.length < 10) {
      alert("求助描述至少需要10个字");
      return;
    }

    try {
      setLoading(true);
      await axios.post("https://campus-backend-1-uo30.onrender.com/api/help", {
        title,
        content: description, // 添加 content 字段，使用 description 的值
        description,
        contact,
        urgent,
        author: "匿名用户", // 添加 author 字段
        publisherId: 1, // 添加 publisherId 字段，使用默认值 1
        status: "PENDING",
        viewCount: 0,
        replyCount: 0
      });

      setTitle("");
      setDescription("");
      setContact("");
      setUrgent(false);

      onHelpCreated();
      onClose();
      alert("求助发布成功！");
    } catch (err: any) {
      console.error("发布失败:", err);
      if (err.response?.status === 400) {
        alert("请求数据格式错误，请检查填写的信息");
      } else if (err.response?.status === 500) {
        alert("服务器错误，请稍后重试");
      } else {
        alert("发布失败，请重试");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* 弹窗头部 */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">发起求助</h2>
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
            {/* 标题输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                求助标题 *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="简要描述您的求助内容，如：求推荐好的高数辅导资料"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                maxLength={50}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {title.length}/50
              </div>
            </div>

            {/* 内容输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                详细描述 *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="请详细描述您遇到的问题、需要的帮助或想要打听的信息..."
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                maxLength={500}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>至少10个字</span>
                <span>{description.length}/500</span>
              </div>
            </div>

            {/* 联系方式 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                联系方式 *
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="QQ号、微信号或手机号（用于联系您）"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                maxLength={30}
              />
            </div>

            {/* 紧急程度 */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="urgent"
                checked={urgent}
                onChange={(e) => setUrgent(e.target.checked)}
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="urgent" className="ml-2 text-sm text-gray-700 flex items-center gap-2">
                <span className="text-red-500">🚨</span>
                标记为紧急求助
              </label>
            </div>

            {/* 提示信息 */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <h4 className="font-bold text-orange-800 mb-2">💡 求助指南</h4>
              <ul className="text-orange-700 text-sm space-y-1">
                <li>• 清晰描述问题，便于他人理解和帮助</li>
                <li>• 提供准确的联系方式，方便沟通</li>
                <li>• 紧急求助会获得更多关注</li>
                <li>• 问题解决后请及时更新状态</li>
              </ul>
            </div>

            {/* 提交按钮 */}
            <button
              onClick={handleSubmit}
              disabled={loading || !title.trim() || !description.trim() || !contact.trim() || description.length < 10}
              className={`w-full font-bold py-4 px-6 rounded-xl text-lg transition-colors ${loading || !title.trim() || !description.trim() || !contact.trim() || description.length < 10
                ? "bg-gray-400 text-white cursor-not-allowed"
                : urgent
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-orange-600 hover:bg-orange-700 text-white"
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  发布中...
                </span>
              ) : (
                `🚀 ${urgent ? "发布紧急求助" : "发布求助"}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}