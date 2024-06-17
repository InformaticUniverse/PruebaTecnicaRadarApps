import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { VideoHistory } from '../../interfaces/Video';


interface Props {
  item: VideoHistory;
  onPress: () => void;
}

export const VideoHistoryListItem = ({item, onPress}: Props) => {
  return (
    <Pressable style={styles.historyItem} onPress={onPress}>
    <Image style={styles.thumbnail} source={{ uri: item.video.image }} />
    <View style={styles.info}>
      <Text style={styles.title}>{item.video.user.name}</Text>
      <Text style={styles.timestamp}>Visto: {new Date(item.timestamp).toLocaleString()}</Text>
      <Text style={styles.watchTime}>Tiempo de reproduccion: {item.watchTime} segundos</Text>
    </View>
  </Pressable>
  )
}


const styles = StyleSheet.create({
  historyItem: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timestamp: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  watchTime: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
});