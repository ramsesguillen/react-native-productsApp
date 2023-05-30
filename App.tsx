import 'react-native-gesture-handler';

import { Text, View } from 'react-native';

import { AuthProvider } from './src/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { ProductsProvider } from './src/context/ProductsContext';
import React from 'react'
import { StackNavigation } from './src/Navigation/Navigation';

const AppState = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <AuthProvider>
      <ProductsProvider>
        { children }
      </ProductsProvider>
    </AuthProvider>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <StackNavigation />
      </AppState>
    </NavigationContainer>
  )
}

export default App
