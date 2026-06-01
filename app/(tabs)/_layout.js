import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#3498DB' }}>
      <Tabs.Screen 
        name="myList" 
        options={{ 
          title: 'La meva llista',
          headerTitle: 'La meva llibreria' 
        }} 
      />
      <Tabs.Screen 
        name="search" 
        options={{ 
          title: 'Cerca',
          headerTitle: 'Cercador' 
        }} 
      />
      <Tabs.Screen 
        name="perfil" 
        options={{ 
          title: 'Perfil',
        }} 
      />
    </Tabs>
  );
}