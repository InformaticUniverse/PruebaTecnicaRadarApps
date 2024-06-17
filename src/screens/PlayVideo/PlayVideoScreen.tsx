import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {useVideo} from '../../hooks/useVideo';
import {VideoPlayer} from '../../components/video/VideoPlayer';
import { ScreenTemplate } from '../../components/layout/ScreenTemplate';
import { VideoDetails } from '../../components/video/VideoDetails';

export const PlayVideoScreen = () => {
  const {selectedVideo} = useVideo();
  const [fullScreen, setFullScreen] = useState(false);

  if (!selectedVideo) {
    return <ActivityIndicator />;
  }

  return (
    <ScreenTemplate headerText={selectedVideo.user.name} showHeader={!fullScreen}>

      <VideoPlayer
        video={selectedVideo}
        fullscreen={fullScreen}
        setFullscreen={setFullScreen}
      />
      {!fullScreen && <VideoDetails video={selectedVideo} />}
      
    </ScreenTemplate>
  );
};


