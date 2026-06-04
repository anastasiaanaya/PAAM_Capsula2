import React, { useContext } from 'react';
import { BooksContext } from '../../context/BooksContext';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import Animated from 'react-native-reanimated';

export default function BookDetailScreen() {
  // Aquest hook captura l'[id] de la URL
  const { id } = useLocalSearchParams(); 
  const { books } = useContext(BooksContext); 
  
  // Bcomparem l'ID del llibre directament amb l'ID de la URL
  const book = books.find(b => String(b.id) === String(id));


  if (!book) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Llibre no trobat 😢</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>

      <Stack.Screen options={{ title: book.title }} />

      <Animated.Image 
        source={typeof book.coverUrl === 'string' ? { uri: book.coverUrl } : book.coverUrl} 
        style={styles.coverImage} 
        sharedTransitionTag={`book-cover-${book.id}`}
      />
      
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}> {book.author}</Text>
        
        <View style={styles.tagsRow}>
          <View style={styles.tag}><Text style={styles.tagText}>{book.publishedYear}</Text></View>
          <View style={[styles.tag, { backgroundColor: '#3498DB' }]}><Text style={[styles.tagText, {color: 'white'}]}>{book.status}</Text></View>
        </View>

        <Text style={styles.sectionTitle}>Sinopsi</Text>
        <Text style={styles.description}>{book.sinopsi}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  coverImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain', // Perquè no es deformi
    backgroundColor: '#ecf0f1',
    marginBottom: 20,
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  author: {
    fontSize: 18,
    color: '#7f8c8d',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  tagsRow: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  tag: {
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  tagText: {
    color: '#2c3e50',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
  }
});