import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import TabNavigation from './src/components/TabNavigation';
import Register from './src/screens/Register';
let Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator>
      <Stack.Screen name="Register" component={Register} options = {{headerShown: false}} />
      <Stack.Screen name="Login" component={Login} options = {{headerShown: false}} />
      <Stack.Screen name="TabNavigation" component={TabNavigation} options = {{headerShown: false}} />
     </Stack.Navigator>
    </NavigationContainer>
  );
}
    
  
