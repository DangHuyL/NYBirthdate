import React, { useEffect, useRef, useState } from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { Music, Play, Pause, Volume2, VolumeX, Upload, Disc } from 'lucide-react';

export const MusicPlayer = () => {
  const {
    config,
    currentChapter,
    isPlayingMusic,
    toggleMusic,
    volume,
    setVolume,
    setAudioRef,
    customAudioUrl,
    uploadCustomMusic
  } = useBirthday();

  const internalAudioRef = useRef(null);
  const fileInputRef = useRef(null);
  const [showVolumeMenu, setShowVolumeMenu] = useState(false);

  const currentTrackSrc = customAudioUrl || config.music.src;

  useEffect(() => {
    if (internalAudioRef.current) {
      setAudioRef(internalAudioRef.current);
      internalAudioRef.current.volume = volume;
    }
  }, [internalAudioRef.current, setAudioRef]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        uploadCustomMusic(file);
      } else {
        alert('Vui lòng chọn tệp âm thanh (MP3, WAV, OGG)!');
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Hidden audio element */}
      <audio
        ref={internalAudioRef}
        src={currentTrackSrc}
        loop
        preload="auto"
        onError={(e) => {
          console.warn('Audio src load fallback to synth:', e);
        }}
      />

      {/* Popover settings */}
      {showVolumeMenu && (
        <div className="glass-card bg-slate-900/90 p-4 rounded-2xl border border-rose-500/30 shadow-2xl flex flex-col gap-3 min-w-[220px] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between text-xs text-rose-200 font-medium">
            <span>Âm lượng</span>
            <span>{Math.round(volume * 100)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setVolume(volume === 0 ? 0.6 : 0)}
              className="text-rose-400 hover:text-rose-300 transition-colors"
            >
              {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full accent-rose-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>

          <hr className="border-slate-800 my-1" />

          {/* Custom music upload button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 py-2 px-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-medium transition-all"
          >
            <Upload size={14} />
            <span>Đổi nhạc của bạn (MP3)</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}

      {/* Main floating player button */}
      <div className="glass-card bg-slate-900/80 hover:bg-slate-900/95 p-2 pr-4 rounded-full border border-rose-500/30 shadow-xl flex items-center gap-3 backdrop-blur-md transition-all">
        {/* Vinyl disc */}
        <button
          onClick={toggleMusic}
          className="relative w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center border-2 border-rose-500/50 shadow-inner overflow-hidden group cursor-pointer"
        >
          <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/40 via-slate-950 to-black ${isPlayingMusic ? 'animate-vinyl' : ''}`}>
            <Disc className="w-full h-full text-slate-800/80 p-1" />
          </div>
          <div className="relative z-10 w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-300 group-hover:scale-110 transition-transform">
            {isPlayingMusic ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
          </div>
        </button>

        {/* Track Title */}
        <div className="flex flex-col text-left max-w-[150px]">
          <span className="text-[11px] font-semibold text-rose-400 tracking-wide uppercase flex items-center gap-1">
            <Music size={10} className={isPlayingMusic ? 'animate-pulse' : ''} />
            {isPlayingMusic ? 'Đang phát nhạc' : 'Nhạc nền'}
          </span>
          <span className="text-xs text-slate-200 truncate font-medium">
            {currentChapter === 6
              ? config.music.letterTitle || 'Một Ngày Hay Trăm Năm'
              : config.music.title || 'Happy Birthday Piano'}
          </span>
        </div>

        {/* Volume setting toggle */}
        <button
          onClick={() => setShowVolumeMenu(!showVolumeMenu)}
          className="p-2 text-slate-400 hover:text-rose-300 transition-colors ml-1"
          title="Tùy chỉnh âm lượng & Nhạc"
        >
          <Volume2 size={16} />
        </button>
      </div>
    </div>
  );
};
