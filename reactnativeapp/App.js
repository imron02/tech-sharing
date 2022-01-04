import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './src/stacks/app';

const App = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default App;
