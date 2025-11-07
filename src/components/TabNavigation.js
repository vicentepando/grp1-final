import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CommentsNavigation from './CommentsNaviagation';
let Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="CommentsNavigation" component={CommentsNavigation} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Tab.Screen name="NewPost" component={NewPost} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}


