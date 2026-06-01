import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BooksProvider } from './context/BooksContext';

export default function RootLayout() {
  return (
    
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BooksProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
          <Stack.Screen name="book/[id]" options={{ title: 'Detall del Llibre' }} />
        
          {/*MODAL NATIU*/}
          <Stack.Screen 
            name="filters" 
            options={{ 
              presentation: 'modal',
              title: 'Filtres de Cerca'
            }} 
          />
        </Stack>
      </BooksProvider>
    </GestureHandlerRootView>
  );
}