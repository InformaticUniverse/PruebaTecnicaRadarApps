import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, View, StyleSheet, Alert, Dimensions} from 'react-native';
import RNVideo from 'react-native-video';
import {Video, VideoHistory} from '../../interfaces/Video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ViewShot from 'react-native-view-shot';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import Orientation from 'react-native-orientation-locker';
import Slider from '@react-native-community/slider';
import {useVideo} from '../../hooks/useVideo';

//El slider de video parece no funcionar porque todos los videos del api son mudos, pero el slider de volumen si funciona

interface Props {
  video: Video;
  fullscreen: boolean;
  setFullscreen: (fullscreen: boolean) => void;
}

export const VideoPlayer = ({video, fullscreen, setFullscreen}: Props) => {
  const {history, setHistory} = useVideo();
  const [paused, setPaused] = useState(true);
  const viewShotRef = useRef<ViewShot>(null);
  const [watchTime, setWatchTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();
  const [volume, setVolume] = useState(1);
  const [currentHistory, setCurrentHistory] = useState<VideoHistory | null>();

  useEffect(() => {
    if (currentHistory) {
      return;
    }
    startVideoHistory();
  }, [history]);

  useEffect(() => {
    startTimer();

    return () => {
      clearInterval(intervalRef.current);
      saveWatchHistory();
    };
  }, [watchTime]);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setWatchTime(prevTime => prevTime + 1);
    }, 1000);
  };

  useEffect(() => {
    if (fullscreen) {
      Orientation.lockToLandscape();
    } else {
      Orientation.unlockAllOrientations();
    }

    return () => {
      Orientation.unlockAllOrientations();
    };
  }, [fullscreen]);

  const startVideoHistory = async () => {
    try {
      if (!history) {
        return;
      }

      const newVideoHistory: VideoHistory = {
        id: history.length + 1,
        video,
        timestamp: new Date().toISOString(),
        watchTime,
      };
      setCurrentHistory(newVideoHistory);
      setWatchTime(0);

      history.push(newVideoHistory);

      await AsyncStorage.setItem('watchHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving watch history:', error);
    }
  };

  const saveWatchHistory = async () => {
    if (!currentHistory || watchTime === 0) {
      return;
    }

    try {
      const history = await AsyncStorage.getItem('watchHistory');
      const historyData: VideoHistory[] = history ? JSON.parse(history) : [];
      const updatedHistory = historyData.map(item =>
        item.id === currentHistory.id ? {...item, watchTime} : item,
      );

      await AsyncStorage.setItem(
        'watchHistory',
        JSON.stringify(updatedHistory),
      );

      setHistory(updatedHistory);
    } catch (error) {
      console.error('Error saving watch history:', error);
    }
  };

  const togglePausePlay = () => {
    setPaused(!paused);
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const takeScreenshot = async () => {
    if (!viewShotRef.current) {
      return;
    }

    if (!viewShotRef.current.capture) {
      return;
    }

    const uri = await viewShotRef.current.capture();
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const filePath = `${RNFS.DocumentDirectoryPath}/screenshot_${timestamp}.png`;

    try {
      await RNFS.copyFile(uri, filePath);

      Alert.alert('Captura guardada', `Captura guardada en ${filePath}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save screenshot');
    }
  };

  return (
    <View style={fullscreen ? {flex: 1} : {}}>
      <View style={{backgroundColor: '#000'}}>
        <ViewShot
          ref={viewShotRef}
          style={fullscreen ? styles.fullscreenVideo : styles.video}>
          <RNVideo
            source={{uri: video.video_files[0].link}}
            style={fullscreen ? styles.fullscreenVideo : styles.video}
            controls={false}
            paused={paused}
            resizeMode="contain"
            onError={error => console.error('Video error:', error)}
            volume={volume}
          />
        </ViewShot>
        <View style={fullscreen ? styles.fullScreenControls : styles.controls}>
          <TouchableOpacity onPress={togglePausePlay}>
            <Icon
              name={paused ? 'play-arrow' : 'pause'}
              size={30}
              color="#FFF"
            />
          </TouchableOpacity>
          <View style={styles.volumeControl}>
            <Icon name="volume-up" size={30} color="#FFF" />
            <Slider
              style={{width: 100, height: 40}}
              minimumValue={0}
              maximumValue={1}
              value={volume}
              onValueChange={setVolume}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
            />
          </View>
          <TouchableOpacity onPress={takeScreenshot}>
            <Icon name="camera-alt" size={30} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFullscreen}>
            <Icon
              name={fullscreen ? 'fullscreen-exit' : 'fullscreen'}
              size={30}
              color="#FFF"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 300,
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  fullscreenVideo: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#000',
    position: 'absolute',
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fullScreenControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: -300,
  },
  volumeControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
