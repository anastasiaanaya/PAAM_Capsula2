import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolateColor,
  FadeInDown,
} from 'react-native-reanimated';

import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

const ESTAT_NUM = {
  'Pendent': 0,
  'Llegint': 1,
  'Llegit': 2,
};
const NUM_A_ESTAT = ['Pendent', 'Llegint', 'Llegit'];

const BookCard = ({ id, titol, autor, any, estat, imatge, onToggle, onDelete, index }) => {

  const progress = useSharedValue(ESTAT_NUM[estat] ?? 0);

  // useEffect s'executa cada vegada que 'estat' canvia des de fora
  // (per exemple, si el pare actualitza l'estat del context).
  // Sense això, el color no s'actualitzaria si el component es re-renderitza.
  useEffect(() => {
    progress.value = withTiming(ESTAT_NUM[estat] ?? 0, { duration: 300 });
  }, [estat]);

  // Funció que s'executa quan l'usuari prem el botó d'estat
  const handlePress = () => {
    const estatActualNum = ESTAT_NUM[estat];
    const nouEstatNum = (estatActualNum + 1) % 3;   // Cicle: 0→1→2→0
    const nouEstatString = NUM_A_ESTAT[nouEstatNum];

    // Animem el canvi de color en 300ms
    progress.value = withTiming(nouEstatNum, { duration: 300 });

    // Notifiquem el pare del nou estat
    onToggle(id, nouEstatString);
  };

  // useAnimatedStyle enllaça el valor 'progress' amb el color de fons del botó.
  // interpolateColor mapeja: 0→vermell, 1→taronja, 2→verd
  const colorAnimat = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1, 2],
      ['#e74c3c', '#f39c12', '#2ecc71']  // Pendent, Llegint, Llegit
    ),
  }));

  // EFECTE SCALE EN PRÉMER LA CARD
  // useSharedValue per controlar l'escala de la card
  const scale = useSharedValue(1);

  // Quan l'usuari prem (onPressIn), reduïm lleugerament la mida
  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 300 });
    // torna amb un petit rebot natural
  };

  // Quan l'usuari deixa anar (onPressOut), tornem a la mida normal
  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const scaleAnimat = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // SWIPE PER ELIMINAR
  // renderitza el botó vermell que apareix en fer swipe cap a l'esquerra.
  const renderRightActions = () => (
    <View style={styles.swipeDeleteContainer}>
      <Text style={styles.swipeDeleteText}>🗑️ Eliminar</Text>
    </View>
  );


  // fa que cada card aparegui des de baix amb un retard escalonat.
  // L'index * 80ms fa que la primera card surti primer, la segona 80ms després, etc.
  return (
    // necessari perquè Swipeable funcioni correctament
    <GestureHandlerRootView>
      {/* Swipeable detecta el gest de lliscar cap a l'esquerra i mostra renderRightActions */}
      <Swipeable
        renderRightActions={renderRightActions}  // Botó d'eliminar a la dreta
        onSwipeableOpen={() => onDelete(id)}     // Quan s'obre del tot, elimina el llibre
        overshootRight={false}                   // Evita que el swipe passi del botó
      >
        {/* Animated.View amb entering = animació d'entrada escalonada */}
        <Animated.View
          style={[styles.cardWrapper, scaleAnimat]}
          entering={FadeInDown.delay(index * 80).duration(400)}
        >
          {/* Pressable detecta onPressIn/Out per l'efecte de scale */}
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.card}
          >
            {/* Portada del llibre */}
            <Image source={imatge} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{titol}</Text>
              <Text style={styles.author}>{autor}</Text>
              <Text style={styles.any}>{any}</Text>

              {/* Botó d'estat amb color animat */}
              <Pressable onPress={handlePress} style={styles.buttonWrapper}>
                {/* Animated.View perquè pugui tenir backgroundColor animat */}
                <Animated.View style={[styles.button, colorAnimat]}>
                  <Text style={styles.buttonText}>{estat}</Text>
                </Animated.View>
              </Pressable>
            </View>
          </Pressable>
        </Animated.View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    // Wrapper separat per poder aplicar el scale sense afectar el Swipeable
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  cardContent: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  any: {
    fontSize: 13,
    color: '#888',
    marginBottom: 10,
  },
  buttonWrapper: {
    alignSelf: 'flex-start',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  swipeDeleteContainer: {
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderRadius: 12,
    marginBottom: 16, // Ha de coincidir amb el marginBottom del cardWrapper
    marginLeft: 8,
  },
  swipeDeleteText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default BookCard;