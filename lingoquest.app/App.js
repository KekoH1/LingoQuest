import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/home';  
import LabelChecklist from './pages/checklist';
import Theory from './pages/theory';
import Prov from './pages/prov';
import Prov1 from './pages/prover/prov1_native';
import Prov2 from './pages/prover/prov2_native';
import Prov3 from './pages/prover/prov3_native';
import Statestik from './pages/statestik';
import Review from './pages/review';
import Kap1_native from './pages/kap/kap1_native';
import Kap2_native from './pages/kap/kap2_native';
import Kap3_native from './pages/kap/kap3_native';
import Kap4_native from './pages/kap/kap4_native';


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
        <Stack.Screen name="Review" component={Review} />
        <Stack.Screen name="Kap1_native" component={Kap1_native} />
        <Stack.Screen name="Kap2_native" component={Kap2_native} />
        <Stack.Screen name="Kap3_native" component={Kap3_native} />
        <Stack.Screen name="Kap4_native" component={Kap4_native} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
