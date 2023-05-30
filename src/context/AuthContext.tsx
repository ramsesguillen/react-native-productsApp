import { AuthState, authReducer } from "./authReducer";
import { LoginData, LoginResponse, RegisterData, Usuario } from "../interfaces/LoginResponseInterface";
import axios, { AxiosError } from "axios";
import { createContext, useEffect, useReducer } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';
import cafeApi from "../api/cafeApi";

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: (obj: RegisterData) => void;
  signIn: (data: LoginData) => void;
  logout: () => void;
  removeError: () => void;
}

const authInitialState: AuthState = {
  status: 'checking',
  errorMessage: '',
  token: null,
  user: null,
}


export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState)

  useEffect(() => {
    checkToken();
  }, []);


  const checkToken = async() => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return dispatch({ type: 'noAuthenticated'});

    const { data, status } = await cafeApi.get<LoginResponse>('/auth');
    if (status !== 200) {
      return dispatch({ type: "noAuthenticated" })
    }

    dispatch({ type: 'signUp', payload: {
      token: data.token,
      user: data.usuario
    }})

  }

  const signUp = async (obj: RegisterData) => {
    try {
      const { data } = await cafeApi.post<LoginResponse>('/usuarios', obj);
      dispatch({ type: 'signUp', payload: {
        token: data.token,
        user: data.usuario
      }})

      await AsyncStorage.setItem('token', data.token)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch({ type: 'addError', payload: error.response?.data.msg || 'Informacion incorrecta'})
      } else {
        dispatch({ type: 'addError', payload: 'Informacion incorrecta'})
      }
    }
  }

  const signIn = async ({ correo, password }: LoginData) => {
    try {
      const { data } = await cafeApi.post<LoginResponse>('/auth/login', { correo, password});
      dispatch({ type: 'signUp', payload: {
        token: data.token,
        user: data.usuario
      }})

      await AsyncStorage.setItem('token', data.token)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch({ type: 'addError', payload: error.response?.data.msg || 'Informacion incorrecta'})
      } else {
        dispatch({ type: 'addError', payload: 'Informacion incorrecta'})
      }
    }
  }

  const logout = async() => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'logout' })
  }

  const removeError = ():void => {
    dispatch({ type: 'removeError' });
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logout,
        removeError,
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}






