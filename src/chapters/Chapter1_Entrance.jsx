import React, { useState } from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { Sparkles, Heart, MailOpen, LockOpen, Music } from 'lucide-react';
import { motion } from 'framer-motion';

export const Chapter1_Entrance = () => {
  const { config, nextChapter, playMusic } = useBirthday();
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenGift = () => {
    setIsOpening(true);
    playMusic();
    setTimeout(() => {
      nextChapter();
    }, 1200);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden text-center">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-xl w-full mx-auto space-y-8 flex flex-col items-center"
      >
        {/* Glowing Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-rose text-rose-200 text-xs md:text-sm font-semibold tracking-wide border border-rose-500/30 shadow-lg">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{config.formattedBirthdate} • Ngày Đặc Biệt</span>
        </div>

        {/* Headline Greeting */}
        <div className="space-y-3">
          <h1 className="font-serif-title text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200 leading-tight">
            {config.entrance.greeting || "Gửi cô gái đặc biệt nhất của anh..."}
          </h1>
          <p className="text-sm md:text-base text-rose-200/80 max-w-md mx-auto leading-relaxed font-light">
            {config.entrance.subtext || "Hôm nay là một ngày vô cùng đặc biệt. Anh có một hành trình bất ngờ nhỏ dành riêng cho em."}
          </p>
        </div>

        {/* Mysterious Envelope Card */}
        <motion.div
          animate={isOpening ? { scale: 1.15, rotate: [0, -5, 5, 0], opacity: 0 } : { y: [0, -8, 0] }}
          transition={{
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 0.8 }
          }}
          onClick={handleOpenGift}
          className="group relative w-64 h-64 md:w-72 md:h-72 cursor-pointer flex items-center justify-center my-4"
        >
          {/* Glowing ring */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-rose-500/30 via-pink-500/20 to-amber-500/30 blur-xl group-hover:blur-2xl transition-all opacity-80" />

          {/* Envelope Card Container */}
          <div className="relative w-full h-full glass-card bg-slate-900/80 border-2 border-rose-400/40 group-hover:border-rose-400 rounded-3xl p-6 flex flex-col items-center justify-center space-y-4 shadow-2xl transition-all transform group-hover:scale-105">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 p-0.5 shadow-lg shadow-rose-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-rose-400 group-hover:text-white transition-colors">
                {isOpening ? (
                  <MailOpen className="w-10 h-10 text-amber-300 animate-bounce" />
                ) : (
                  <Heart className="w-10 h-10 fill-rose-500 text-rose-500 animate-pulse" />
                )}
              </div>
            </div>

            <div className="space-y-1 text-center">
              <span className="font-serif-title text-lg font-bold text-rose-100">
                {config.girlfriendName}
              </span>
              <p className="text-xs text-rose-300/80 font-handwriting text-base">
                16.10.2001 - Món quà sinh nhật
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Button */}
        <div className="w-full flex flex-col items-center justify-center space-y-3">
          <button
            onClick={handleOpenGift}
            className="relative group px-8 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 text-white rounded-full font-bold text-base md:text-lg shadow-xl shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto"
          >
            <LockOpen className="w-5 h-5 text-rose-100" />
            <span>{config.entrance.buttonText || "Mở món quà nhé 💖"}</span>
          </button>

          <p className="text-xs text-slate-400/90 flex items-center justify-center gap-1.5 font-medium text-center">
            <Music size={13} className="text-rose-400" />
            <span>{config.entrance.hint || "Có một điều anh muốn dành riêng cho em."}</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
