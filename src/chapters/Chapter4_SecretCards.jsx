import React from 'react';
import { useBirthday } from '../context/BirthdayContext';
import {
  Lock, LockOpen, Heart, Smile, Coffee, Sparkles, Sun, Gift, Calendar, ShieldCheck,
  CheckCircle2, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap = {
  Smile,
  Heart,
  Coffee,
  Sparkles,
  Sun,
  Gift,
  Calendar,
  ShieldCheck
};

export const Chapter4_SecretCards = () => {
  const { config, openedSecretCards, openCard, nextChapter } = useBirthday();

  const totalCards = config.secretMessages.length;
  const openedCount = openedSecretCards.length;
  const isAllUnlocked = openedCount >= totalCards;

  return (
    <section className="relative min-h-screen py-24 px-4 max-w-5xl mx-auto space-y-12">
      {/* Header & Progress Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-rose text-rose-300 text-xs font-semibold uppercase tracking-widest border border-rose-500/30">
          <Sparkles size={14} />
          <span>Chương 4 • Điều Bí Mật Anh Yêu Ở Em</span>
        </div>
        <h2 className="font-serif-title text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200">
          Những Điều Nhỏ Bé Làm Anh Yêu Em
        </h2>
        <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          Hãy chạm vào từng lá thư bí mật dưới đây để khám phá điều anh luôn trân trọng ở em nhé...
        </p>

        {/* Progress Counter */}
        <div className="pt-2 flex justify-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-slate-900 border border-slate-800 rounded-full text-xs font-bold text-rose-300 shadow-md">
            <CheckCircle2 size={16} className="text-rose-400" />
            <span>
              {openedCount}/{totalCards} điều bí mật đã được mở
            </span>
          </div>
        </div>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {config.secretMessages.map((card) => {
          const isOpened = openedSecretCards.includes(card.id);
          const IconComponent = iconMap[card.icon] || Heart;

          return (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openCard(card.id)}
              className={`relative cursor-pointer rounded-3xl p-5 border min-h-[190px] flex flex-col justify-between transition-all duration-300 shadow-xl ${
                isOpened
                  ? 'glass-card-rose bg-rose-950/30 border-rose-500/50 shadow-rose-500/10'
                  : 'glass-card bg-slate-900/80 border-slate-800 hover:border-rose-400/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-2xl ${isOpened ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-slate-400'}`}>
                  <IconComponent size={20} />
                </div>
                {isOpened ? (
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider bg-rose-500/10 px-2 py-1 rounded-full border border-rose-500/20">
                    Đã mở
                  </span>
                ) : (
                  <Lock size={16} className="text-slate-500" />
                )}
              </div>

              <div className="my-3">
                {isOpened ? (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs md:text-sm text-slate-100 font-light leading-relaxed"
                  >
                    "{card.text}"
                  </motion.p>
                ) : (
                  <div className="space-y-1">
                    <h4 className="font-serif-title font-bold text-base text-rose-200">
                      {card.title}
                    </h4>
                    <p className="text-xs text-slate-400">Chạm để mở phong thư...</p>
                  </div>
                )}
              </div>

              <div className="text-[11px] text-right font-semibold text-rose-400/80">
                {isOpened ? '❤️' : 'Chờ em khám phá'}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Final Bonus Locked Card */}
      <div className="pt-6">
        <motion.div
          animate={isAllUnlocked ? { scale: [1, 1.02, 1] } : {}}
          transition={{ repeat: isAllUnlocked ? Infinity : 0, duration: 3 }}
          className={`relative max-w-2xl mx-auto rounded-3xl p-6 md:p-8 border shadow-2xl text-center space-y-4 transition-all ${
            isAllUnlocked
              ? 'glass-card-gold bg-amber-950/30 border-amber-400/60 shadow-amber-500/20'
              : 'glass-card bg-slate-900/60 border-slate-800 opacity-80'
          }`}
        >
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 p-0.5 shadow-lg">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-amber-300">
              {isAllUnlocked ? <LockOpen size={28} className="animate-bounce" /> : <Lock size={28} />}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif-title text-xl md:text-2xl font-bold text-amber-200">
              {config.lockedCard.title}
            </h3>
            <p className="text-xs md:text-sm text-slate-200 max-w-md mx-auto leading-relaxed">
              {isAllUnlocked
                ? config.lockedCard.text
                : 'Khóa bí mật đặc biệt nhất sẽ mở sau khi em mở đủ 8 điều bí mật ở trên!'}
            </p>
          </div>

          {isAllUnlocked && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
              <Sparkles size={14} />
              <span>{config.lockedCard.unlockedMessage}</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Next Chapter Button */}
      <div className="pt-8 text-center">
        <button
          onClick={nextChapter}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-full text-base shadow-xl shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-105 transition-all"
        >
          <span>Thổi Nến Sinh Nhật 🎂</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};
