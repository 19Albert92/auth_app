import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, ListUsers} from './../views';

const Stack = createNativeStackNavigator();

export const AppNavigate = () => (
    <Stack.Navigator screenOptions={{
      headerTitleAlign: 'center',
      headerBackTitleVisible: false
    }}>
      <Stack.Screen name={'home'} component={Home}/>
      <Stack.Screen name={'users'} component={ListUsers}/>
    </Stack.Navigator>
)
