import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity } from 'react-native';
import {Swipeable} from 'react-native-gesture-handler/Swipeable';
import { useRouter } from 'expo-router'; 
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

const ESTAT_NUM = {
  'Pendent': 0,
  'Llegint': 1,
  'Llegit': 2
};
const NUM_A_ESTAT = ['Pendent', 'Llegint', 'Llegit'];

const BookCard = ({ id, titol, autor, any, estat, imatge, onToggle, onDelete }) => {
    const router = useRouter();
    const progress = useSharedValue(ESTAT_NUM[estat] || 0);

    const handlePress = () => {
        const estatActualNum = ESTAT_NUM[estat];
        const nouEstatNum = (estatActualNum + 1) % 3; 
        const nouEstatString = NUM_A_ESTAT[nouEstatNum]; 

        progress.value = withTiming(nouEstatNum, { duration: 300 });
        useEffect(() => {
            progress.value = withTiming(ESTAT_NUM[estat] || 0, { duration: 300 });
        }, [estat]);
        onToggle(id, nouEstatString);
    };

    const animatedStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            progress.value,
            [0, 1, 2],
            ['#e74c3c', '#f39c12', '#2ecc71'] 
        ),
    }));

    const renderRightActions = () => {
        return (
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
        );
    };

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <Pressable onPress={() => router.push(`/book/${id}`)}>
                <View style={styles.card}>
                    <Animated.Image source={imatge}
                    style={styles.image} 
                    sharedTransitionTag={`book-cover-${id}`} 
                    />
                
                    <View style={styles.cardContent}>
                        <Text style={styles.title}>{titol}</Text>
                        <Text style={styles.author}>{autor}</Text>
                        <Text style={styles.any}>{any}</Text>
                    
                        <Pressable onPress={handlePress} style={styles.buttonWrapper}>
                            <Animated.View style={[styles.button, animatedStyle]}>
                                <Text style={styles.buttonText}>  {estat}</Text>
                            </Animated.View>
                        </Pressable>
                    </View>
                </View>
            </Pressable>
        </Swipeable>
        
    );
}

const styles = StyleSheet.create({
    card: { 
        flexDirection: 'row', 
        backgroundColor: '#FFFFFF', 
        borderRadius: 12, 
        marginBottom: 16, 
        padding: 12, 
        elevation: 3, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 4 },
    image: { 
        width: 80, 
        height: 120, 
        borderRadius: 8, 
        backgroundColor: '#E0E0E0' },
    cardContent: { 
        flex: 1, 
        marginLeft: 15, 
        justifyContent: 'space-between' },
    title: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#1A1A1A', 
        marginBottom: 4 },
    author: { 
        fontSize: 14, 
        color: '#666666', 
        fontStyle: 'italic', 
        marginBottom: 8 },
    any: { 
        fontSize: 13, 
        color: '#888', 
        marginBottom: 10 },
    buttonWrapper: { 
        alignSelf: 'flex-start' },
    button: { 
        paddingVertical: 8, 
        paddingHorizontal: 12, 
        borderRadius: 6, 
        alignItems: 'center', 
        marginTop: 10 },
    buttonText: { 
        color: '#FFFFFF', 
        fontWeight: 'bold', 
        fontSize: 13 },
    deleteButton: {
        backgroundColor: '#E74C3C',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        borderRadius: 12,
        marginVertical: 10,
        marginLeft: 10,
    },
    deleteText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    }
});

export default BookCard;