import React from 'react';
import {ActivityIndicator} from 'react-native';
import {ScreenTemplate} from '../../components/layout/ScreenTemplate';
import {VideoHistoryList} from '../../components/video/VideoHistoryList';
import {VideoHistory} from '../../interfaces/Video';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamsList} from '../../navigators/RootStackNavigator';
import {useVideo} from '../../hooks/useVideo';

type Props = StackScreenProps<RootStackParamsList, 'History'>;

export const HistoryScreen = ({navigation}: Props) => {
  const {history, setSelectedVideo} = useVideo();

  const onVideoPress = (video: VideoHistory) => {
    setSelectedVideo(video.video);
    navigation.navigate('PlayVideo');
  };

  return (
    <ScreenTemplate headerText="Historial de reproduccion">
      {history ? (
        <VideoHistoryList
          history={history}
          onHistoryItemPress={item => onVideoPress(item)}
        />
      ) : (
        <ActivityIndicator size="large" color="#000" />
      )}
    </ScreenTemplate>
  );
};
