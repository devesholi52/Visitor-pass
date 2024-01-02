import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../screens/RegistrationScreens/Splash'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from '../screens/RegistrationScreens/Signin';
import Passwordreset from '../screens/RegistrationScreens/Passwordreset';
import Otp from '../screens/RegistrationScreens/Otp';
import Forgetpass from '../screens/RegistrationScreens/Forgetpass';

const ScreenStack = createNativeStackNavigator()

const AuthNavigator = () => {

    return (
        <ScreenStack.Navigator screenOptions={{ headerShown: false }}  >
            <ScreenStack.Screen name="Splash" component={Splash} />
            <ScreenStack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
            <ScreenStack.Screen name="Otp" component={Otp} options={{ headerShown: false }} />
            <ScreenStack.Screen name="Forgetpass" component={Forgetpass} options={{ headerShown: false }} />
            <ScreenStack.Screen name="Passwordreset" component={Passwordreset} options={{ headerShown: false }} />
        </ScreenStack.Navigator>
    )
}

export default AuthNavigator

const styles = StyleSheet.create({})