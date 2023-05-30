import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'

import { AuthContext } from '../context/AuthContext';

export const ProtectedScreen = () => {
  const { user, token, logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Protected</Text>
      <Button
        title='Logout'
        color='#5859D6'
        onPress={logout}
      />

      <Text>
        {
          JSON.stringify(user, null, 5)
        }
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  }
});
