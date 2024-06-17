import React from 'react';
import { Video} from '../../interfaces/Video';
import {ScreenTemplate} from '../../components/layout/ScreenTemplate';
import {VideoList} from '../../components/video/VideoList';
import {useVideo} from '../../hooks/useVideo';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamsList} from '../../navigators/RootStackNavigator';

type Props = StackScreenProps<RootStackParamsList, 'Home'>;

export const HomeScreen = ({navigation}: Props) => {
  const {videos, setSelectedVideo} = useVideo();

  const onVideoPress = (video: Video) => {
    setSelectedVideo(video);
    navigation.navigate('PlayVideo');
  }

  return (
    <ScreenTemplate headerText="Lista de videos">
      <VideoList videos={videos} onListItemPress={onVideoPress} />
    </ScreenTemplate>
  );
};
