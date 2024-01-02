import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ErrorBoundary } from './Src/Componets/ErrorBoundary'
import { OfflineNotice } from './Src/Componets/OfflineNotice'
import ApidataFetch from "./Src/DataFething/ApidataFetch"
import { Provider } from 'react-redux';
import store from './Src/redux/store'
import RootNavigator from './Src/RootNavigator';
import { Text } from 'react-native';
import CustomButton from './Src/CustomThings/CustomButton';
import DropDown from './Src/DropDown'
import TopTabPractice from "./Src/TopTabPractice"
import UseStateHook from "./Src/Hooks/UseStateHook"
import UseEffectHook from './Src/Hooks/UseEffectHook';
import UseMemoHook from './Src/Hooks/UseMemoHook';

export default function App() {
  return (
    // <Provider store={store}>
    //   <NavigationContainer>
    //     <ErrorBoundary ENV={'PROD'}>
    //       <OfflineNotice />
    //       <OfflineNotice />
    // <DropDown />
    // <UseStateHook />
    // <UseEffectHook />
    <UseMemoHook />
    // <TopTabPractice />
    // <CustomButton />
    //       <RootNavigator /> main file hai..........
    //     </ErrorBoundary>
    //   </NavigationContainer>
    // </Provider>
  );
}
