import { ProductScreen } from '../screens/ProductScreen';
import { ProductsScreen } from '../screens/ProductsScreen';
import { createStackNavigator } from '@react-navigation/stack';

export type ProductsStackParams = {
    ProductsScreen: undefined,
    ProductScreen: { id?: string, name?: string }
}


const Stack = createStackNavigator<ProductsStackParams>();


export const ProductsNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
            backgroundColor: 'white'
        },
        headerStyle: {
            elevation: 0,
            shadowColor: 'transparent'
        }
      }}
    >
      <Stack.Screen name="ProductsScreen" options={{ title: 'Productos' }} component={ProductsScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  )
}
