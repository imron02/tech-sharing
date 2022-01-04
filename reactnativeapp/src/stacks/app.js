import React, {useEffect, useMemo, useReducer} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/login';
import HomeScreen from '../screens/home';
import authReducer, {authInitialState} from '../reducer/auth_reducer';
import AuthContext from '../context/auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, Alert, View} from 'react-native';
import ProfileScreen from '../screens/profile';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    const initApp = async () => {
      try {
        const token = await AsyncStorage.getItem('@userToken');
        if (token) {
          authDispatch({type: 'SIGN_IN', userToken: token});
        } else {
          authDispatch({type: 'SIGN_OUT'});
        }
      } catch (e) {
        Alert.alert('Error', `Error get token ${e}`);
      }
    };

    initApp();
  }, []);

  const authContext = useMemo(
    () => ({
      userToken: authState.userToken,
      signIn: async () => {
        try {
          await AsyncStorage.setItem('@userToken', 'secret');
          authDispatch({type: 'SIGN_IN', userToken: 'secret'});
        } catch (e) {
          Alert.alert('Error', `Login error ${e}`);
        }
      },
      signOut: async () => {
        authDispatch({type: 'SIGN_OUT'});
        AsyncStorage.removeItem('@userToken');
      },
      isLoading: authState.isLoading,
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      {authState.isLoading ? (
        <View
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          testID="loader">
          <ActivityIndicator size="large" />
        </View>
      ) : authState.userToken ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      )}
    </AuthContext.Provider>
  );
};

export default AppStack;
