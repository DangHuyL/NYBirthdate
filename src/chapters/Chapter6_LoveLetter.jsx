import React, { useState, useEffect } from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { Mail, RotateCcw, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const Chapter6_LoveLetter = () => {
  const { config, resetJourney } = useBirthday();
  const letterText = config.loveLetter.content || '';

  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    setIsTypingComplete(false);

    const timer = setInterval(() => {
      if (index < letterText.length) {
        setDisplayedText((prev) => prev + letterText.charAt(index));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 35); // Smooth natural typing speed

    return () => clearInterval(timer);
  }, [letterText]);

  const handleReplayLetter = () => {
    setDisplayedText('');
    setIsTypingComplete(false);
    let index = 0;
    const timer = setInterval(() => {
      if (index < letterText.length) {
        setDisplayedText((prev) => prev + letterText.charAt(index));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 35);
  };

  return (
    <section className="relative min-h-screen py-24 px-4 max-w-3xl mx-auto space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-rose text-rose-300 text-xs font-semibold uppercase tracking-widest border border-rose-500/30">
          <Mail size={14} />
          <span>Chương 6 • Bức Thư Tình Trân Trọng</span>
        </div>
        <h2 className="font-serif-title text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200">
          {config.loveLetter.title || 'Bức Thư Gửi Em Yêu'}
        </h2>
      </motion.div>

      {/* Paper Envelope Letter Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative bg-slate-900/90 border border-rose-400/30 rounded-3xl p-6 md:p-10 shadow-2xl space-y-6 text-left"
      >
        {/* Decorative Stamp */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-rose-300">
            <Heart size={18} className="fill-rose-500 text-rose-500" />
            <span className="font-handwriting text-2xl font-bold">From my heart</span>
          </div>

          <div className="px-3 py-1 bg-rose-500/10 border border-rose-500/30 rounded-lg text-[11px] font-mono text-rose-300">
            16.10.2001
          </div>
        </div>

        {/* Letter Text Content */}
        <div className="min-h-[260px] whitespace-pre-line text-sm md:text-base text-slate-200 leading-relaxed font-sans font-light">
          {displayedText}
          {!isTypingComplete && <span className="inline-block w-2 h-4 bg-rose-400 ml-1 animate-pulse" />}
        </div>

        {/* Sender Signature */}
        <div className="pt-6 border-t border-slate-800 flex justify-end">
          <div className="text-right space-y-1">
            <p className="text-xs text-slate-400">Yêu em nhiều hơn mỗi ngày,</p>
            <p className="font-handwriting text-2xl text-rose-300 font-bold">
              {config.loveLetter.sender || 'Anh yêu của em'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <button
          onClick={handleReplayLetter}
          className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-rose-300 border border-rose-500/30 rounded-full text-xs font-semibold transition-all"
        >
          <RotateCcw size={15} />
          <span>Đọc lại bức thư 📜</span>
        </button>

        <button
          onClick={resetJourney}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-full text-base shadow-xl shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-105 transition-all"
        >
          <Sparkles size={18} />
          <span>Trải Nghiệm Lại Từ Đầu ❤️</span>
        </button>
      </div>
    </section>
  );
};
