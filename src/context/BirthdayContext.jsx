import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultBirthdayConfig } from '../config/birthdayConfig';
import { getUserConfig, saveUserConfig, saveMediaFile, getMediaFile } from '../utils/db';
import { synthEngine } from '../utils/audioSynth';

const BirthdayContext = createContext();

export const BirthdayProvider = ({ children }) => {
  const [config, setConfig] = useState(defaultBirthdayConfig);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [maxChapterReached, setMaxChapterReached] = useState(1);
  const [openedSecretCards, setOpenedSecretCards] = useState([]);
  const [isCandleBlown, setIsCandleBlown] = useState(false);
  
  // Audio state
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [audioRef, setAudioRef] = useState(null);
  const [customAudioUrl, setCustomAudioUrl] = useState(null);

  // Admin and Lightbox modals
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Load custom user config & media from IndexedDB on mount
  useEffect(() => {
    async function loadSavedData() {
      try {
        const savedConfig = await getUserConfig();
        if (savedConfig) {
          setConfig(savedConfig);
        }
        // Check for custom stored audio
        const audioBlob = await getMediaFile('bg_music');
        if (audioBlob) {
          const url = URL.createObjectURL(audioBlob);
          setCustomAudioUrl(url);
        }
      } catch (err) {
        console.error('Failed to load user saved config', err);
      }
    }
    loadSavedData();
  }, []);

  // Auto switch music when entering/leaving Chapter 6 (Love Letter)
  useEffect(() => {
    try {
      if (!audioRef) return;
      
      let targetSrc = config.music.src;
      if (currentChapter === 6 && config.music.letterSrc) {
        targetSrc = config.music.letterSrc;
      }
      if (customAudioUrl) {
        targetSrc = customAudioUrl;
      }

      const encodedTarget = encodeURI(targetSrc);
      if (!audioRef.src.endsWith(encodedTarget) && !audioRef.src.endsWith(targetSrc)) {
        const wasPlaying = isPlayingMusic;
        audioRef.src = targetSrc;
        if (wasPlaying) {
          audioRef.play().catch(err => console.log('Audio track transition play error:', err));
        }
      }
    } catch (err) {
      console.warn('Audio switch error:', err);
    }
  }, [currentChapter, config.music, customAudioUrl, audioRef]);

  // Update max chapter reached when moving forward
  const goToChapter = (chapNum) => {
    if (chapNum > maxChapterReached) {
      setMaxChapterReached(chapNum);
    }
    setCurrentChapter(chapNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextChapter = () => {
    if (currentChapter < 6) {
      goToChapter(currentChapter + 1);
    }
  };

  const prevChapter = () => {
    if (currentChapter > 1) {
      goToChapter(currentChapter - 1);
    }
  };

  const toggleMusic = () => {
    if (isPlayingMusic) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const playMusic = () => {
    setIsPlayingMusic(true);
    if (audioRef && audioRef.src) {
      audioRef.play().catch((err) => {
        console.log('HTML5 Audio play prevented, falling back to WebAudio Synth', err);
        synthEngine.startLoop();
      });
    } else {
      synthEngine.startLoop();
    }
  };

  const pauseMusic = () => {
    setIsPlayingMusic(false);
    if (audioRef) {
      audioRef.pause();
    }
    synthEngine.stop();
  };

  const handleVolumeChange = (newVol) => {
    setVolume(newVol);
    if (audioRef) {
      audioRef.volume = newVol;
    }
    synthEngine.setVolume(newVol);
  };

  // Open secret card
  const openCard = (cardId) => {
    if (!openedSecretCards.includes(cardId)) {
      setOpenedSecretCards([...openedSecretCards, cardId]);
    }
  };

  // Blow candle
  const blowCandles = () => {
    setIsCandleBlown(true);
  };

  // Update full or partial config
  const updateConfig = async (newPartialConfig) => {
    const updated = {
      ...config,
      ...newPartialConfig
    };
    setConfig(updated);
    await saveUserConfig(updated);
  };

  // Upload custom photo or video
  const addCustomPhoto = async (file, caption, date) => {
    const isVideo = file.type.startsWith('video/');
    const mediaId = (isVideo ? 'user_video_' : 'user_photo_') + Date.now();
    await saveMediaFile(mediaId, file);
    const mediaUrl = URL.createObjectURL(file);

    const newMediaItem = {
      id: mediaId,
      type: isVideo ? 'video' : 'image',
      url: mediaUrl,
      caption: caption || (isVideo ? 'Video kỷ niệm' : 'Khoảnh khắc đáng nhớ'),
      date: date || 'Kỷ niệm'
    };

    const updatedGallery = [newMediaItem, ...config.memoriesGallery];
    await updateConfig({ memoriesGallery: updatedGallery });
  };


  // Delete photo
  const deletePhoto = async (id) => {
    const updatedGallery = config.memoriesGallery.filter((p) => p.id !== id);
    await updateConfig({ memoriesGallery: updatedGallery });
  };

  // Reorder photos
  const reorderPhotos = async (newPhotos) => {
    await updateConfig({ memoriesGallery: newPhotos });
  };

  // Upload custom music file
  const uploadCustomMusic = async (file) => {
    await saveMediaFile('bg_music', file);
    const url = URL.createObjectURL(file);
    setCustomAudioUrl(url);
    if (audioRef) {
      audioRef.src = url;
      if (isPlayingMusic) {
        audioRef.play().catch(console.error);
      }
    }
  };

  // Reset entire journey for replay
  const resetJourney = () => {
    setCurrentChapter(1);
    setOpenedSecretCards([]);
    setIsCandleBlown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Export current configuration as birthdayConfig.js JSON file download
  const exportConfigJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "birthdayConfig_backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <BirthdayContext.Provider
      value={{
        config,
        currentChapter,
        maxChapterReached,
        goToChapter,
        nextChapter,
        prevChapter,
        openedSecretCards,
        openCard,
        isCandleBlown,
        blowCandles,
        isPlayingMusic,
        toggleMusic,
        playMusic,
        pauseMusic,
        volume,
        setVolume: handleVolumeChange,
        setAudioRef,
        customAudioUrl,
        isAdminOpen,
        setIsAdminOpen,
        selectedPhoto,
        setSelectedPhoto,
        updateConfig,
        addCustomPhoto,
        deletePhoto,
        reorderPhotos,
        uploadCustomMusic,
        resetJourney,
        exportConfigJSON
      }}
    >
      {children}
    </BirthdayContext.Provider>
  );
};

export const useBirthday = () => useContext(BirthdayContext);
