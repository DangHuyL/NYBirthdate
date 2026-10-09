import React, { useRef, useState } from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { Camera, Plus, Trash2, ArrowRight, Video, Calendar, Eye, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export const Chapter3_Memories = () => {
  const { config, setSelectedPhoto, addCustomPhoto, deletePhoto, nextChapter } = useBirthday();
  const fileInputRef = useRef(null);
  const [filter, setFilter] = useState('all'); // 'all' | 'image' | 'video'

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      await addCustomPhoto(file, file.type.startsWith('video/') ? 'Video kỷ niệm' : 'Khoảnh khắc đáng nhớ', 'Kỷ niệm');
    }
  };

  const galleryItems = config.memoriesGallery.filter((item) => {
    if (filter === 'image') return item.type === 'image' || !item.type;
    if (filter === 'video') return item.type === 'video';
    return true;
  });

  return (
    <section className="relative min-h-screen py-24 px-4 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-rose text-rose-300 text-xs font-semibold uppercase tracking-widest border border-rose-500/30">
          <Camera size={14} />
          <span>Chương 3 • Kỷ Niệm Ảnh & Video</span>
        </div>
        <h2 className="font-serif-title text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200">
          Kho Thước Phim & Kỷ Niệm Của chúng ta
        </h2>
        <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          Những góc máy đáng yêu, từng khoảnh khắc hình ảnh và video lưu giữ nụ cười ngập tràn hạnh phúc của em.
        </p>

        {/* Filter & Upload Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-full p-1">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'image', label: 'Hình ảnh' },
              { id: 'video', label: 'Video' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filter === f.id
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-rose-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-5 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full text-xs font-semibold shadow-md transition-all hover:scale-105"
          >
            <Plus size={15} />
            <span>Thêm Ảnh/Video từ máy</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleUpload}
          />
        </div>
      </motion.div>

      {/* Polaroid Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {galleryItems.map((item, index) => {
          const isVideo = item.type === 'video';

          return (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -8, rotate: index % 2 === 0 ? 2 : -2 }}
              className="relative group bg-slate-900/90 border border-slate-800 hover:border-rose-500/40 p-3 pb-6 rounded-2xl shadow-xl polaroid-shadow transition-all flex flex-col justify-between"
            >
              {/* Media Container */}
              <div
                onClick={() => setSelectedPhoto(item)}
                className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-950 cursor-pointer group/media flex items-center justify-center"
              >
                {isVideo ? (
                  <div className="relative w-full h-full bg-slate-950 flex items-center justify-center">
                    <video
                      src={item.url}
                      className="w-full h-full object-cover opacity-80 group-hover/media:scale-105 transition-transform duration-500"
                      muted
                      preload="metadata"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-rose-500/90 text-white flex items-center justify-center shadow-lg group-hover/media:scale-110 transition-transform">
                        <Play size={20} className="ml-1 fill-white" />
                      </div>
                    </div>
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-rose-300 text-[10px] font-semibold flex items-center gap-1">
                      <Video size={10} />
                      <span>Video</span>
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover/media:scale-110 transition-transform duration-500"
                  />
                )}

                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/media:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Eye size={24} className="text-rose-200" />
                </div>
              </div>

              {/* Polaroid Bottom Caption */}
              <div className="mt-4 px-2 space-y-1 text-center">
                <p className="font-handwriting text-xl text-rose-200 leading-tight truncate">
                  {item.caption}
                </p>
                <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
                  <Calendar size={11} />
                  <span>{item.date}</span>
                </div>
              </div>

              {/* Delete button option */}
              <button
                onClick={() => deletePhoto(item.id)}
                className="absolute top-2 right-2 p-1.5 bg-slate-900/80 hover:bg-rose-600 text-slate-400 hover:text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md"
                title="Xóa mục này"
              >
                <Trash2 size={13} />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Next Chapter Button */}
      <div className="pt-8 text-center">
        <button
          onClick={nextChapter}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-full text-base shadow-xl shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-105 transition-all"
        >
          <span>Khám Phá Những Điều Bí Mật</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};
