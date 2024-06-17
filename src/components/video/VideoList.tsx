import React from 'react';
import {FlatList} from 'react-native';
import {Video} from '../../interfaces/Video';
import {VideoListItem} from './VideoListItem';

interface Props {
  videos: Video[];
  onListItemPress: (video: Video) => void;
  onRefresh?: () => void;
}

export const VideoList = ({videos, onListItemPress, onRefresh}: Props) => {
  return (
    <FlatList
      data={videos}
      renderItem={({item}) => (
        <VideoListItem video={item} onPress={() => onListItemPress(item)} />
      )}
      keyExtractor={item => item.id.toString()}
      onRefresh={onRefresh}
    />
  );
};
