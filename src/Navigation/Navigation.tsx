import { AuthContext } from '../context/AuthContext';
import { LoadingScreen } from '../screens/LoadingScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { ProductsNavigation } from './ProductsNavigation';
import { ProtectedScreen } from '../screens/ProtectedScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';

const Stack = createStackNavigator();

export const StackNavigation = () => {

  const { status } = useContext(AuthContext);

  if (status === 'checking') {
    return <LoadingScreen />
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      {
        (status !== 'authenticated')
        ? (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="ProductsNavigation" component={ProductsNavigation} />
            <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
          </>
        )
      }
    </Stack.Navigator>
  );
}
