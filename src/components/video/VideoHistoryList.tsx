import React from 'react';
import {FlatList} from 'react-native';
import {VideoHistory} from '../../interfaces/Video';
import {VideoHistoryListItem} from './VideoHistoryListItem';

interface Props {
  history: VideoHistory[];
  onHistoryItemPress: (item: VideoHistory) => void;
}

export const VideoHistoryList = ({history, onHistoryItemPress}: Props) => {
  return (
    <FlatList
      data={history}
      renderItem={({item}) => (
        <VideoHistoryListItem
          onPress={() => onHistoryItemPress(item)}
          item={item}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};
