import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Video} from '../../interfaces/Video';

interface Props {
  video: Video;
  onPress: () => void;
}

//Muestro la duracion porque no tiene descripcion

export const VideoListItem = ({video, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.videoItem} onPress={onPress}>
      <ImageBackground style={styles.thumbnail} source={{uri: video.image}} />
      <View style={styles.rowContainer}>
        <Text style={styles.title}>{video.user.name}</Text>
        <Text style={styles.description}>
          Duracion: {video.duration} segundos
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  videoItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',

    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
