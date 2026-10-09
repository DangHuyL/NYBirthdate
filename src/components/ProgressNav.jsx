import React from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { Heart, Sparkles, Settings, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

export const ProgressNav = () => {
  const {
    currentChapter,
    maxChapterReached,
    goToChapter,
    nextChapter,
    prevChapter,
    setIsAdminOpen,
    resetJourney,
    config
  } = useBirthday();

  const chapters = [
    { num: 1, title: 'Lời chào' },
    { num: 2, title: 'Kỷ niệm' },
    { num: 3, title: 'Kho ảnh' },
    { num: 4, title: 'Bí mật' },
    { num: 5, title: 'Thổi nến' },
    { num: 6, title: 'Thư tình' }
  ];

  if (currentChapter === 1) return null; // Keep chapter 1 ultra immersive without nav bar initially

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Branding */}
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
          <span className="font-serif-title font-semibold text-rose-200 text-sm md:text-base truncate">
            {config.girlfriendName} • {config.formattedBirthdate}
          </span>
        </div>

        {/* Center: Chapter step indicators */}
        <div className="hidden md:flex items-center gap-1.5">
          {chapters.map((ch) => {
            const isCurrent = currentChapter === ch.num;
            const isUnlocked = ch.num <= maxChapterReached;

            return (
              <button
                key={ch.num}
                disabled={!isUnlocked}
                onClick={() => goToChapter(ch.num)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  isCurrent
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-105'
                    : isUnlocked
                    ? 'bg-slate-800/80 text-rose-200 hover:bg-rose-500/20 hover:text-rose-300'
                    : 'bg-slate-900/40 text-slate-600 cursor-not-allowed'
                }`}
              >
                <span>{ch.num}.</span>
                <span>{ch.title}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Quick actions & Mobile controls */}
        <div className="flex items-center gap-2">
          {/* Chapter Prev/Next controls */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-full p-1">
            <button
              onClick={prevChapter}
              disabled={currentChapter <= 1}
              className="p-1 rounded-full text-slate-400 hover:text-rose-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Chương trước"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs text-rose-300 font-semibold px-2">
              {currentChapter}/6
            </span>
            <button
              onClick={nextChapter}
              disabled={currentChapter >= maxChapterReached || currentChapter >= 6}
              className="p-1 rounded-full text-slate-400 hover:text-rose-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Chương tiếp theo"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Replay */}
          <button
            onClick={resetJourney}
            className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-rose-300 rounded-full transition-all"
            title="Xem lại từ đầu"
          >
            <RotateCcw size={16} />
          </button>

          {/* Personalization Admin dashboard modal button */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full text-xs font-semibold shadow-sm transition-all"
            title="Chỉnh sửa nội dung & Tải ảnh/nhạc"
          >
            <Settings size={14} className="text-rose-400" />
            <span className="hidden sm:inline">Chỉnh sửa</span>
          </button>
        </div>
      </div>

      {/* Progress line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900">
        <div
          className="h-full bg-gradient-to-r from-rose-500 via-pink-400 to-amber-300 transition-all duration-500"
          style={{ width: `${(currentChapter / 6) * 100}%` }}
        />
      </div>
    </header>
  );
};
