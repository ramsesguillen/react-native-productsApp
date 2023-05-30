import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'

import { AuthContext } from '../context/AuthContext';
import { Background } from '../components/Background'
import { StackScreenProps } from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler';
import { WhiteLogo } from '../components/WhiteLogo'
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({ navigation }: Props) => {
  const { signIn, errorMessage, removeError } = useContext(AuthContext)
  const { email, password, onChange } = useForm({
    email: '',
    password: '',
  });

  const onLogin = () => {
    signIn({ correo: email, password })
    Keyboard.dismiss();
  }
  useEffect(() => {
    if (errorMessage.length === 0) return;
    Alert.alert('Login Incorrecto', errorMessage, [
      {
        text: 'Ok',
        onPress: () => removeError()
      }
    ]);
  }, [errorMessage]);
  return (
    <>
      <Background />
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={ Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={loginStyles.formContainer}>
          <WhiteLogo />

          <Text style={loginStyles.title}>Login</Text>

          <Text style={loginStyles.label}>Email</Text>
          <TextInput
            placeholder='Ingrese su email'
            placeholderTextColor='rgba(255, 255, 255, 0.4)'
            keyboardType='email-address'
            underlineColorAndroid='white'
            style={[ loginStyles.inputField,
              (Platform.OS === 'ios') && loginStyles.inputFielIos
            ]}
            selectionColor='white'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(value) => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onLogin}
          />

          <Text style={loginStyles.label}>Password</Text>
          <TextInput
            placeholder='*******'
            secureTextEntry={true}
            placeholderTextColor='rgba(255, 255, 255, 0.4)'
            underlineColorAndroid='white'
            style={[ loginStyles.inputField,
              (Platform.OS === 'ios') && loginStyles.inputFielIos
            ]}
            selectionColor='white'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(value) => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onLogin}
          />

          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onLogin}
            >
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={loginStyles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace('RegisterScreen')}
            >
              <Text style={loginStyles.buttonText}>Nueva Cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  )
}
