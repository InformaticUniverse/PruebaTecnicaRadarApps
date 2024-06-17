import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {RootStackParamsList} from '../../navigators/RootStackNavigator';

export const Header = ({text}: {text: string}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

  return (
    <View style={styles.header}>
      <Pressable
        style={styles.historyButton}
        onPress={() => navigation.navigate('History')}>
        <Text style={styles.historyButtonText}>Historial</Text>
      </Pressable>

      <Text style={styles.headerTitle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  historyButton: {
    backgroundColor: '#000',
    borderRadius: 5,

    position: 'absolute',
    left: 10,
  },
  historyButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'regular',
    fontStyle: 'italic',
  },
});
