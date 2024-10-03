import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/home';  // Make sure these imports are correct
import LabelChecklist from './pages/checklist';
import Theory from './pages/theory';
import Prov from './pages/prov';
import Statestik from './pages/statestik';
import Review from './pages/review';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Checklist" component={LabelChecklist} />
        <Stack.Screen name="Theory" component={Theory} />
        <Stack.Screen name="Prov" component={Prov} />
        <Stack.Screen name="Statestik" component={Statestik} />
        <Stack.Screen name="Review" component={Review} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
