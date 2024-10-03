import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/home';  // Make sure these imports are correct
import LabelChecklist from './pages/checklist';
import Theory from './pages/theory';
import Prov from './pages/prov';
import Prov1 from './pages/prover/prov1_native';
import Prov2 from './pages/prover/prov2_native';
import Prov3 from './pages/prover/prov3_native';
import Statestik from './pages/statestik';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Checklist" component={LabelChecklist} />
        <Stack.Screen name="Theory" component={Theory} />
        <Stack.Screen name="Prov" component={Prov} />
        <Stack.Screen name="Prov1" component={Prov1} />
        <Stack.Screen name="Prov2" component={Prov2} />
        <Stack.Screen name="Prov3" component={Prov3} />
        <Stack.Screen name="Statestik" component={Statestik} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
