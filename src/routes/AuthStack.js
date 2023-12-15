import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Register} from './../views';
import { AppNavigate } from "./AppStack";

const Stack = createNativeStackNavigator();

export const AuthNavigate = () => (
    <Stack.Navigator screenOptions={{
      headerTitleAlign: 'center',
      headerBackTitleVisible: false
    }}>
      <Stack.Screen name={'login'} component={Login}/>
      <Stack.Screen name={'register'} component={Register}/>
    </Stack.Navigator>
)
