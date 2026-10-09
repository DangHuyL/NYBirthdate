import React from 'react';
import { useBirthday } from '../context/BirthdayContext';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Flame, ArrowRight, PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';

export const Chapter5_BirthdayCake = () => {
  const { config, isCandleBlown, blowCandles, nextChapter } = useBirthday();

  const handleBlowCandles = () => {
    blowCandles();

    // Trigger sweet festive confetti animation burst
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fbbf24', '#f472b6', '#ffffff']
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 400);
  };

  return (
    <section className="relative min-h-screen py-24 px-4 max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-12 overflow-hidden">
      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-rose-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-rose text-rose-300 text-xs font-semibold uppercase tracking-widest border border-rose-500/30">
          <PartyPopper size={14} className="text-amber-300" />
          <span>Chương 5 • Thời Khắc Ý Nghĩa nhất</span>
        </div>

        <h2 className="font-serif-title text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200">
          {config.birthdayCelebration.greetingTitle}
        </h2>

        <div className="inline-block px-6 py-2 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-200 font-serif-title text-xl md:text-2xl font-bold tracking-widest">
          ✨ {config.birthdayCelebration.date} ✨
        </div>

        <p className="text-sm md:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
          {config.birthdayCelebration.subtitle}
        </p>
      </motion.div>

      {/* Interactive Birthday Cake Illustration / Component */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative my-4 flex flex-col items-center"
      >
        {/* Cake Container */}
        <div className="relative w-72 h-72 md:w-80 md:h-80 flex flex-col items-center justify-end p-6 glass-card bg-slate-900/90 border-2 border-rose-500/30 rounded-3xl shadow-2xl">
          {/* Candles */}
          <div className="absolute top-8 flex items-center justify-center gap-6 z-20">
            {[1, 2, 3].map((id) => (
              <div key={id} className="relative flex flex-col items-center">
                {/* Flame */}
                {!isCandleBlown ? (
                  <div className="w-5 h-7 bg-amber-400 rounded-full animate-flame shadow-[0_0_15px_#f59e0b]" />
                ) : (
                  <div className="w-2 h-4 bg-slate-400/50 rounded-full animate-ping opacity-60" />
                )}
                {/* Candle Stick */}
                <div className="w-3 h-14 bg-gradient-to-b from-rose-300 to-pink-500 rounded-t-sm shadow-md border-x border-rose-400" />
              </div>
            ))}
          </div>

          {/* Cake Main Image / Decorative layers */}
          <div className="relative w-full h-44 rounded-2xl bg-gradient-to-b from-rose-400/90 via-rose-500 to-pink-600 p-4 shadow-xl border-t-4 border-rose-200 flex flex-col justify-between overflow-hidden">
            {/* Frosting drips */}
            <div className="flex justify-between -mt-4 -mx-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-8 h-6 bg-rose-100 rounded-b-full shadow-sm" />
              ))}
            </div>

            {/* Cake Decorative Text */}
            <div className="text-center my-auto">
              <span className="font-handwriting text-2xl md:text-3xl text-white font-bold drop-shadow-md">
                Happy Birthday {config.girlfriendName}
              </span>
            </div>

            {/* Bottom Plate */}
            <div className="w-full h-3 bg-rose-200/90 rounded-full shadow-inner" />
          </div>
        </div>

        {/* Wish Prompt Text */}
        <p className="mt-6 text-xs md:text-sm text-rose-200 font-handwriting text-xl">
          {isCandleBlown
            ? "Ước nguyện của em đã được gửi gắm tới các vì sao! ✨"
            : config.birthdayCelebration.wishPrompt}
        </p>
      </motion.div>

      {/* Blow Candle Action Button */}
      <div className="space-y-4">
        {!isCandleBlown ? (
          <button
            onClick={handleBlowCandles}
            className="group relative px-8 py-4 bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-slate-950 font-extrabold text-base md:text-lg rounded-full shadow-xl shadow-amber-500/20 hover:shadow-rose-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
          >
            <Flame className="w-6 h-6 text-amber-950 animate-bounce" />
            <span>Thổi Nến Sinh Nhật 🎂</span>
          </button>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-full text-xs font-bold shadow-lg">
              <Sparkles size={16} />
              <span>Nến đã thổi xong! Chúc mọi ước mơ của em đều thành hiện thực!</span>
            </div>

            <div className="pt-2">
              <button
                onClick={nextChapter}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-full text-base shadow-xl shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-105 transition-all"
              >
                <span>Đọc Bức Thư Từ Trái Tim Anh</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
