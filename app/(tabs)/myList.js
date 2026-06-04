import React, { useContext } from 'react'; 
import { BooksContext } from '../../context/BooksContext';
import { View, StyleSheet, FlatList } from 'react-native';
import BookCard from '../../components/Card';

export default function MyListScreen() {
  const { books, updateBookStatus, deleteBook } = useContext(BooksContext);

  const toggleEstat = (id, nouEstatString) => {
    updateBookStatus(id, nouEstatString);
  };

  const renderItem = ({ item, index }) => (
    <BookCard
      id={item.id}
      titol={item.title}
      autor={item.author}
      any={item.publishedYear}
      estat={item.status}
      imatge={item.coverUrl}
      onToggle={toggleEstat}
      onDelete={() => deleteBook(item.id)}
      index={index}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  list: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 30,
  }
});