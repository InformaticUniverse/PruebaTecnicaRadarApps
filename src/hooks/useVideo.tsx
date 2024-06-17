import {useEffect} from 'react';
import {
  GetPopularVideosResponse,
  VideoHistory,
} from '../interfaces/Video';
import {videoApi} from '../apis/videoApi';
import {useVideoStore} from '../stores/useVideoStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useVideo = () => {
  const videos = useVideoStore(state => state.videos);
  const setVideos = useVideoStore(state => state.setVideos);
  const selectedVideo = useVideoStore(state => state.selectedVideo);
  const setSelectedVideo = useVideoStore(state => state.setSelectedVideo);
  const history = useVideoStore(state => state.videoHistory);
  const setHistory = useVideoStore(state => state.setVideoHistory);

  useEffect(() => {
    if (videos.length === 0) fetchVideos();

    if (!history) getVideosHistory();
  }, []);

  const fetchVideos = async () => {
    try {
      const {data, status} = await videoApi.get<GetPopularVideosResponse>(
        '/popular',
      );

      if (status === 200) {
        setVideos(data.videos);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getVideosHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('watchHistory');
      const historyData: VideoHistory[] = history ? JSON.parse(history) : [];
      setHistory(historyData);
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };




  return {videos, history, setHistory, selectedVideo, setSelectedVideo};
};
