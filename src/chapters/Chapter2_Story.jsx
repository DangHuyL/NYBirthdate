import React from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { Calendar, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const Chapter2_Story = () => {
  const { config, nextChapter, setSelectedPhoto } = useBirthday();

  return (
    <section className="relative min-h-screen py-24 px-4 max-w-4xl mx-auto space-y-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-rose text-rose-300 text-xs font-semibold uppercase tracking-widest border border-rose-500/30">
          <Heart size={14} className="fill-rose-500 text-rose-500" />
          <span>Chương 2 • Hành Trình Tình Yêu</span>
        </div>
        <h2 className="font-serif-title text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200">
          Câu Chuyện Của Chúng Mình
        </h2>
        <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          Mỗi khoảng thời gian bên em đều là một chương đẹp đẽ nhất trong cuốn sách cuộc đời anh...
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative border-l-2 border-rose-500/30 ml-4 md:ml-32 space-y-12 pl-6 md:pl-10">
        {config.storyTimeline.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative group"
          >
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-rose-500 flex items-center justify-center shadow-lg group-hover:scale-125 group-hover:bg-rose-500 transition-all">
              <div className="w-2 h-2 rounded-full bg-rose-400 group-hover:bg-white" />
            </div>

            {/* Date Tag */}
            <div className="md:absolute md:-left-44 md:top-1 text-xs font-semibold text-rose-400 flex items-center gap-1.5 mb-2 md:mb-0">
              <Calendar size={13} />
              <span>{item.date}</span>
            </div>

            {/* Story Card */}
            <div className="glass-card bg-slate-900/80 hover:bg-slate-900/95 border border-slate-800 hover:border-rose-500/40 rounded-3xl p-5 md:p-7 shadow-xl transition-all space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif-title text-xl md:text-2xl font-bold text-rose-100 group-hover:text-rose-300 transition-colors">
                  {item.title}
                </h3>
              </div>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-light">
                {item.story}
              </p>

              {/* Photo Preview if available */}
              {item.photo && (
                <div
                  onClick={() => setSelectedPhoto({ url: item.photo, caption: item.title, date: item.date })}
                  className="relative overflow-hidden rounded-2xl border border-slate-800 max-h-64 cursor-pointer group/img"
                >
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs text-rose-200 font-semibold flex items-center gap-1">
                      <Sparkles size={12} />
                      Bấm để phóng to
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Next Chapter Button */}
      <div className="pt-8 text-center">
        <button
          onClick={nextChapter}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-full text-base shadow-xl shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-105 transition-all"
        >
          <span>Khám Phá Album Ảnh Kỷ Niệm</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};
