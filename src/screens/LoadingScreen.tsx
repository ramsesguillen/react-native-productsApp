import { ActivityIndicator, View } from 'react-native'

import React from 'react'

export const LoadingScreen = () => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <ActivityIndicator
        size={50}
        color='black'
      >
      </ActivityIndicator>
    </View>
  )
}
