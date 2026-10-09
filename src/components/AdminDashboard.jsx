import React, { useState } from 'react';
import { useBirthday } from '../context/BirthdayContext';
import {
  X, Save, Upload, Download, Trash2, Plus, Heart, User, Calendar, Image as ImageIcon,
  BookOpen, Lock, Mail, Sparkles, Music, HelpCircle
} from 'lucide-react';

export const AdminDashboard = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    config,
    updateConfig,
    addCustomPhoto,
    deletePhoto,
    uploadCustomMusic,
    exportConfigJSON
  } = useBirthday();

  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState(config);
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [newPhotoDate, setNewPhotoDate] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  if (!isAdminOpen) return null;

  const handleSaveGeneral = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await updateConfig(formData);
    setIsSaving(false);
    setSaveSuccessMsg('Đã lưu cài đặt thành công!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      await addCustomPhoto(file, newPhotoCaption || 'Khoảnh khắc mới', newPhotoDate || 'Kỷ niệm');
      setNewPhotoCaption('');
      setNewPhotoDate('');
    }
  };

  const handleMusicUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadCustomMusic(file);
      setSaveSuccessMsg('Đã cập nhật nhạc nền thành công!');
      setTimeout(() => setSaveSuccessMsg(''), 3000);
    }
  };

  // Timeline milestone change helpers
  const updateTimelineItem = (index, field, value) => {
    const updated = [...formData.storyTimeline];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, storyTimeline: updated });
  };

  const addTimelineItem = () => {
    const newItem = {
      id: Date.now(),
      date: 'Mốc thời gian mới',
      title: 'Tiêu đề kỷ niệm',
      story: 'Nội dung kỷ niệm ngọt ngào...',
      photo: '/images/sunset.png'
    };
    setFormData({ ...formData, storyTimeline: [...formData.storyTimeline, newItem] });
  };

  const deleteTimelineItem = (index) => {
    const updated = formData.storyTimeline.filter((_, idx) => idx !== index);
    setFormData({ ...formData, storyTimeline: updated });
  };

  // Secret message change helper
  const updateSecretMessage = (index, field, value) => {
    const updated = [...formData.secretMessages];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, secretMessages: updated });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-rose-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h2 className="font-serif-title text-lg md:text-xl font-bold text-rose-100">
              Bảng Điều Khiển Cá Nhân Hóa (Admin Settings)
            </h2>
          </div>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 text-slate-400 hover:text-rose-300 hover:bg-slate-800 rounded-full transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-2 bg-slate-950/40 border-b border-slate-800 overflow-x-auto">
          {[
            { id: 'general', label: 'Thông tin chung', icon: User },
            { id: 'timeline', label: 'Hành trình', icon: BookOpen },
            { id: 'photos', label: 'Kho ảnh', icon: ImageIcon },
            { id: 'secrets', label: 'Bí mật', icon: Lock },
            { id: 'letter', label: 'Thư tình', icon: Mail },
            { id: 'music', label: 'Nhạc nền', icon: Music }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-rose-300 hover:bg-slate-800/60'
                }`}
              >
                <IconComponent size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-200">
          {saveSuccessMsg && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-xl flex items-center gap-2">
              <Sparkles size={16} />
              <span>{saveSuccessMsg}</span>
            </div>
          )}

          {/* TAB 1: GENERAL */}
          {activeTab === 'general' && (
            <form onSubmit={handleSaveGeneral} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-rose-300 mb-1">
                    Tên người yêu
                  </label>
                  <input
                    type="text"
                    value={formData.girlfriendName}
                    onChange={(e) => setFormData({ ...formData, girlfriendName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:border-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-rose-300 mb-1">
                    Biệt danh thân mật
                  </label>
                  <input
                    type="text"
                    value={formData.nickname}
                    onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:border-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-rose-300 mb-1">
                    Ngày sinh (YYYY-MM-DD)
                  </label>
                  <input
                    type="text"
                    value={formData.birthdate}
                    onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:border-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-rose-300 mb-1">
                    Hiển thị ngày sinh
                  </label>
                  <input
                    type="text"
                    value={formData.formattedBirthdate}
                    onChange={(e) => setFormData({ ...formData, formattedBirthdate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <hr className="border-slate-800 my-4" />

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-rose-200">Lời mở đầu (Chương 1)</h4>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Tiêu đề mở đầu</label>
                  <input
                    type="text"
                    value={formData.entrance.greeting}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        entrance: { ...formData.entrance, greeting: e.target.value }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:border-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Lời dẫn lãng mạn</label>
                  <textarea
                    rows={2}
                    value={formData.entrance.subtext}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        entrance: { ...formData.entrance, subtext: e.target.value }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={exportConfigJSON}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-rose-200 rounded-xl text-xs font-semibold transition-all"
                >
                  <Download size={14} />
                  <span>Xuất file Cấu Hình (JSON)</span>
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-500/20 transition-all"
                >
                  <Save size={16} />
                  <span>Lưu thay đổi</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-rose-200">Cột mốc câu chuyện của hai bạn</h4>
                <button
                  onClick={addTimelineItem}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-semibold transition-all"
                >
                  <Plus size={14} />
                  <span>Thêm cột mốc</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.storyTimeline.map((item, idx) => (
                  <div key={item.id || idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-400">Cột mốc #{idx + 1}</span>
                      <button
                        onClick={() => deleteTimelineItem(idx)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Thời gian / Tiêu đề nhỏ</label>
                        <input
                          type="text"
                          value={item.date}
                          onChange={(e) => updateTimelineItem(idx, 'date', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:border-rose-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Tiêu đề chính</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateTimelineItem(idx, 'title', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:border-rose-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Câu chuyện kỷ niệm</label>
                      <textarea
                        rows={2}
                        value={item.story}
                        onChange={(e) => updateTimelineItem(idx, 'story', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:border-rose-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Đường dẫn ảnh (URL hoặc /images/name.jpg)</label>
                      <input
                        type="text"
                        value={item.photo}
                        onChange={(e) => updateTimelineItem(idx, 'photo', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:border-rose-500 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleSaveGeneral}
                  className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold shadow-lg transition-all"
                >
                  <Save size={16} />
                  <span>Lưu tất cả cột mốc</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: PHOTOS */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              {/* Add Photo Form */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-rose-500/20 space-y-3">
                <h4 className="text-sm font-semibold text-rose-300">Thêm ảnh mới từ máy tính của bạn</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Chú thích ảnh (Ví dụ: Chuyến đi Đà Lạt...)"
                    value={newPhotoCaption}
                    onChange={(e) => setNewPhotoCaption(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-rose-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Ngày/Kỷ niệm (Ví dụ: Thán 10/2025...)"
                    value={newPhotoDate}
                    onChange={(e) => setNewPhotoDate(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <label className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-md transition-all">
                    <Upload size={14} />
                    <span>Chọn ảnh từ thiết bị</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </label>
                  <span className="text-[11px] text-slate-400">Hỗ trợ JPG, PNG, WEBP. Tự động lưu trên trình duyệt!</span>
                </div>
              </div>

              {/* Photos List Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {config.memoriesGallery.map((photo) => (
                  <div key={photo.id} className="relative group bg-slate-950 p-2 rounded-2xl border border-slate-800 overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-32 object-cover rounded-xl"
                    />
                    <div className="mt-2 space-y-1 text-left">
                      <p className="text-xs font-semibold text-rose-200 truncate">{photo.caption}</p>
                      <p className="text-[10px] text-slate-400">{photo.date}</p>
                    </div>

                    <button
                      onClick={() => deletePhoto(photo.id)}
                      className="absolute top-3 right-3 p-1.5 bg-rose-600/90 hover:bg-rose-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                      title="Xóa ảnh"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SECRETS */}
          {activeTab === 'secrets' && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-rose-200">8 Thẻ Bí Mật Anh Yêu Ở Em</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {formData.secretMessages.map((card, idx) => (
                  <div key={card.id || idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-400">Thẻ bí mật #{idx + 1}</span>
                    </div>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => updateSecretMessage(idx, 'title', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-rose-200 font-semibold focus:border-rose-500 focus:outline-none"
                    />
                    <textarea
                      rows={2}
                      value={card.text}
                      onChange={(e) => updateSecretMessage(idx, 'text', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-300 focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleSaveGeneral}
                  className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold shadow-lg transition-all"
                >
                  <Save size={16} />
                  <span>Lưu tất cả bí mật</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: LETTER */}
          {activeTab === 'letter' && (
            <form onSubmit={handleSaveGeneral} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  Tiêu đề bức thư tình
                </label>
                <input
                  type="text"
                  value={formData.loveLetter.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      loveLetter: { ...formData.loveLetter, title: e.target.value }
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  Nội dung bức thư (Vietnamese)
                </label>
                <textarea
                  rows={8}
                  value={formData.loveLetter.content}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      loveLetter: { ...formData.loveLetter, content: e.target.value }
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 leading-relaxed font-sans focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  Chữ ký người gửi
                </label>
                <input
                  type="text"
                  value={formData.loveLetter.sender}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      loveLetter: { ...formData.loveLetter, sender: e.target.value }
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold shadow-lg transition-all"
                >
                  <Save size={16} />
                  <span>Lưu bức thư</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 6: MUSIC */}
          {activeTab === 'music' && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-sm font-semibold text-rose-300">Tải nhạc nền từ máy tính (.MP3, .WAV)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Bạn có thể chọn một bài hát lãng mạn yêu thích từ máy tính của mình. Trình duyệt sẽ lưu bài hát này cục bộ để phát mỗi khi truy cập!
                </p>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-md transition-all">
                    <Upload size={14} />
                    <span>Tải tệp âm thanh lên</span>
                    <input
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={handleMusicUpload}
                    />
                  </label>
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 rounded-2xl border border-amber-500/20 text-xs text-amber-200/90 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-300">
                  <HelpCircle size={16} />
                  <span>Hướng dẫn đưa ảnh & nhạc lên phiên bản Online (Vercel/Netlify):</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-slate-300">
                  <li>Thêm các tệp ảnh vào thư mục <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300">public/images/</code></li>
                  <li>Thêm bài hát nhạc nền vào thư mục <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300">public/music/happy_birthday.mp3</code></li>
                  <li>Bấm nút <strong>"Xuất file Cấu Hình (JSON)"</strong> ở Tab Thông Tin Chung để lưu dữ liệu của bạn vào mã nguồn!</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
