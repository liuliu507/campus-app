'use client'

import { useState } from 'react'

type Props = {
  onClose: () => void
  onCreated: () => void
}

export default function FriendsModal({ onClose, onCreated }: Props) {
  const [form, setForm] = useState({
    title: '',
    type: '运动健身',
    activity: '',
    location: '',
    timeText: '',
    people: '',
    maxParticipants: '0',
    description: '',
    contact: '',
    urgency: '一般',
    gender: '不限',
    tagsInput: '',
    tags: [] as string[]
  })

  const activityTypes = ['运动健身', '学习交流', '娱乐休闲', '兴趣社团', '其他']
  const urgencyLevels = ['一般', '紧急', '非常紧急']
  const genderOptions = ['不限', '男生', '女生']

  const addTag = () => {
    const t = form.tagsInput.trim()
    if (t && !form.tags.includes(t) && form.tags.length < 5) {
      setForm({ ...form, tags: [...form.tags, t], tagsInput: '' })
    }
  }

  const removeTag = (t: string) => setForm({ ...form, tags: form.tags.filter(x => x !== t) })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.activity || !form.location || !form.timeText || !form.description || !form.contact) {
      alert('请将必填项填写完整')
      return
    }

    const payload = {
      title: form.title,
      type: form.type,
      activity: form.activity,
      location: form.location,
      timeText: form.timeText,
      people: form.people,
      maxParticipants: Number(form.maxParticipants || 0),
      description: form.description,
      contact: form.contact,
      urgency: form.urgency,
      gender: form.gender,
      tags: form.tags
    }

    try {
      const res = await fetch('/api/friends/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) {
        const t = await res.text()
        throw new Error(t || 'create failed')
      }
      await res.json()
      alert('发布成功')
      onCreated()
    } catch (e: any) {
      console.error('发布失败', e)
      alert('发布失败：' + (e.message || e))
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">发布活动</h2>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="活动标题 *" className="w-full p-3 border rounded" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="p-3 border rounded">
              {activityTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <input value={form.activity} onChange={(e) => setForm({ ...form, activity: e.target.value })} placeholder="具体活动 * (例如：羽毛球)" className="p-3 border rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="活动地点 *" className="p-3 border rounded" />
            <input value={form.timeText} onChange={(e) => setForm({ ...form, timeText: e.target.value })} placeholder="活动时间 *" className="p-3 border rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input value={form.people} onChange={(e) => setForm({ ...form, people: e.target.value })} placeholder="人数要求 *" className="p-3 border rounded" />
            <input type="number" value={form.maxParticipants} onChange={(e) => setForm({ ...form, maxParticipants: e.target.value })} placeholder="最大人数（0不限）" className="p-3 border rounded" />
            <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="p-3 border rounded">
              {genderOptions.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="活动描述 *" className="w-full p-3 border rounded" rows={3} />

          <input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="联系方式 *" className="w-full p-3 border rounded" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <select value={form.urgency} onChange={(e) => setForm({ ...form, urgency: e.target.value })} className="p-3 border rounded">
              {urgencyLevels.map(u => <option key={u} value={u}>{u}</option>)}
            </select>

            <div className="flex gap-2">
              <input value={form.tagsInput} onChange={(e) => setForm({ ...form, tagsInput: e.target.value })} placeholder="添加标签（回车或点击添加）" className="flex-1 p-3 border rounded" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }} />
              <button type="button" onClick={addTag} className="px-4 py-3 bg-gray-600 text-white rounded">添加</button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {form.tags.map(t => <span key={t} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full">{t} <button type="button" onClick={() => removeTag(t)} className="ml-2">×</button></span>)}
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-6 py-3 bg-gray-300 rounded">取消</button>
            <button type="submit" className="px-6 py-3 bg-teal-600 text-white rounded">🚀 发布活动</button>
          </div>
        </form>
      </div>
    </div>
  )
}
