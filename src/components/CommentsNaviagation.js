import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Comments from '../screens/Comments';
let Stack = createNativeStackNavigator();
export default function CommentsNavigation() {
  return (
     <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options = {{headerShown: false}} />
      <Stack.Screen name="Comments" component={Comments} options = {{headerShown: false}} />
     </Stack.Navigator>
  );
}
    
  
