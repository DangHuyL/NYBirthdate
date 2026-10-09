import React from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { X, Calendar, Heart, Video, Image as ImageIcon } from 'lucide-react';

export const PhotoLightbox = () => {
  const { selectedPhoto, setSelectedPhoto } = useBirthday();

  if (!selectedPhoto) return null;

  const isVideo = selectedPhoto.type === 'video';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={() => setSelectedPhoto(null)}
    >
      <div
        className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-4 md:p-6 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedPhoto(null)}
          className="absolute top-4 right-4 z-10 p-2.5 bg-slate-800/80 hover:bg-rose-500 text-slate-300 hover:text-white rounded-full transition-all shadow-lg"
        >
          <X size={20} />
        </button>

        {/* Media Box */}
        <div className="bg-slate-950 p-3 md:p-4 rounded-2xl border border-slate-800/60 shadow-inner flex flex-col items-center">
          <div className="relative w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-xl bg-black">
            {isVideo ? (
              <video
                src={selectedPhoto.url}
                controls
                autoPlay
                className="max-h-[65vh] w-auto max-w-full rounded-xl shadow-lg"
              />
            ) : (
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption || 'Kỷ niệm'}
                className="max-h-[65vh] w-auto object-contain rounded-xl shadow-lg"
              />
            )}
          </div>

          {/* Caption & Info */}
          <div className="w-full mt-4 flex flex-col items-center text-center space-y-2 px-2">
            <div className="flex items-center gap-1.5 text-xs text-rose-400 font-semibold tracking-wide uppercase bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
              {isVideo ? <Video size={12} /> : <ImageIcon size={12} />}
              <Calendar size={12} />
              <span>{selectedPhoto.date || 'Kỷ niệm ngọt ngào của Kiều Loan'}</span>
            </div>

            <h3 className="font-serif-title text-xl md:text-2xl font-bold text-rose-100">
              {selectedPhoto.caption || 'Khoảnh khắc đáng nhớ của hai ta'}
            </h3>

            <p className="text-xs text-slate-400 font-handwriting text-lg text-rose-300/80 flex items-center gap-1">
              <Heart size={14} className="fill-rose-500 text-rose-500 inline" />
              Dành riêng cho Lê Thị Kiều Loan • 16.10.2001
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
