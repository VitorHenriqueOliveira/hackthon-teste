import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import ListaTarefasScreen from './src/screens/ListaTarefasScreen';
import DetalhesTarefaScreen from './src/screens/DetalhesTarefaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#4f46e5' },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen name="Tarefas" component={ListaTarefasScreen} options={{ title: 'TaskFlow' }} />
        <Stack.Screen name="Detalhes" component={DetalhesTarefaScreen} options={{ title: 'Detalhes da tarefa' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
