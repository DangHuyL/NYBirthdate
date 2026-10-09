import React, { useState } from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { Sparkles, Heart, Moon, Gift, RotateCcw, Calendar, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Chapter7_FinalSurprise = () => {
  const { config, resetJourney } = useBirthday();
  const [isFinalGiftOpened, setIsFinalGiftOpened] = useState(false);

  return (
    <section className="relative min-h-screen py-24 px-4 max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-12">
      {/* Moon glow background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-200/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-gold text-amber-200 text-xs font-semibold uppercase tracking-widest border border-amber-400/30">
          <Moon size={14} className="text-amber-300" />
          <span>Chương 7 • Lời Hứa & Tương Lai</span>
        </div>

        <h2 className="font-serif-title text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-rose-100 to-pink-200">
          {config.finalSurprise.title}
        </h2>

        <p className="text-sm md:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
          {config.finalSurprise.message}
        </p>
      </motion.div>

      {/* Promise Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl glass-card-rose bg-rose-950/20 border border-rose-500/30 rounded-3xl p-6 md:p-8 space-y-4 text-center shadow-2xl"
      >
        <div className="inline-flex items-center gap-2 text-rose-300 font-serif-title text-lg font-bold">
          <Calendar size={18} />
          <span>{config.finalSurprise.promiseTitle}</span>
        </div>

        <p className="text-xs md:text-sm text-rose-100/90 leading-relaxed">
          "{config.finalSurprise.promiseText}"
        </p>
      </motion.div>

      {/* Final Gift Unfolding */}
      <div className="space-y-6 flex flex-col items-center">
        {!isFinalGiftOpened ? (
          <button
            onClick={() => setIsFinalGiftOpened(true)}
            className="group px-8 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 text-white font-extrabold text-base md:text-lg rounded-full shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
          >
            <Gift className="w-5 h-5 text-amber-200 animate-bounce" />
            <span>Còn một điều nữa... 🎁</span>
          </button>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-md p-6 bg-slate-900 border-2 border-rose-400 rounded-3xl shadow-2xl space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <Heart size={32} className="fill-rose-500 text-rose-500 animate-pulse" />
            </div>

            <p className="font-serif-title text-lg md:text-xl font-bold text-rose-100">
              {config.finalSurprise.finalClosing}
            </p>

            <div className="text-xs text-rose-300 font-handwriting text-xl">
              Forever & Always • 16.10.2001
            </div>
          </motion.div>
        )}
      </div>

      {/* Replay journey button */}
      <div className="pt-12">
        <button
          onClick={resetJourney}
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-rose-300 border border-slate-800 rounded-full text-xs font-semibold shadow-lg transition-all"
        >
          <RotateCcw size={15} />
          <span>Trải nghiệm lại hành trình từ đầu</span>
        </button>
      </div>
    </section>
  );
};
