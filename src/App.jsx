import React from 'react';
import { BirthdayProvider, useBirthday } from './context/BirthdayContext';
import { BackgroundEffects } from './components/BackgroundEffects';
import { ProgressNav } from './components/ProgressNav';
import { MusicPlayer } from './components/MusicPlayer';
import { AdminDashboard } from './components/AdminDashboard';
import { PhotoLightbox } from './components/PhotoLightbox';

import { Chapter1_Entrance } from './chapters/Chapter1_Entrance';
import { Chapter2_Story } from './chapters/Chapter2_Story';
import { Chapter3_Memories } from './chapters/Chapter3_Memories';
import { Chapter4_SecretCards } from './chapters/Chapter4_SecretCards';
import { Chapter5_BirthdayCake } from './chapters/Chapter5_BirthdayCake';
import { Chapter6_LoveLetter } from './chapters/Chapter6_LoveLetter';

const ChapterContent = () => {
  const { currentChapter } = useBirthday();

  switch (currentChapter) {
    case 1:
      return <Chapter1_Entrance />;
    case 2:
      return <Chapter2_Story />;
    case 3:
      return <Chapter3_Memories />;
    case 4:
      return <Chapter4_SecretCards />;
    case 5:
      return <Chapter5_BirthdayCake />;
    case 6:
      return <Chapter6_LoveLetter />;
    default:
      return <Chapter1_Entrance />;
  }
};

export default function App() {
  return (
    <BirthdayProvider>
      <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-rose-500 selection:text-white">
        <BackgroundEffects />
        <ProgressNav />
        
        <main className="relative z-10 min-h-screen">
          <ChapterContent />
        </main>

        <MusicPlayer />
        <AdminDashboard />
        <PhotoLightbox />
      </div>
    </BirthdayProvider>
  );
}
