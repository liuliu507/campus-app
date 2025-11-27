"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import HelpModal from "./components/HelpModal";

interface Help {
  id: number;
  title: string;
  description: string;
  content: string;
  contact: string;
  author: string;
  createdAt: string;
  urgent?: boolean;
  status?: string;
  viewCount?: number;
  replyCount?: number;
  publisherId?: number;
}

export default function HelpPage() {
  const [helps, setHelps] = useState<Help[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "urgent">("all");
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // 获取所有求助
  const fetchHelps = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("http://localhost:8081/api/help");
      setHelps(res.data);
    } catch (err) {
      console.error("获取求助失败:", err);
      setError("获取求助列表失败，请刷新重试");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHelps();
  }, []);

  // 删除求助
  const handleDelete = async (id: number) => {
    if (!confirm("确定要删除这条求助信息吗？此操作不可撤销。")) {
      return;
    }

    try {
      setDeletingId(id);
      await axios.delete(`http://localhost:8081/api/help/${id}`);

      // 从本地状态中移除已删除的求助
      setHelps(helps.filter(help => help.id !== id));

      // 可以添加成功提示
      console.log("删除成功");
    } catch (err) {
      console.error("删除求助失败:", err);
      alert("删除失败，请重试");
    } finally {
      setDeletingId(null);
    }
  };

  // 过滤求助
  const filteredHelps = helps.filter(help => {
    const matchesSearch = searchTerm ?
      help.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      help.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      help.content.toLowerCase().includes(searchTerm.toLowerCase()) : true;

    const matchesFilter = filter === "all" || help.urgent;

    return matchesSearch && matchesFilter;
  });

  // 统计数据
  const totalHelps = helps.length;
  const urgentHelps = helps.filter(h => h.urgent).length;
  const resolvedHelps = helps.filter(h => h.status === "RESOLVED").length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 错误提示 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <span className="text-red-500 text-lg mr-2">⚠️</span>
              <span className="text-red-700">{error}</span>
              <button
                onClick={fetchHelps}
                className="ml-auto bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                重试
              </button>
            </div>
          </div>
        )}

        {/* 页面标题和统计 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">求助打听</h1>
          <p className="text-gray-600 text-lg">互帮互助，共建温暖校园社区</p>

          {/* 统计信息 */}
          <div className="flex justify-center gap-8 mt-6">
            <div className="bg-orange-50 px-6 py-3 rounded-xl">
              <div className="text-2xl font-bold text-orange-600">{totalHelps}</div>
              <div className="text-orange-700">总求助数</div>
            </div>
            <div className="bg-red-50 px-6 py-3 rounded-xl">
              <div className="text-2xl font-bold text-red-600">{urgentHelps}</div>
              <div className="text-red-700">紧急求助</div>
            </div>
            <div className="bg-green-50 px-6 py-3 rounded-xl">
              <div className="text-2xl font-bold text-green-600">{resolvedHelps}</div>
              <div className="text-green-700">已解决</div>
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
                placeholder="🔍 搜索求助标题或内容..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* 筛选按钮 */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg transition-colors ${filter === "all"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                全部
              </button>
              <button
                onClick={() => setFilter("urgent")}
                className={`px-4 py-2 rounded-lg transition-colors ${filter === "urgent"
                  ? "bg-red-600 text-white"
                  : "bg-red-100 text-red-700 hover:bg-red-200"
                  }`}
              >
                🚨 紧急求助
              </button>
            </div>

            {/* 发布按钮 */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors shadow-lg flex items-center gap-2"
            >
              <span>🆘</span>
              发起求助
            </button>
          </div>
        </div>

        {/* 加载状态 */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">加载求助中...</p>
          </div>
        )}

        {/* 求助列表 */}
        {!loading && (
          <div className="space-y-6">
            {filteredHelps.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <div className="text-6xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {searchTerm ? "没有找到相关求助" : "暂无求助信息"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm ? "换个关键词试试看" : "快来发布第一个求助，让同学们帮助您！"}
                </p>
                {!searchTerm && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-xl"
                  >
                    发起求助
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
              filteredHelps.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] border-l-4 ${item.urgent
                    ? "border-l-red-500 bg-gradient-to-r from-red-50 to-white"
                    : "border-l-orange-500 bg-gradient-to-r from-orange-50 to-white"
                    }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className={`text-2xl ${item.urgent ? "text-red-500" : "text-orange-500"
                          }`}>
                          {item.urgent ? "🚨" : "❓"}
                        </span>
                        <div>
                          <h2 className={`text-xl font-bold ${item.urgent ? "text-red-700" : "text-gray-800"
                            }`}>
                            {item.title}
                          </h2>
                          <div className="flex gap-2 mt-1">
                            {item.urgent && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                紧急
                              </span>
                            )}
                            {item.status === "RESOLVED" && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                已解决
                              </span>
                            )}
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              #{item.id.toString().padStart(4, '0')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString('zh-CN')}
                      </span>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                      {item.content || item.description}
                    </p>

                    {/* 联系方式和统计信息 */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">发布者：</span>
                        <span className="bg-gray-100 px-3 py-1 rounded-lg">
                          {item.author || "匿名用户"}
                        </span>
                        <span className="font-medium ml-4">联系方式：</span>
                        <span className="bg-gray-100 px-3 py-1 rounded-lg font-mono">
                          {item.contact}
                        </span>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>👀 {item.viewCount || 0} 浏览</span>
                        <span>💬 {item.replyCount || 0} 回复</span>
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex gap-4 text-sm flex-wrap">
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <span>✅</span>
                        我能帮忙
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <span>💬</span>
                        留言回复
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                        <span>📞</span>
                        联系TA
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        <span>🔄</span>
                        分享
                      </button>
                      {/* 删除按钮 */}
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-400 disabled:cursor-not-allowed"
                      >
                        {deletingId === item.id ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            删除中...
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
                </div>
              ))
            )}
          </div>
        )}

        {/* 发布求助弹窗 */}
        <HelpModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onHelpCreated={fetchHelps}
        />
      </div>
    </div>
  );
}