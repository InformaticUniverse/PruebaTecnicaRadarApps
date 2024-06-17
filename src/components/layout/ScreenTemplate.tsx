import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import { Header } from '../ui/Header';

interface Props {
  headerText: string;
  children?: React.ReactNode;
  showHeader?: boolean;
}

export const ScreenTemplate = ({headerText, children, showHeader=true}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      {showHeader && <Header text={headerText} />}
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
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
});
