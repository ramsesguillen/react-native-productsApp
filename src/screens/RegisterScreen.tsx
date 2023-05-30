import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'

import { AuthContext } from '../context/AuthContext';
import { StackScreenProps } from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({ navigation }: Props) => {
  const {signUp, errorMessage, removeError} = useContext(AuthContext);
  const { email, password, name,onChange } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const onRegister = () => {
    signUp({ correo: email, password, nombre: name });
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
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: '#5856D6',
        }}
        behavior={ Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={loginStyles.formContainer}>
          <WhiteLogo />

          <Text style={loginStyles.title}>Registro</Text>

          <Text style={loginStyles.label}>Nombre</Text>
          <TextInput
            placeholder='Ingrese su nombre'
            placeholderTextColor='rgba(255, 255, 255, 0.4)'
            keyboardType='email-address'
            underlineColorAndroid='white'
            style={[ loginStyles.inputField,
              (Platform.OS === 'ios') && loginStyles.inputFielIos
            ]}
            selectionColor='white'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(value) => onChange(value, 'name')}
            value={name}
            onSubmitEditing={onRegister}
          />

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
            onSubmitEditing={onRegister}
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
            onSubmitEditing={onRegister}
          />

          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onRegister}
            >
              <Text style={loginStyles.buttonText}>Crear Cuenta</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace('LoginScreen')}
              style={loginStyles.buttonReturn}
            >
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  )
}
