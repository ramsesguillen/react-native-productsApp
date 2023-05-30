import { Button, Text, View } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'

interface Props extends StackScreenProps<any, any> {}
export const HomeScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>Home</Text>
      <Button title='Details'  onPress={() => navigation.navigate('DetailsScreen') }/>

      <Icon name="aperture-outline" size={50} color="#900" />
    </View>
  )
}
