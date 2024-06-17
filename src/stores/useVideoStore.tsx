import {create} from 'zustand';
import { Video, VideoHistory } from '../interfaces/Video';

 interface  VideoState {
  videos: Video[];
  setVideos: (videos: Video[]) => void;
  selectedVideo: Video | null;
  setSelectedVideo: (video: Video) => void;
  videoHistory: VideoHistory[] | null;
  setVideoHistory: (video: VideoHistory[]) => void;
  addVideoToHistory: (history: VideoHistory) => void;
  }

export const useVideoStore = create<VideoState>((set) => ({
  videos: [],
  setVideos: (videos) => set({videos}),
  selectedVideo: null,
  setSelectedVideo: (video) => set({selectedVideo: video}),
  videoHistory: null,
  setVideoHistory: (video) => set({videoHistory: video}),
  addVideoToHistory: (history) => set((state) => ({
    videoHistory: state.videoHistory ? [...state.videoHistory, history] : [history],
  })),
}));
