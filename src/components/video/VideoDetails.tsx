import React from 'react';
import {Video} from '../../interfaces/Video';
import {StyleSheet, Text, View} from 'react-native';

export const VideoDetails = ({video}: {video: Video}) => {
  return (
    <View style={styles.container}>
    <Text style={styles.text}>Autor: {video.user.name}</Text>
    <Text style={styles.text}>Duracion: {video.duration} segundos</Text>
    <Text style={styles.text}>Resolucion: {video.video_files[0].width}*{video.video_files[0].height}p</Text>
    {video.tags.length > 0 && (
      <>
        <Text style={styles.text}>Etiquetas:</Text>
        <View style={styles.tagContainer}>
          {video.tags.map((tag) => (
            <Text key={tag} style={styles.tag}>{tag}</Text>
          ))}
        </View>
      </>
    )}
  </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    color: '#333',
    fontSize: 14,
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
});