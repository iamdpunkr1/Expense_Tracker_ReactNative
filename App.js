// In App.js in a new project

import  React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Authstack from './navigation/Authstack'
import {AuthContextProvider} from './context/AuthContext'
import {ExpenseContextProvider} from './context/ExpenseContext'

function App() {
  return (
    <AuthContextProvider>
      <ExpenseContextProvider>
        <NavigationContainer>
          <Authstack/>
        </NavigationContainer>
      </ExpenseContextProvider>
    </AuthContextProvider>
  );
}

export default App;