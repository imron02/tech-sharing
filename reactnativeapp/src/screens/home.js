import React, {useContext} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import AuthContext from '../context/auth-context';

const HomeScreen = ({navigation}) => {
  const {signOut} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.buttonText}>Go to Profile</Text>
      </Pressable>
      <Pressable
        style={[styles.button, {backgroundColor: 'blue'}]}
        onPress={signOut}>
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
